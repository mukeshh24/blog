import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CategoryAddRoute, CategoryEditRoute } from "@/routes/Route";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { categoryDelete } from "@/services/categoryServices";
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

const CategoryDetails = () => {
  const [refreshData, setRefreshData] = useState(false);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/category/show`,
    {
      method: "GET",
      credentials: "include",
    },
    [refreshData],
  );

  const handleDelete = async (categoryId) => {
    try {
      const response = await categoryDelete(categoryId);

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
        <CardHeader>
          <Link
            to={CategoryAddRoute}
            className="rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer max-w-max px-4 flex items-center gap-2 text-white"
          >
            <Plus className="w-5 h-5" />
            <span>Add Category</span>
          </Link>
        </CardHeader>
        <CardContent className="mt-4">
          <Table>
            <TableCaption>
              A list of all categories added to your platform.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">#</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data?.category?.length > 0 ? (
                data?.category.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="max-w-40 truncate">
                      <span className="bg-muted px-2 py-1 rounded-md text-sm">
                        {category.slug}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Button variant="outline" size="sm">
                          <Link to={CategoryEditRoute(category._id)}>
                            <Pencil />
                          </Link>
                        </Button>
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
                                Delete Category?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the category.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="cursor-pointer">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category._id)}
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
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No categories found
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

export default CategoryDetails;
