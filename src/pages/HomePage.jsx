import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import { Construction, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const performanceData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
];

const allocationData = [
  { name: "Stocks", value: 400 },
  { name: "Bonds", value: 300 },
  { name: "Real Estate", value: 200 },
  { name: "Commodities", value: 100 },
];

const holdingsData = [
  { name: "AAPL", value: 400 },
  { name: "GOOGL", value: 300 },
  { name: "MSFT", value: 200 },
  { name: "AMZN", value: 100 },
  { name: "FB", value: 80 },
];

const riskReturnData = [
  { x: 10, y: 30, z: 200 },
  { x: 20, y: 50, z: 400 },
  { x: 30, y: 40, z: 300 },
  { x: 40, y: 70, z: 500 },
  { x: 50, y: 60, z: 100 },
];

const sectorPerformanceData = [
  { name: "Tech", Q1: 30, Q2: 40, Q3: 45, Q4: 50 },
  { name: "Healthcare", Q1: 25, Q2: 35, Q3: 40, Q4: 45 },
  { name: "Finance", Q1: 20, Q2: 30, Q3: 35, Q4: 40 },
  { name: "Consumer", Q1: 15, Q2: 25, Q3: 30, Q4: 35 },
  { name: "Energy", Q1: 10, Q2: 20, Q3: 25, Q4: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1> */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6 flex justify-between">
        <div className="flex items-start gap-4">
          <TriangleAlertIcon className="flex-shrink-0 text-yellow-600 h-6 w-6" />
          <div>
            <h3 className="text-yellow-800 font-medium">
              Please complete the profile
            </h3>
            <p className="text-yellow-700 text-sm">
              Make sure to fill out all the required fields before submitting
              the form.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="font-medium"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </Button>
      </div>
      {isProfileComplete ? (
        <div>
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-4">
            {["overview", "performance", "allocation", "risk"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Portfolio Performance */}

            <div className="col-span-full bg-card rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Portfolio Performance
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Asset Allocation */}
            <div className="col-span-1 bg-card rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {allocationData.map((entry, index) => (
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

            {/* Top Holdings */}
            <div className="col-span-1 bg-card rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-4">Top Holdings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={holdingsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Risk vs. Return */}
            <div className="col-span-1 bg-card rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-4">Risk vs. Return</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Risk" unit="%" />
                  <YAxis type="number" dataKey="y" name="Return" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter
                    name="Investments"
                    data={riskReturnData}
                    fill="#8884d8"
                  >
                    {riskReturnData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Sector Performance Heatmap */}
            <div className="col-span-full md:col-span-2 bg-card rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Sector Performance Heatmap
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Q1" fill="#8884d8" />
                  <Bar dataKey="Q2" fill="#82ca9d" />
                  <Bar dataKey="Q3" fill="#ffc658" />
                  <Bar dataKey="Q4" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Statistics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Total Value</h3>
              <p className="text-2xl">$1,234,567</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Annual Return</h3>
              <p className="text-2xl">12.34%</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Risk Score</h3>
              <p className="text-2xl">7.5 / 10</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center h-96 text-center justify-center  ">
          <Construction className="w-24 h-24 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center justify-center">
            Your dashboard is getting constructed
          </h1>
          <p className="text-lg text-gray-600">Please check back soon</p>
        </div>
      )}
    </div>
  );
}

export default WithLayout("client")(HomePage);
