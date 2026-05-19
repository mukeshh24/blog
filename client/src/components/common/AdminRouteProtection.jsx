import { SignInRoute } from "@/routes/Route";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRouteProtection = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isLoggedIn && auth?.user?.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={SignInRoute} />;
  }
};

export default AdminRouteProtection;
