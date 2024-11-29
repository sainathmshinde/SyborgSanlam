import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";

const CreateTeam = () => {
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-3xl font-bold">Create a New Team</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full">
                  Team Name
                </Label>
                <Input id="teamName" placeholder="Enter team name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamName">Primary Email</Label>
                <Input id="teamEmail" placeholder="Enter email" />
              </div>

              <div className="flex gap-20">
                <div className="space-y-2">
                  <Label htmlFor="teamMembers">Add Team Members</Label>
                  <Combobox placeholder="Search for team members" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamRoles">Assign Roles</Label>
                  <Combobox placeholder="Search for roles" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton type="submit">Create Team</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(CreateTeam);
