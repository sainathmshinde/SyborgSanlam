import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WithLayout from "@/components/layout/WithLayout";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import { useNavigate } from "react-router";

// Mock data
const userData = [
  { name: "Lisa Anderson", pending: 10, completed: 50, sentBack: 15 },
  { name: "David Thompson", pending: 15, completed: 30, sentBack: 10 },
  { name: "Samantha Green", pending: 20, completed: 20, sentBack: 5 },
];

const totalRequests = userData.reduce(
  (sum, user) => sum + user.pending + user.completed + user.sentBack,
  0
);
const completedRequests = userData.reduce(
  (sum, user) => sum + user.completed,
  0
);
const pendingRequests = userData.reduce((sum, user) => sum + user.pending, 0);

const sentBackRequests = userData.reduce((sum, user) => sum + user.sentBack, 0);

const pieChartData = [
  { name: "Approved", value: completedRequests },
  { name: "Pending", value: pendingRequests },
  { name: "Sent Back", value: sentBackRequests },
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

const COLORS = ["#003f5c", "#58508d", "#bc5090"];

function ComplianceDashboard() {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/compliance");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Pie Chart */}
      {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Total Requests</CardTitle>
            <DateRangePicker placeholder="Jan 01 2024 - DEC 10 2024" />
          </CardHeader>
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
            {/* <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Total Requests: {totalRequests}
              </p>
            </div> */}
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pending with compliance team</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userData} className="mt-9 mb-2 px-4 py-4">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} />
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Bar dataKey="pending" fill="#58508d" name="Pending " />
                {/* <Bar dataKey="completed" fill="#58508d" name="Completed " /> */}
                {/* <Bar
                  dataKey="withSalesTeam"
                  fill="#bc5090"
                  name="With Sales Team"
                /> */}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending with compliance team</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white text-end">Pending</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((user) => (
                <TableRow
                  key={user.name}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={handleEdit}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="text-end">{user.pending}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default WithLayout("compliance")(ComplianceDashboard);
