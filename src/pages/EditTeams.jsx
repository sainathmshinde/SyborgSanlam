import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditTeams = () => {
  //   const navigate = useNavigate();
  const [teams, setTeams] = useState({
    name: "Admin",
    members: "John Doe",
  });

  const handleInputChange = (field, value) => {
    setTeams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Edit Team</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Team Name"
                  value={teams.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="flex gap-20">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="teamMembers" className="w-full required">
                    Add Team Members
                  </Label>
                  <Input
                    id="teamMembers"
                    placeholder="Search for team members"
                    value={teams.members}
                    onChange={(e) =>
                      handleInputChange("members", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton type="submit">Edit Team</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditTeams);
