import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebLayout from "./layouts/WebLayout";
import {
  BlogAddRoute,
  BlogRoute,
  BlogEditRoute,
  CategoryAddRoute,
  CategoryDetailsRoute,
  CategoryEditRoute,
  IndexRoute,
  ProfileRoute,
  SignInRoute,
  SignUpRoute,
  BlogDetailaRoute,
  BlogByCategoryRoute,
  CommentDetailsRoute,
  UserDetailsRoute,
} from "./routes/Route";
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "./components/ui/sonner";
import Profile from "./pages/profile";
import CategoryDetails from "./pages/category/CategoryDetails";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryEdit from "./pages/category/CategoryEdit";
import Blog from "./pages/blog/Blog";
import BlogAdd from "./pages/blog/BlogAdd";
import BlogEdit from "./pages/blog/BlogEdit";
import BlogDetails from "./pages/blog/BlogDetails";
import BlogByCategory from "./pages/blog/BlogByCategory";
import CommentDetails from "./pages/comment/CommentDetails";
import UserDetails from "./pages/user/UserDetails";
import RouteProtection from "./components/common/RouteProtection";
import AdminRouteProtection from "./components/common/AdminRouteProtection";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={IndexRoute} element={<WebLayout />}>
            <Route index element={<Index />} />

            <Route path={BlogDetailaRoute()} element={<BlogDetails />} />
            <Route path={BlogByCategoryRoute()} element={<BlogByCategory />} />

            <Route element={<RouteProtection />}>
              <Route path={ProfileRoute} element={<Profile />} />
              <Route path={BlogRoute} element={<Blog />} />
              <Route path={BlogAddRoute} element={<BlogAdd />} />
              <Route path={BlogEditRoute()} element={<BlogEdit />} />
              <Route path={CommentDetailsRoute} element={<CommentDetails />} />
            </Route>

            <Route element={<AdminRouteProtection />}>
              <Route
                path={CategoryDetailsRoute}
                element={<CategoryDetails />}
              />
              <Route path={CategoryAddRoute} element={<CategoryAdd />} />
              <Route path={CategoryEditRoute()} element={<CategoryEdit />} />
              <Route path={UserDetailsRoute} element={<UserDetails />} />
            </Route>
          </Route>

          <Route path={SignInRoute} element={<SignIn />} />
          <Route path={SignUpRoute} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
