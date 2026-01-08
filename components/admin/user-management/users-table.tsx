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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash,
  LogIn,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { User as UserType } from "@/types/types";
// import { User } from "./add-user-modal"; // Removed local type
import { EditUserModal } from "./edit-user-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "react-hot-toast";
import AdminService from "@/services/Admin";

interface UsersTableProps {
  searchQuery?: string;
  users?: UserType[];
  onDataChange?: () => void;
}

export function UsersTable({
  searchQuery = "",
  users = [],
  onDataChange,
}: UsersTableProps) {
  const [localUsers, setLocalUsers] = useState<UserType[]>(users);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubsModalOpen, setIsSubsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const filteredUsers = localUsers.filter((user) => {
    const query = searchQuery.toLowerCase();
    const name = user.name || `${user.first_name} ${user.last_name}`;
    return (
      name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleEdit = (user: UserType) => {
    // Note: EditUserModal currently expects a different User type.
    // Casting or refactoring needed for full functionality.
    // For now, we'll try to pass it, but realize it might need updates.
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: UserType) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await AdminService.deleteUser(selectedUser.id);
        setLocalUsers(localUsers.filter((u) => u.id !== selectedUser.id));
        toast.success("User deleted successfully");
        if (onDataChange) onDataChange();
      } catch (error) {
        toast.error("Failed to delete user");
      }
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleToggleStatus = async (user: UserType) => {
    try {
      const isCurrentlyActive = !!user.is_active;
      if (isCurrentlyActive) {
        await AdminService.deactivateUser(user.id);
      } else {
        await AdminService.activateUser(user.id);
      }

      const newStatus = isCurrentlyActive ? 0 : 1;
      setLocalUsers(
        localUsers.map((u) =>
          u.id === user.id ? { ...u, is_active: newStatus } : u
        )
      );
      toast.success(
        `User ${newStatus ? "activated" : "deactivated"} successfully`
      );
      if (onDataChange) onDataChange();
    } catch (error) {
      const message =
        (error as any)?.response?.data?.message ||
        "Failed to update user status";
      toast.error(message);
    }
  };

  const handleViewSubs = (user: UserType) => {
    setSelectedUser(user);
    setIsSubsModalOpen(true);
  };

  const handleAccessAsUser = (user: UserType) => {
    toast.success(`Accessing as ${user.name}...`);
    // Logic to impersonate user
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name || `${user.first_name} ${user.last_name}`}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewSubs(user)}
                    >
                      <Eye className="mr-2 h-3 w-3" />
                      View All
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAccessAsUser(user)}
                        title="Access as User"
                      >
                        <LogIn className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(user)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(user)}
                        title="Delete"
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(user)}
                          >
                            {user.is_active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUserUpdated={onDataChange}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user{" "}
              <strong>{selectedUser?.name || selectedUser?.first_name}</strong>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isSubsModalOpen} onOpenChange={setIsSubsModalOpen}>
        <DialogContent className="sm:max-w-106.25 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Active Subscriptions</DialogTitle>
            <DialogDescription>
              Subscriptions for{" "}
              <strong>{selectedUser?.name || selectedUser?.first_name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {selectedUser &&
            selectedUser.subscriptions &&
            Object.keys(selectedUser.subscriptions).length > 0 ? (
              Object.entries(selectedUser.subscriptions).map(([key, sub]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <span className="capitalize">
                    {sub?.name || key.replace(/_/g, " ")}
                  </span>
                  <Badge
                    variant={sub?.status ? "default" : "outline"}
                    className={
                      sub?.status ? "bg-green-600 hover:bg-green-700" : ""
                    }
                  >
                    {sub?.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No subscriptions found.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
