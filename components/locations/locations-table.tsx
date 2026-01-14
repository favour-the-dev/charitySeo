"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  MoreHorizontal,
  Search,
  Plus,
  Trash2,
  Eye,
  Pencil,
  MapPin,
  Star,
  Facebook,
  Globe,
} from "lucide-react";
import LocationService from "@/services/locations";
import ListingService from "@/services/listings";
import { locationDataDetailsType } from "@/types/types";
import { toast } from "react-hot-toast";
import { AddLocationModal } from "./create-location-modal";
import { EditLocationModal } from "./edit-location-modal";
import { ViewLocationModal } from "./view-location-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Image from "next/image";

export default function LocationsTable() {
  const [locations, setLocations] = useState<locationDataDetailsType[]>([]);
  const [connections, setConnections] = useState<Record<number, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  const [currentLocation, setCurrentLocation] =
    useState<locationDataDetailsType | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const [locResponse, listResponse] = await Promise.all([
        LocationService.getLocations(),
        ListingService.getAllListings(),
      ]);

      if (locResponse.data) {
        setLocations(locResponse.data);
      } else {
        setLocations([]);
      }

      if (listResponse.data) {
        const connMap: Record<number, string[]> = {};
        listResponse.data.forEach((listing) => {
          const locId = listing.location_id;
          if (!connMap[locId]) connMap[locId] = [];
          // Avoid duplicates
          const platform = listing.platform.toLowerCase();
          if (!connMap[locId].includes(platform)) {
            connMap[locId].push(platform);
          }
        });
        setConnections(connMap);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load locations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Filter
  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLocations(filteredLocations.map((l) => l.id));
    } else {
      setSelectedLocations([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedLocations((prev) => [...prev, id]);
    } else {
      setSelectedLocations((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleDelete = async () => {
    if (!currentLocation) return;
    try {
      await LocationService.deleteLocation(currentLocation.id.toString());
      toast.success("Location deleted");
      fetchLocations();
      setIsDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete location");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLocations.length === 0) return;
    try {
      await LocationService.deleteBulkLocations({ ids: selectedLocations });
      toast.success("Locations deleted");
      setSelectedLocations([]);
      fetchLocations();
      setIsBulkDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete locations");
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {selectedLocations.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsBulkDeleteOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedLocations.length})
            </Button>
          )}
          <Button
            onClick={() => setIsAddOpen(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    filteredLocations.length > 0 &&
                    selectedLocations.length === filteredLocations.length
                  }
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
              </TableHead>
              <TableHead className="w-[60px]">S/N</TableHead>
              <TableHead className="w-[100px]">Store ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="w-[120px]">Reviews</TableHead>
              <TableHead className="w-[120px]">Connections</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading locations...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredLocations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No locations found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLocations.map((location, index) => (
                <TableRow key={location.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selectedLocations.includes(location.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(location.id, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{location.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col min-w-[200px]">
                      <span className="font-semibold text-sm">
                        {location.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" />
                        <span
                          className="truncate max-w-[200px]"
                          title={`${location.address}, ${location.city}`}
                        >
                          {location.address}
                          {location.city ? `, ${location.city}` : ""}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground ml-4">
                        {location.state} {location.postal_code},{" "}
                        {location.country}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* Placeholder for reviews */}
                    <div className="flex items-center text-amber-500 gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium text-foreground">
                        0.0
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        (0)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {connections[location.id]?.map((platform) => (
                        <div
                          key={platform}
                          className="relative h-8 w-8 rounded-full border bg-background flex items-center justify-center p-1.5 ring-2 ring-background z-10"
                          title={platform}
                        >
                          {platform.toLowerCase().includes("facebook") ? (
                            <Facebook className="h-5 w-5 text-blue-600" />
                          ) : platform.toLowerCase().includes("google") ? (
                            <Globe className="h-5 w-5 text-green-600" />
                          ) : (
                            <MapPin className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                      ))}
                      {(!connections[location.id] ||
                        connections[location.id].length === 0) && (
                        <span className="text-xs text-muted-foreground italic">
                          None
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentLocation(location);
                            setIsViewOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentLocation(location);
                            setIsEditOpen(true);
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setCurrentLocation(location);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Simple Pagination Indicator */}
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {selectedLocations.length} of {filteredLocations.length} row(s)
          selected
        </div>
      </div>

      {/* Modals */}
      <AddLocationModal
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSuccess={fetchLocations}
      />

      {currentLocation && (
        <>
          <EditLocationModal
            location={currentLocation}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
            onSuccess={fetchLocations}
          />
          <ViewLocationModal
            location={currentLocation}
            open={isViewOpen}
            onOpenChange={setIsViewOpen}
          />
          <ConfirmDialog
            open={isDeleteOpen}
            onOpenChange={setIsDeleteOpen}
            title="Delete Location"
            description={`Are you sure you want to delete "${currentLocation.name}"? This action cannot be undone.`}
            onConfirm={handleDelete}
          />
        </>
      )}

      <ConfirmDialog
        open={isBulkDeleteOpen}
        onOpenChange={setIsBulkDeleteOpen}
        title="Delete Multiple Locations"
        description={`Are you sure you want to delete ${selectedLocations.length} locations? This action cannot be undone.`}
        onConfirm={handleBulkDelete}
      />
    </div>
  );
}
