import AppSidebar from "@/components/applications/AppSidebar";
import Footer from "@/components/applications/Footer";
import Header from "@/components/applications/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const WebsiteLayout = () => {
  return (
    <>
      <SidebarProvider>
        <Header />
        <AppSidebar />
        <main className="w-full">
          <div className="w-full min-h-[calc(100vh-50px)]"><Outlet /></div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default WebsiteLayout;
