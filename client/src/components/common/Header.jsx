import {
  BlogAddRoute,
  IndexRoute,
  ProfileRoute,
  SignInRoute,
} from "@/routes/Route";
import { Menu, Plus, Rss, UserPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import errorHandler from "@/lib/errorHandler";
import { toast } from "sonner";
import { userLogout } from "@/services/authServices";
import { removeAuth } from "@/store/features/auth/authSlice";
import { useSidebar } from "../ui/sidebar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const { toggleSidebar } = useSidebar();

  const handleLogout = async () => {
    try {
      const response = await userLogout();

      if (response?.success) {
        dispatch(removeAuth());
        toast.success(response.message);
        navigate(IndexRoute);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong!";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  return (
    <header className="flex items-center justify-between border-b h-16 fixed z-20 bg-white top-0 left-0 w-full px-4">
      <Link to={IndexRoute} className="flex items-center gap-0.5">
        <Rss className="w-5 h-5" />
        <span className="text-lg font-bold">MukeshBlogs</span>
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          type="button"
          className="cursor-pointer block md:hidden"
        >
          <Menu />
        </button>
        {!auth?.isLoggedIn ? (
          <Link
            to={SignInRoute}
            className="rounded-lg text-base font-medium h-11 bg-black/80 hover:bg-black transition-all duration-300 cursor-pointer max-w-max px-5 flex items-center gap-2 text-white"
          >
            <Plus className="w-5 h-5" />
            <span>SignIn</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={auth?.user?.avatar} />
                <AvatarFallback className="flex items-center justify-center font-semibold bg-black text-white text-lg">
                  {auth?.user?.name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit mr-4">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p className="font-semibold text-black text-[16px]">
                    {auth?.user?.name}
                  </p>
                  <p>{auth?.user?.email}</p>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    to={ProfileRoute}
                    className="w-full flex items-center gap-2"
                  >
                    <UserPen /> <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to={BlogAddRoute}
                    className="w-full flex items-center gap-2"
                  >
                    <Plus /> <span>Create Blog</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer bg-black/90! text-white! data-highlighted:bg-black! data-highlighted:text-white! felx items-center justify-center"
                >
                  <span className="text-white!">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
