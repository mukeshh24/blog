import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/common/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import errorHandler from "@/lib/errorHandler";
import { userDelete } from "@/services/authServices";

const UserDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/all-user`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData],
  );

  const handleDelete = async (userId) => {
    try {
      const response = await userDelete(userId);

      if (response?.success) {
        setRefreshData(!refreshData);
        toast.success(response.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>
              A list of all users added to your platform.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.user?.length > 0 ? (
                data?.user.map((user, index) => (
                  <TableRow key={user?._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell className="max-w-40 truncate">
                      {user?.email}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete User?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the user.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user?._id)}
                                className="bg-red-500 hover:bg-red-600 cursor-pointer"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserDetails;
