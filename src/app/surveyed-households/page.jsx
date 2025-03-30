"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import dynamic from "next/dynamic";

const data = [
  {
    id: 1,
    survey_id: "SURV001",
    state: "West Bengal",
    district: "Darjeeling",
    sub_division: "Kurseong",
    block: "Mirik",
    gp: "Gopal Dhura",
    village: "Tea Garden Village",
    house_number: "001",
    latitude: 26.88812345,
    longitude: 88.26789012,
    family_income: 15000.50,
  },
  {
    id: 2,
    survey_id: "SURV002",
    state: "West Bengal",
    district: "Kalimpong",
    sub_division: "Kalimpong I",
    block: "Kalimpong Block",
    gp: "Kalimpong GP",
    village: "Hill Top Village",
    house_number: "002",
    latitude: 27.05712345,
    longitude: 88.47567890,
    family_income: 20000.75,
  },
  {
    id: 3,
    survey_id: "SURV003",
    state: "West Bengal",
    district: "Jalpaiguri",
    sub_division: "Mal",
    block: "Matiali",
    gp: "Matiali GP",
    village: "Tea Workers Colony",
    house_number: "003",
    latitude: 26.84567890,
    longitude: 88.12345678,
    family_income: 18000.00,
  },
];

export default function Page() {
  const HouseHoldsDataTable = dynamic(() => import("@/components/data-tables/households-data-table").then((mod) => mod.HouseHoldsDataTable), {
    ssr: false,
  });
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <HouseHoldsDataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
