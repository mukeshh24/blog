import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";

export const MainSidebarData = [
  {
    id: 0,
    icon: IoHomeOutline,
    urlRoute: "/",
    heading: "Home",
  },
  {
    id: 1,
    icon: BiCategory,
    urlRoute: "/",
    heading: "Categories",
  },
  {
    id: 2,
    icon: GrBlog,
    urlRoute: "/",
    heading: "Blogs",
  },
  {
    id: 3,
    icon: FaRegComments,
    urlRoute: "/",
    heading: "Comments",
  },
  {
    id: 4,
    icon: LuUsers,
    urlRoute: "/",
    heading: "Users",
  },
];
