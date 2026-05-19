import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useFetch from "@/hooks/useFetch";
import {
  BlogByCategoryRoute,
  BlogRoute,
  CategoryDetailsRoute,
  CommentDetailsRoute,
  IndexRoute,
  UserDetailsRoute,
} from "@/routes/Route";
import {
  ChartBarStacked,
  CircleSmall,
  House,
  MessageCircle,
  Rss,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const auth = useSelector((state) => state.auth);

  const { data } = useFetch(`${import.meta.env.VITE_API_URL}/category/show`, {
    method: "GET",
    credentials: "include",
  });

  return (
    <Sidebar>
      <SidebarHeader className="border-b h-16 flex justify-center px-4">
        <Link to={IndexRoute} className="flex items-center gap-0.5">
          <Rss className="w-5 h-5" />
          <span className="text-lg font-bold">MukeshBlogs</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Link
                  to={IndexRoute}
                  className="h-full w-full flex items-center gap-2"
                >
                  <House />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {auth && auth?.isLoggedIn && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={BlogRoute}
                      className="h-full w-full flex items-center gap-2"
                    >
                      <Rss />
                      <span>Blogs</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={CommentDetailsRoute}
                      className="h-full w-full flex items-center gap-2"
                    >
                      <MessageCircle />
                      <span>Comments</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
            {auth && auth?.isLoggedIn && auth?.user?.role === "admin" && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={CategoryDetailsRoute}
                      className="h-full w-full flex items-center gap-2"
                    >
                      <ChartBarStacked />
                      <span>Categories</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link
                      to={UserDetailsRoute}
                      className="h-full w-full flex items-center gap-2"
                    >
                      <User />
                      <span>Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {data?.category &&
              data?.category.length > 0 &&
              data?.category.map((categoryItem) => (
                <SidebarMenuItem key={categoryItem._id}>
                  <SidebarMenuButton>
                    <Link
                      to={BlogByCategoryRoute(categoryItem.slug)}
                      className="h-full w-full flex items-center gap-2"
                    >
                      <CircleSmall />
                      <span>{categoryItem.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
