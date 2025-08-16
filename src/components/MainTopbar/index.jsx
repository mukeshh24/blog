import React from "react";
import Logo from "@/assets/images/logo-white.png";
import { LuLogIn } from "react-icons/lu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { SignInRoute } from "@/routes/UrlRoutes";

const MainTopbar = () => {
  return (
    <>
      <div className="flex items-center justify-between h-16 w-full fixed z-20 bg-white px-5 border-b">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div>
          <form>
            <Input
              id="search"
              name="search"
              placeholder="Search here..."
              className="h-9 rounded-full w-full min-w-[400px]"
            />
          </form>
        </div>
        <div>
          <Button className="rounded-full cursor-pointer">
            <LuLogIn />
            <Link to={SignInRoute}>Sing In</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainTopbar;
