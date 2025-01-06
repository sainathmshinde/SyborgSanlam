import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Users, UserCheck, ShieldAlert, Clock } from "lucide-react";
import WithLayout from "@/components/layout/WithLayout";
import { DatePicker } from "@/components/ui/datePicker";
import { DateRangePicker } from "@/components/ui/dateRangePicker";

// Mock data for the dashboard
const dashboardData = {
  totalClients: 175,
  pendingRequests: 30,
  onboardedClients: 100,
  withComplianceTeam: 45,
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

const pieChartData = [
  { name: "Pending", value: dashboardData.pendingRequests, color: "#f97316" },
  {
    name: "Onboarded",
    value: dashboardData.onboardedClients,
    color: "#22c55e",
  },
  {
    name: "With Compliance",
    value: dashboardData.withComplianceTeam,
    color: "#3b82f6",
  },
];
function OnboardingDashboard() {
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
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.totalClients}
            </div>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-sm font-medium">
              Pending Onboarding
            </CardTitle>
            <Clock className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.pendingRequests}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-sm font-medium">
              Onboarded Clients
            </CardTitle>
            <UserCheck className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.onboardedClients}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b mb-3 bg-custom-black text-white py-3 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-sm font-medium">
              With Compliance Team
            </CardTitle>
            <ShieldAlert className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboardData.withComplianceTeam}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Onboarding Status Overview</CardTitle>
            <DateRangePicker placeholder="Jan 01 2024 - DEC 10 2024" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  label={renderCustomizedLabel}
                  dataKey="value"
                  onMouseDown={(data, index, event) => {
                    event.preventDefault();
                  }}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Client Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-custom-black hover:bg-custom-black">
                <TableRow>
                  <TableHead className="text-white ">Client Name</TableHead>
                  <TableHead className="text-white ">Status</TableHead>
                  <TableHead className="text-white ">Compliance Team</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.clientDetails.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          client.status === "Onboarded"
                            ? "success"
                            : client.status === "Pending"
                            ? "warning"
                            : "info"
                        }
                      >
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.complianceTeam}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

export default WithLayout("onboarding")(OnboardingDashboard);
