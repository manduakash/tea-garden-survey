import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { HealthMetricsDataTable } from "@/components/data-tables/health-metrics-data-table"

export default function Page() {
  const data = [
    {
      "id": 1,
      "household_id": 101,
      "name": "John Doe",
      "gender": "Male",
      "dob": "1985-05-15",
      "age": 38,
      "height": 175.5,
      "weight": 70.2,
      "bmi": 22.8,
      "nutrition_status": "Normal",
      "bp": "120/80",
      "sugar_level": "Normal",
      "remarks": "Healthy"
    },
    {
      "id": 2,
      "household_id": 102,
      "name": "Jane Smith",
      "gender": "Female",
      "dob": "1990-08-20",
      "age": 33,
      "height": 160.2,
      "weight": 55.3,
      "bmi": 21.5,
      "nutrition_status": "MAM",
      "bp": "130/85",
      "sugar_level": "High",
      "remarks": "Requires follow-up"
    }
  ]
  return (
    (<SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <HealthMetricsDataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
