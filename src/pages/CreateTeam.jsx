import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";



const CreateTeam = () => {
  const members=[
  {
    id: 1,
    name: "John Doe ",
    
  },
  {
    id: 2,
    name: "Jared Palmer",
    
  },
  {
    id: 3,
    name: "Sarah Johnson",
    
  },
  {
    id: 4,
    name: "David Thompson",
    
  },
  {
    id: 5,
    name: "Lisa Anderson",
    
  },
  {
    id: 6,
    name: "Adam Barlow",
    
  },
]

  // const team = initialRoles;

  // const [member, setMember] = useState("")

  // const [formValues, setFormValues] = useState({
  //     member: ""
    
  //   });
  // const handleMemberChange = (key, value) => {
  //   debugger
  //   if (key === "member") {
  //     setMember(value);
  //   }
  //   // Handle other fields if necessary
  // };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Create New Team</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Team Name
                </Label>
                <Input id="teamName" placeholder="Enter Team Name" />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Description
                </Label>
                <Input id="teamEmail" placeholder="Enter Description" />
              </div>

              <div className="flex gap-20">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="teamMembers" className="w-full required">
                    Add Team Members
                  </Label>
                  <Combobox options={members} placeholder="Search for team members" />
                  {/* <Select
                      id="member"
                      onValueChange={(value) =>
                        handleMemberChange("member", value)
                      }
                      value={member || undefined} // Set the selected value
                      className='w-16'
                    >
                      <SelectTrigger className="w-[180px]">
                          <SelectValue  placeholder="Select Members" />
                      </SelectTrigger>
                      <SelectContent>
                        {teams.map((member) => (
                          <SelectItem key={member.name} value={member.name}>
                            {member.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}

                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="teamRoles">Assign Roles</Label>
                  <Combobox placeholder="Search for roles" />
                </div> */}
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
