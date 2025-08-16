import MainFooter from "@/components/MainFooter";
import MainSidebar from "@/components/MainSidebar";
import MainTopbar from "@/components/MainTopbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <SidebarProvider>
        <MainSidebar />
        <MainTopbar />
        <main className="w-full">
          <div className="w-full min-h-[calc(100vh-36px)]">
            <Outlet />
          </div>
          <MainFooter />
        </main>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;
