import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import errorHandler from "@/lib/errorHandler";
import { Textarea } from "../ui/textarea";
import { commentSchema } from "@/schema/commentSchema";
import { commentAdd } from "@/services/commentServices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignInRoute } from "@/routes/Route";
import Loading from "./Loading";
import useFetch from "@/hooks/useFetch";

const Comment = ({ blogId }) => {
  const [refreshComment, setRefreshComment] = useState(false);
  const [newCommentData, setnewCommentData] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { data, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/comment/get/${blogId}`,
    {
      method: "GET",
      credentials: "include",
    },
    // [refreshComment],
  );
  const comments = data?.comment || [];

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values) {
    try {
      const payload = {
        author: auth?.user?._id,
        blogId: blogId,
        comment: values.comment,
      };
      const response = await commentAdd(payload);
      if (response?.success) {
        toast.success(response.message);
        form.reset();
        // setRefreshComment(!refreshComment);
        setnewCommentData(response.comment);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 border-t pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6" />
        <h2 className="text-2xl font-bold">
          Comments {newCommentData ? comments.length + 1 : comments.length}
        </h2>
      </div>
      {auth && auth?.isLoggedIn ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FieldGroup>
              <Controller
                name="comment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="comment" className="text-md">
                      Comment
                    </FieldLabel>
                    <Textarea
                      {...field}
                      type="text"
                      id="comment"
                      aria-invalid={fieldState.invalid}
                      placeholder="Type your comment..."
                      autoComplete="off"
                      className="border shadow-none focus:shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <Button
            type="submit"
            className="px-5 rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer"
          >
            Submit
          </Button>
        </form>
      ) : (
        <div className="border rounded-xl p-5 text-center bg-muted/30 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">
            Please login to write a comment.
          </p>
          <Link
            to={SignInRoute}
            className="rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer max-w-max px-5 flex items-center gap-2 text-white"
          >
            <span>SignIn</span>
          </Link>
        </div>
      )}
      <div className="mt-8">
        {newCommentData && (
          <div className="space-y-5 mb-5">
            <div className="border rounded-xl p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <Avatar className="w-11 h-11">
                  <AvatarImage
                    src={auth?.user?.avatar || "https://github.com/shadcn.png"}
                    className="object-cover"
                  />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-semibold">{auth?.user?.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {moment(newCommentData?.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-6">
                    {newCommentData?.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {comments.length > 0 ? (
          <div className="space-y-5">
            {comments.map((comment) => (
              <div
                key={comment?._id}
                className="border rounded-xl p-4 bg-muted/30"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-11 h-11">
                    <AvatarImage
                      src={
                        comment?.author?.avatar ||
                        "https://github.com/shadcn.png"
                      }
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="font-semibold">{comment?.author?.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {moment(comment?.createdAt).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-6">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !newCommentData && (
            <div className="border rounded-xl p-8 text-center mt-6">
              <h3 className="text-lg font-semibold mb-2">No Comments Yet</h3>
              <p className="text-sm text-muted-foreground">
                Be the first person to comment on this blog.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Comment;
