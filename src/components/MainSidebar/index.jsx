import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logo-white.png";
// import { IoHomeOutline } from "react-icons/io5";
// import { BiCategory } from "react-icons/bi";
// import { GrBlog } from "react-icons/gr";
// import { FaRegComments } from "react-icons/fa";
// import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { MainSidebarData } from "@/json/MainSidebarData";

const MainSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader className="bg-white">
          <img src={Logo} alt="Logo" className="w-30" />
        </SidebarHeader>
        <SidebarContent className="bg-white pl-4">
          <SidebarGroup>
            <SidebarMenu>
              {MainSidebarData &&
                MainSidebarData.map((item) => {
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton>
                        <item.icon />
                        <Link to={item.urlRoute}>{item.heading}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              {/* <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <Link to={""}>Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategory />
                  <Link to={""}>Categories</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <GrBlog />
                  <Link to={""}>Blogs</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments />
                  <Link to={""}>Comments</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LuUsers />
                  <Link to={""}>Users</Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <GoDot />
                  <Link to={""}>Category Item</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default MainSidebar;
