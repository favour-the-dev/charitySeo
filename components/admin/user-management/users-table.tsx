"use client";
import { useState } from "react";
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
import { MoreHorizontal, Edit, Trash, LogIn, Eye } from "lucide-react";
import { User } from "./add-user-modal";
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

// Mock Data
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Member",
    status: "Active",
    subscriptions: {
      "Front End Pro": "Active",
      "CharitySEO Unlimited": "Inactive",
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
    subscriptions: {
      "Front End Pro": "Active",
      "CharitySEO Agency": "Active",
    },
  },
];

interface UsersTableProps {
  searchQuery?: string;
}

export function UsersTable({ searchQuery = "" }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubsModalOpen, setIsSubsModalOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success("User deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleViewSubs = (user: User) => {
    setSelectedUser(user);
    setIsSubsModalOpen(true);
  };

  const handleAccessAsUser = (user: User) => {
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
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "Admin" ? "default" : "secondary"}
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the user{" "}
              <strong>{selectedUser?.name}</strong>? This action cannot be
              undone.
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
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Active Subscriptions</DialogTitle>
            <DialogDescription>
              Subscriptions for <strong>{selectedUser?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {selectedUser &&
              Object.entries(selectedUser.subscriptions).map(
                ([sub, status]) => (
                  <div
                    key={sub}
                    className="flex justify-between items-center border-b pb-2 last:border-0"
                  >
                    <span>{sub}</span>
                    <Badge
                      variant={status === "Active" ? "default" : "outline"}
                      className={
                        status === "Active"
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }
                    >
                      {status}
                    </Badge>
                  </div>
                )
              )}
            {selectedUser &&
              Object.keys(selectedUser.subscriptions).length === 0 && (
                <p className="text-muted-foreground">No subscriptions found.</p>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
