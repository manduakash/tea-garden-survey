import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { LivelihoodDataTable } from "@/components/data-tables/livelihood-data-table"

export default function Page() {
  const data = [
    {
      id: 1,
      household_id: "example household 1",
      shg_member: 1,
      wants_to_join_shg: 0,
      training_required: 1,
      training_option: "Tailoring",
    },
    {
      id: 2,
      household_id: "example household 2",
      shg_member: 0,
      wants_to_join_shg: 1,
      training_required: 1,
      training_option: "Handicrafts",
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
              <LivelihoodDataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
