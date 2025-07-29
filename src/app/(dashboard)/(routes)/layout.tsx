import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full relative">
      {/* Sidebar visible only on md+ screens */}
      <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-[80] bg-gray-900 text-white p-4">
        <Sidebar />
      </div>

      {/* Main content area with left padding on md+ */}
      <main className="md:pl-72 p-4">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
