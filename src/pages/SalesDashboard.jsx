import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ResponsiveLine } from "@nivo/line";
import { useNavigate } from "react-router";

import WithLayout from "@/components/layout/WithLayout";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { useState } from "react";
import { Pointer } from "lucide-react";

const JaredPalmer = [
  { name: "Sales", leadsWithSales: 10 },
  { name: "Onboarding", leadsWithOnboarding: 15 },
  { name: "Compliance", leadsWithCompliance: 10 },
  { name: "Lost", lost: 20 },
];
const SarahJohnson = [
  { name: "Sales", leadsWithSales: 12 },
  { name: "Onboarding", leadsWithOnboarding: 10 },
  { name: "Compliance", leadsWithCompliance: 11 },
  { name: "Lost", lost: 13 },
];
const AlexDoe = [
  { name: "Sales", leadsWithSales: 9 },
  { name: "Onboarding", leadsWithOnboarding: 6 },
  { name: "Compliance", leadsWithCompliance: 5 },
  { name: "Lost", lost: 4 },
];

function SalesDashboard() {
  const navigate = useNavigate();
  const [record, setRecord] = useState("");
  const handleClick = (record) => {
    setRecord(record);
  };
  // console.log("record", record);

  const handleGraphClick = () => {
    navigate("/leadM");
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-bold">Sales Dashboard</h1> */}
      <div className="flex  ">
        <main className="flex-1 grid py-4 ">
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-5"> */}
          {/* <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card> */}
          {/* <Card>
              <CardHeader className=" h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Total Leads year to date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100</div>
              </CardContent>
            </Card> */}

          {/* <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Leads with Sales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card> */}

          {/* <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Leads with Onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card> */}

          {/* <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Leads with Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card> */}
          {/* </div> */}
          <div className="grid grid-cols-1 gap-4  ">
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center  pb-2 ">
                <CardTitle className=" mb-5">Process Wise Breakup</CardTitle>
              </CardHeader>

              <div>
                <CardContent className="grid grid-cols-2">
                  <Table>
                    <TableHeader className="bg-custom-black hover:bg-custom-black">
                      <TableRow>
                        {/* <TableHead className="text-white ">Name</TableHead>
                      <TableHead className="text-white text-center ">
                        Total Leads Year To Date
                      </TableHead> */}
                        {/* <TableHead className="text-white ">
                        Leads with Sales
                      </TableHead>
                      <TableHead className="text-white ">
                        Leads with Onboarding
                      </TableHead>

                      <TableHead className="text-white ">
                        Leads with Compliance
                      </TableHead> */}

                        {/* <TableHead className="text-white ">Total Leads</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        onClick={() => handleClick(JaredPalmer)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        <TableCell className="font-medium">
                          Jared Palmer
                        </TableCell>
                        <TableCell className="text-center">55</TableCell>
                      </TableRow>
                      <TableRow
                        onClick={() => handleClick(SarahJohnson)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        <TableCell className="font-medium">
                          Sarah Johnson
                        </TableCell>
                        <TableCell className="text-center">46</TableCell>
                      </TableRow>
                      <TableRow
                        onClick={() => handleClick(AlexDoe)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        <TableCell className="font-medium">Alex Doe</TableCell>
                        <TableCell className="text-center ">24</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className=" text-black font-bold">
                          Total
                        </TableCell>

                        <TableCell className="text-center text-black font-bold">
                          125
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {record && (
                    <div className="mb-2">
                      <h1 className="text-center">
                        <strong> Jared Palmer</strong>
                      </h1>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={record}
                          className="  px-4 py-4 cursor-pointer"
                          onClick={handleGraphClick}
                        >
                          <CartesianGrid strokeDasharray="4 4" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} />
                          <Legend />
                          <Bar
                            dataKey="leadsWithSales"
                            fill="#58508d"
                            name="Sales"
                            barSize={50}
                          />
                          <Bar
                            dataKey="leadsWithOnboarding"
                            fill="#2563EB"
                            name="Onboarding "
                            barSize={50}
                          />
                          <Bar
                            dataKey="leadsWithCompliance"
                            fill="#60A5FA"
                            name="Compliance"
                            barSize={50}
                          />
                          <Bar
                            dataKey="lost"
                            fill="#93C5FD"
                            name="lost"
                            barSize={50}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
            <Card className="w-1/2">
              <CardHeader className="flex flex-row items-center align-top justify-between pb-2">
                <CardTitle className=" mb-5">Month Wise Onboarding</CardTitle>
                <DateRangePicker placeholder="Jan 01 2024 - Dec 31 2024" />
              </CardHeader>
              <CardContent>
                <LineChart className=" aspect-[4/2]" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 5 },
              { x: "Feb", y: 15 },
              { x: "Mar", y: 5 },
              { x: "Apr", y: 20 },
              { x: "May", y: 10 },
              { x: "Jun", y: 5 },
              { x: "Jul", y: 15 },
              { x: "Aug", y: 5 },
              { x: "Sept", y: 20 },
              { x: "Oct", y: 15 },
              { x: "Nov", y: 10 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

export default WithLayout("sales")(SalesDashboard);
