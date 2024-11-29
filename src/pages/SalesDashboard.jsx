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
import WithLayout from "@/components/layout/WithLayout";
import { DateRangePicker } from "@/components/ui/dateRangePicker";

function SalesDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Sales Dashboard</h1>
      <div className="flex  ">
        <main className="flex-1 grid py-4 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-5">
            <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Total Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">150</div>
                {/* <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className=" h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Clients onboarded year to date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Leads with compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="h-16 flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-sm font-medium">
                  Leads with onboarding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center align-top justify-between pb-2">
                <CardTitle className=" mb-5">Month wise onboarding</CardTitle>
                <DateRangePicker />
              </CardHeader>
              <CardContent>
                <LineChart className="w-full aspect-[4/3]" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 ">
                <CardTitle className=" mb-5">Relationship Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-custom-black hover:bg-custom-black">
                    <TableRow>
                      <TableHead className="text-white ">Name</TableHead>
                      <TableHead className="text-white ">
                        Clients onboarded year to date
                      </TableHead>

                      <TableHead className="text-white ">
                        Leads with compliance
                      </TableHead>
                      <TableHead className="text-white ">
                        Leads with onboarding
                      </TableHead>
                      <TableHead className="text-white ">Total Leads</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Jared Palmer
                      </TableCell>
                      <TableCell className="text-end">20</TableCell>

                      <TableCell className="text-end">7</TableCell>
                      <TableCell className="text-end">10</TableCell>
                      <TableCell className="text-end">37</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Sarah Johnson
                      </TableCell>
                      <TableCell className="text-end">45</TableCell>

                      <TableCell className="text-end">15</TableCell>
                      <TableCell className="text-end">8</TableCell>
                      <TableCell className="text-end">68</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Alex Doe</TableCell>
                      <TableCell className="text-end">35</TableCell>

                      <TableCell className="text-end">3</TableCell>
                      <TableCell className="text-end">7</TableCell>
                      <TableCell className="text-end">45</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className=" text-black font-bold">
                        Total
                      </TableCell>

                      <TableCell className="text-end text-black font-bold">
                        100
                      </TableCell>

                      <TableCell className="text-end text-black font-bold">
                        25
                      </TableCell>
                      <TableCell className="text-end text-black font-bold">
                        25
                      </TableCell>
                      <TableCell className="text-end text-black font-bold">
                        150
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
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
              { x: "feb", y: 10 },
              { x: "Mar", y: 5 },
              { x: "Apr", y: 15 },
              { x: "May", y: 5 },
              { x: "Jun", y: 5 },
              { x: "Jul", y: 10 },
              { x: "Aug", y: 5 },
              { x: "Sept", y: 20 },
              { x: "Oct", y: 15 },
              { x: "Nov", y: 5 },
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
