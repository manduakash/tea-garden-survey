import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { WelfareDataTable } from "@/components/data-tables/welfare-data-table"

export default function Page() {
  const data = [
    {
      id: 1,
      household_id: "example household 1",
      caste_certificate: 1,
      lakshmir_bhandar: 0,
      swasthya_sathi: 1,
      old_age_pension: 0,
    },
    {
      id: 2,
      household_id: "example household 2",
      caste_certificate: 0,
      lakshmir_bhandar: 1,
      swasthya_sathi: 1,
      old_age_pension: 1,
    },
  ];

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
              <WelfareDataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
