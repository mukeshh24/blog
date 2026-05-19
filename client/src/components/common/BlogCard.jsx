import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { BlogDetailaRoute } from "@/routes/Route";

const BlogCard = ({ blog }) => {
  return (
    <Link to={BlogDetailaRoute(blog?.category?.slug, blog?.slug)}>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={blog?.author?.avatar || "https://github.com/shadcn.png"}
              />
            </Avatar>
            <p className="font-semibold text-sm capitalize">
              {blog?.author?.name}
            </p>
          </div>
          {blog?.author?.role === "admin" && (
            <Badge className="px-3 py-3">Admin</Badge>
          )}
        </CardHeader>
        <CardContent>
          <img
            src={blog?.featureImage}
            alt={`image`}
            className="rounded-md object-cover"
          />
          <p className="flex items-center gap-2 text-sm text-gray-500 mt-3">
            <Calendar className="w-4 h-4" />
            <span>{moment(blog?.createdAt).format("DD-MM-YYYY")}</span>
          </p>
          <h3 className="text-lg font-bold leading-7 text-black line-clamp-2">
            {blog?.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
