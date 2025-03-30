"use client";

import * as React from "react";
import dynamic from "next/dynamic"; // Import dynamic for client-side rendering
import L from "leaflet"; // Import Leaflet for custom marker
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as XLSX from "xlsx";
import { FileSpreadsheet } from "lucide-react";
import { Card } from "../ui/card";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Define a custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png", // Default Leaflet marker icon
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup anchor point
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png", // Shadow image
  shadowSize: [41, 41], // Size of the shadow
});

export function HouseHoldsDataTable({ data: initialData }) {
  const [data, setData] = React.useState(() => initialData);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null); // State to store the selected row
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5, // Show 5 rows in the table
  });

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "survey_id",
        header: "Survey ID",
      },
      {
        accessorKey: "district",
        header: "District",
      },
      {
        accessorKey: "sub_division",
        header: "Subdivision",
      },
      {
        accessorKey: "block",
        header: "Block",
      },
      {
        accessorKey: "gp",
        header: "Gram Panchayat",
      },
      {
        accessorKey: "village",
        header: "Village",
      },
      {
        accessorKey: "house_number",
        header: "House Number",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedRow(row.original); // Set the selected row data
              setIsDialogOpen(true); // Open the dialog
            }}
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handle Excel file export
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Households Data");
    XLSX.writeFile(workbook, "households_data.xlsx");
  };

  return (
    <div className="overflow-hidden mx-10">
      <div className="p-4 flex justify-between items-center">
        <Input
          placeholder="Search by survey ID, state, district, etc."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hover:bg-green-100 bg-green-50 border-green-700/40"
            onClick={handleExportToExcel}
          >
            <FileSpreadsheet className="text-green-700" /> Export to Excel
          </Button>
        </div>
      </div>
      <Card className="overflow-hidden rounded-lg border shadow-md dark:border-slate-700 dark:bg-slate-800 py-0">
        <Table>
          <TableHeader className="bg-slate-100 dark:bg-slate-700 my-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} | Total Records: {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[80vw] min-w-[80vw] w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
          <DialogHeader>
            <DialogTitle>Row Details</DialogTitle>
          </DialogHeader>
          {selectedRow && (
            <div className="space-y-4 flex">
              <div className="space-y-2">
                {Object.entries(selectedRow).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
                  </div>
                ))}
              </div>
              {selectedRow?.latitude && selectedRow?.longitude && (
                <MapContainer
                className=""
                  center={[selectedRow?.latitude, selectedRow?.longitude]}
                  zoom={13}
                  style={{ height: "450px", width: "90%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[selectedRow?.latitude, selectedRow?.longitude]}
                    icon={customMarkerIcon} // Use the custom marker icon
                  >
                    <Popup>
                      <strong>Household Location</strong>
                      <br />
                      Latitude: {selectedRow?.latitude}
                      <br />
                      Longitude: {selectedRow?.longitude}
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
