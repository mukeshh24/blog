import React from "react";
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
import { Link } from "react-router-dom";
import { IndexRoute } from "@/routers/WebsiteRoutes";
import Logo from "@/assets/images/logo-white.png";
import { FaHome, FaBlog, FaUser, FaComments } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GoDot } from "react-icons/go";

const AppSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="bg-white">
          <img src={Logo} alt="Logo" width={120} />
        </SidebarHeader>
        <SidebarContent className="bg-white">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaHome />
                  <Link to={IndexRoute}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaBlog />
                  <Link to={IndexRoute}>Blogs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MdCategory />
                  <Link to={IndexRoute}>Categories</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaComments />
                  <Link to={IndexRoute}>Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaUser />
                  <Link to={IndexRoute}>User</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <GoDot />
                  <Link to={IndexRoute}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
