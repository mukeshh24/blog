import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import  { useState } from "react";
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
import { commentDelete } from "@/services/commentServices";

const CommentDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/all-comment`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData],
  );

  const handleDelete = async (commentId) => {
    try {
      const response = await commentDelete(commentId);

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
              A list of all comments added to your platform.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.comment?.length > 0 ? (
                data?.comment.map((comment, index) => (
                  <TableRow key={comment?._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="max-w-30 truncate">
                      {comment?.blogId?.title}
                    </TableCell>
                    <TableCell>{comment?.author?.name}</TableCell>
                    <TableCell className="max-w-30 truncate">
                      {comment?.comment}
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
                              <AlertDialogTitle>
                                Delete Comment?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the comment.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(comment?._id)}
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
                    No comments found
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

export default CommentDetails;
