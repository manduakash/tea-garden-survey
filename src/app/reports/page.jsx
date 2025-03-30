"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Bar } from "react-chartjs-2";
import { useTable } from "react-table";
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
  // Dummy Data for Charts and Tables
  const districtData = {
    labels: ["District A", "District B", "District C", "District D"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [120, 150, 180, 200],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const districtTableData = [
    { district: "District A", surveyedHouseholds: 120 },
    { district: "District B", surveyedHouseholds: 150 },
    { district: "District C", surveyedHouseholds: 180 },
    { district: "District D", surveyedHouseholds: 200 },
  ];

  const subDivisionData = {
    labels: ["Sub-Division 1", "Sub-Division 2", "Sub-Division 3"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [80, 100, 90],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const subDivisionTableData = [
    { subDivision: "Sub-Division 1", surveyedHouseholds: 80 },
    { subDivision: "Sub-Division 2", surveyedHouseholds: 100 },
    { subDivision: "Sub-Division 3", surveyedHouseholds: 90 },
  ];

  const blockData = {
    labels: ["Block 1", "Block 2", "Block 3", "Block 4"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [50, 70, 60, 80],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const municipalityData = {
    labels: ["Municipality A", "Municipality B", "Municipality C"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [100, 120, 110],
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const wardData = {
    labels: ["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [30, 40, 35, 50, 45],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const villageData = {
    labels: ["Village A", "Village B", "Village C", "Village D"],
    datasets: [
      {
        label: "Surveyed Households",
        data: [20, 25, 30, 35],
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define columns for tables
  const districtColumns = [
    { Header: "District", accessor: "district" },
    { Header: "Surveyed Households", accessor: "surveyedHouseholds" },
  ];

  const subDivisionColumns = [
    { Header: "Sub-Division", accessor: "subDivision" },
    { Header: "Surveyed Households", accessor: "surveyedHouseholds" },
  ];

  // Render a table
  const renderTable = (columns, data) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data });

    return (
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-300 mt-4"
      >
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr
              key={headerIndex} // Pass the key directly
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100"
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={columnIndex} // Pass the key directly
                  {...column.getHeaderProps()}
                  className="border border-gray-300 px-4 py-2 text-left"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={rowIndex} // Pass the key directly
                {...row.getRowProps()}
                className="hover:bg-gray-50"
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex} // Pass the key directly
                    {...cell.getCellProps()}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

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
                <Bar data={districtData} />
                {renderTable(districtColumns, districtTableData)}
              </TabsContent>

              {/* Sub-Division Wise Data */}
              <TabsContent value="sub-division">
                <h2 className="text-2xl font-bold mb-4">Sub-Division Wise Data</h2>
                <Bar data={subDivisionData} />
                {renderTable(subDivisionColumns, subDivisionTableData)}
              </TabsContent>

              {/* Block Wise Data */}
              <TabsContent value="block">
                <h2 className="text-2xl font-bold mb-4">Block Wise Data</h2>
                <Bar data={blockData} />
              </TabsContent>

              {/* Municipality Wise Data */}
              <TabsContent value="municipality">
                <h2 className="text-2xl font-bold mb-4">Municipality Wise Data</h2>
                <Bar data={municipalityData} />
              </TabsContent>

              {/* Ward Wise Data */}
              <TabsContent value="ward">
                <h2 className="text-2xl font-bold mb-4">Ward Wise Data</h2>
                <Bar data={wardData} />
              </TabsContent>

              {/* Village Wise Data */}
              <TabsContent value="village">
                <h2 className="text-2xl font-bold mb-4">Village Wise Data</h2>
                <Bar data={villageData} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
