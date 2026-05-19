import { SignInRoute } from "@/routes/Route";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RouteProtection = () => {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={SignInRoute} />;
  }
};

export default RouteProtection;
