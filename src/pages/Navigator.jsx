import { useNavigate } from "react-router";

import WithNavigatorLayout from "@/components/layout/WithNavigatorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Navigator() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Admin",
      description: "Manage administrative tasks and settings",
      path: "/roles",
    },
    {
      title: "Compliance",
      description: "Ensure adherence to regulations",
      path: "/complianceDashboard",
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
      title: "Customer",
      description: "Handle customer-related activities",
      path: "/signup",
    },
  ];

  return (
    <div className="min-h-screen bg-background ">
      <div className="flex flex-wrap justify-start gap-4 w-full">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="w-full sm:w-64 h-44 cursor-pointer hover:bg-muted shadow-lg border-0 rounded-lg"
            onClick={() => {
              navigate(category.path);
            }}
          >
            <CardHeader className="border-b mb-4 bg-custom-black text-white rounded-tl-lg rounded-tr-lg">
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default WithNavigatorLayout(Navigator);
