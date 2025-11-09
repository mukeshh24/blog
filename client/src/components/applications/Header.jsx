import React from "react";
import Logo from "@/assets/images/logo-white.png";
import { Button } from "../ui/button";
import { MdLogin } from "react-icons/md";
import { Link } from "react-router-dom";
import { SignInRoute } from "@/routers/WebsiteRoutes";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between h-16 fixed w-full bg-white z-20 border-b px-3">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="w-[500px]">
          <SearchBox />
        </div>
        <div>
          <Button className="rounded-full">
            <MdLogin />
            <Link to={SignInRoute}>Sign In</Link>
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
