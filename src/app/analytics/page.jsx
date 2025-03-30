"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Bar, Pie, Line, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

export default function Page() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-6">
          {/* Tabs Navigation */}
          <Tabs defaultValue="district">
            <TabsList className="flex justify-center gap-4 bg-gray-100 p-2 rounded-lg">
              <TabsTrigger value="district">District Wise</TabsTrigger>
              <TabsTrigger value="sub-division">Sub-Division Wise</TabsTrigger>
              <TabsTrigger value="block">Block Wise</TabsTrigger>
              <TabsTrigger value="municipality">Municipality Wise</TabsTrigger>
              <TabsTrigger value="ward">Ward Wise</TabsTrigger>
              <TabsTrigger value="village">Village Wise</TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              {/* District Wise Data */}
              <TabsContent value="district">
                <h2 className="text-2xl font-bold mb-4">District Wise Data</h2>
                <Bar data={{ /* Your District Data */ }} />
              </TabsContent>

              {/* Sub-Division Wise Data */}
              <TabsContent value="sub-division">
                <h2 className="text-2xl font-bold mb-4">Sub-Division Wise Data</h2>
                <Pie data={{ /* Your Sub-Division Data */ }} />
              </TabsContent>

              {/* Block Wise Data */}
              <TabsContent value="block">
                <h2 className="text-2xl font-bold mb-4">Block Wise Data</h2>
                <Line data={{ /* Your Block Data */ }} />
              </TabsContent>

              {/* Municipality Wise Data */}
              <TabsContent value="municipality">
                <h2 className="text-2xl font-bold mb-4">Municipality Wise Data</h2>
                <Doughnut data={{ /* Your Municipality Data */ }} />
              </TabsContent>

              {/* Ward Wise Data */}
              <TabsContent value="ward">
                <h2 className="text-2xl font-bold mb-4">Ward Wise Data</h2>
                <PolarArea data={{ /* Your Ward Data */ }} />
              </TabsContent>

              {/* Village Wise Data */}
              <TabsContent value="village">
                <h2 className="text-2xl font-bold mb-4">Village Wise Data</h2>
                <Bar data={{ /* Your Village Data */ }} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
