import { useNavigate } from "react-router";
import { ResponsiveLine } from "@nivo/line";

import WithNavigatorLayout from "@/components/layout/WithNavigatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
function Navigator() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Admin",
      description: "Manage administrative tasks and settings",
      path: "/roles",
    },
    {
      title: "Customer",
      description: "Handle customer related activities",
      path: "/login",
    },
    {
      title: "Sales",
      description: "Manage sales processes and data",
      path: "/salesdashboard",
    },
    {
      title: "Onboarding",
      description: "Guide new users through the system",
      path: "/onboardingdashboard",
    },
    {
      title: "Compliance",
      description: "Ensure adherence to regulations",
      path: "/complianceDashboard",
    },
  ];
  const userData = [
    {
      name: "Lisa Anderson",
      pending: 12,
      completed: 25,
      sentBack: 12,
      sales: 12,
      lost: 12,
    },
    {
      name: "David Thompson",
      pending: 8,
      completed: 12,
      sentBack: 8,
      sales: 15,
      lost: 8,
    },
    {
      name: "Samantha Green",
      pending: 10,
      completed: 13,
      sentBack: 5,
      sales: 18,
      lost: 5,
    },
  ];

  const completedRequests = userData.reduce(
    (sum, user) => sum + user.completed,
    0
  );

  const salesRequests = userData.reduce((sum, user) => sum + user.sales, 0);
  const lost = userData.reduce((sum, user) => sum + user.lost, 0);

  const pendingRequests = userData.reduce((sum, user) => sum + user.pending, 0);

  const sentBackRequests = userData.reduce(
    (sum, user) => sum + user.sentBack,
    0
  );

  const pieChartData = [
    { name: "Approved", value: completedRequests },
    { name: "Onboarding", value: pendingRequests },
    { name: "Compliance ", value: sentBackRequests },
    { name: "Sales ", value: salesRequests },

    { name: "Lost ", value: lost },
  ];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
  const dashboardData = {
    totalClients: 75,
    pendingRequests: 30,
    onboardedClients: 50,
    withComplianceTeam: 25,
    clientDetails: [
      { id: 1, name: "Client A", status: "Pending", complianceTeam: "Team 1" },
      { id: 2, name: "Client B", status: "Onboarded", complianceTeam: "-" },
      {
        id: 3,
        name: "Client C",
        status: "With Compliance",
        complianceTeam: "Team 2",
      },
      { id: 4, name: "Client D", status: "Pending", complianceTeam: "Team 3" },
      { id: 5, name: "Client E", status: "Onboarded", complianceTeam: "-" },
    ],
  };

  const pieChartData1 = [
    {
      name: "Onboarding",
      value: dashboardData.pendingRequests,
      color: "#f97316",
    },
    {
      name: "Compliance",
      value: dashboardData.withComplianceTeam,
      color: "#3b82f6",
    },
    {
      name: "Approved",
      value: dashboardData.onboardedClients,
      color: "#22c55e",
    },
  ];

  return (
    <div className=" bg-background ">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="w-full sm:w-64 h-40 cursor-pointer hover:bg-muted shadow-lg border-0 rounded-lg m-7"
            onClick={() => {
              navigate(category.path);
            }}
          >
            <CardHeader className="border-b mb-4 bg-custom-black text-white rounded-tl-lg rounded-tr-lg">
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <strong style={{ color: "black" }}>
                  {" "}
                  {category.description}
                </strong>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div className="grid grid-cols-3 gap-4  "> */}
      <div className="flex justify-center items-center  ">
        <div className="grid grid-cols-1 gap-4  ">
          {/* <Card className="w-6/7">
          <CardHeader className="flex flex-column  align-top  mb-2">
            <CardTitle className=" mb-4">Month Wise Leads</CardTitle>
            <DateRangePicker placeholder="Jan 01 2024 - Dec 31 2024" />
          </CardHeader>
          <h1 className="text-lg ml-4 mb-3">Total Leads : 175</h1>

          <CardContent className="mt-4">
            <LineChart className=" aspect-[5/2]" />
          </CardContent>
        </Card> */}
          <Card className=" mb-72">
            <CardHeader className="flex flex-column justify-between ">
              <CardTitle className="mb-4">Total Requests: 175</CardTitle>
              {/* <div>Total Request</div> */}
              <DateRangePicker placeholder="Jan 01 2024 - DEC 31 2024" />
            </CardHeader>
            {/* <h1 className="text-lg ml-4">Total Request : 175</h1> */}
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseDown={(data, index, event) => {
                        event.preventDefault();
                      }}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          {/* <Card className="w-6/7 ">
          <CardHeader className="flex flex-column justify-between ">
            <CardTitle className="mb-4">Onboarding Status</CardTitle>
            <div>Total Request</div>
            <DateRangePicker placeholder="Jan 01 2024 - DEC 31 2024" />
          </CardHeader>
          <h1 className="text-lg ml-4">Total Request : 175</h1>
          <CardContent className="mt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData1}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseDown={(data, index, event) => {
                      event.preventDefault();
                    }}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}
        </div>
      </div>
    </div>
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
              { x: "Feb", y: 10 },
              { x: "Mar", y: 20 },
              { x: "Apr", y: 25 },
              { x: "May", y: 15 },
              { x: "Jun", y: 5 },
              { x: "Jul", y: 15 },
              { x: "Aug", y: 10 },
              { x: "Sept", y: 20 },
              { x: "Oct", y: 20 },
              { x: "Nov", y: 30 },
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

export default WithNavigatorLayout(Navigator);
