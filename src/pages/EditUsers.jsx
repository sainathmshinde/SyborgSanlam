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
  });

  const handleInputChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Edit User</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  User Name
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
                  User Name
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
                  User Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Mobile Number"
                  value={user.mobile_number}
                  onChange={(e) => handleInputChange("mobile_number", e.target.value)}
                />
              </div>

              <div className="flex gap-20">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="teamMembers" className="w-full required">
                   User Name
                  </Label>
                  <Input
                    id="teamMembers"
                    placeholder="Search for team members"
                    value={user.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton type="submit">Edit User</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditUsers);
