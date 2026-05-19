import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import AppSidebar from "@/components/common/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main className="w-full">
        <div className="w-full min-h-[calc(100vh-38px)] py-20 px-3 md:px-5 lg:px-7">
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default WebLayout;
