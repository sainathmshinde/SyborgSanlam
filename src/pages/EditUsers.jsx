import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditUsers = () => {
  //   const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile_number: "+1234567890",
    username: "johnDoe",
    role: "Admin",
  });

  const handleInputChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/users"); 
  };
  const handleSubmit = () => {
    navigate("/users"); 

    console.log("Submitted user data:", user);
    
  };

  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Edit User</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Name"
                  value={user.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Email
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Email Name"
                  value={user.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Mobile Number
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Mobile Number"
                  value={user.mobile_number}
                  onChange={(e) =>
                    handleInputChange("mobile_number", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="teamMembers" className="w-full required">
                  Username
                </Label>
                <Input
                  id="teamMembers="
                  placeholder="Enter Username"
                  value={user.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                />
              </div>

              {/* <div className="space-y-2 w-full">
                  <Label htmlFor="teamMembers" className="w-full required">
                   Role
                  </Label>
                  <Input
                    id="teamMembers"
                    placeholder="Enter Role"
                    value={user.role}
                    onChange={(e) =>
                      handleInputChange("role", e.target.value)
                    }
                  />
                  
                </div> */}
              <div className="space-y-2 w-full">
                <Label htmlFor="teamMembers" className="w-full required">
                  Role
                </Label>
                <select
                  id="teamMembers"
                  value={user.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="editor">Sales Manager</option>
                  <option value="viewer">Onboarding Team</option>
                  <option value="viewer">Compliance Approver</option>
                  <option value="viewer">Client User</option>
                  {/* Add more roles as needed */}
                </select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end mt-10">
                <RButton variant="outline" onClick={goBack}>
              Back
            </RButton>
                  <RButton className="ml-5" onClick={handleSubmit}>update</RButton>
                </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditUsers);
