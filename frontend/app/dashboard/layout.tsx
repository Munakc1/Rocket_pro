
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#d4efde]">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <DashboardSidebar />

        {/* Dashboard Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Dashboard Content */}
          <main className="min-h-[calc(100vh-82px)] flex-1">
            {children}
          </main>

          {/* Dashboard Footer */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

