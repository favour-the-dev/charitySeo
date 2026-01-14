"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Search,
  ExternalLink,
  RefreshCw,
  Facebook,
  Globe,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import ListingService from "@/services/listings";
import { listingDataType } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ListingsTable() {
  const [listings, setListings] = useState<listingDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await ListingService.getAllListings();
      if (res.data) {
        setListings(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case "google":
      case "google-business":
        return <Globe className="h-4 w-4 text-green-600" />;
      case "bing":
        return <MapPin className="h-4 w-4 text-teal-600" />;
      default:
        return <Globe className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "synced":
        return "default"; // or "success" if you have it
      case "pending":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredListings = listings.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchListings}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Listing Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Synced</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading listings...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredListings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No listings found.
                </TableCell>
              </TableRow>
            ) : (
              filteredListings.map((listing) => (
                <TableRow key={listing.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(listing.platform)}
                      <span className="capitalize">{listing.platform}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{listing.name}</span>
                      {listing.has_discrepancies && (
                        <span className="text-xs text-amber-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Has discrepancies
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{listing.location?.name || "Unknown"}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(listing.status) as any}>
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {listing.last_synced_at
                      ? new Date(listing.last_synced_at).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-right">
                    {listing.website && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={listing.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
