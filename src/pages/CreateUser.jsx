import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import {initialRoles}  from "./Role";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


const CreateUser = () => {
  const roles = initialRoles;
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    role: ""
  
  });
  console.log('here',roles);
  console.log("type", typeof roles);
  
  const [selectRole, setSelectRole] = useState(null)

const handleSelectRoleChange = (key, value) => {
  debugger
  if (key === "role") {
    setSelectRole(value);
  }
  // Handle other fields if necessary
};

const handleSubmit =()=>{
  navigate("/users")
}
const goBack = () => {
  navigate("/users"); 
};
  // const handleRoleChange = (id, value) => {
  //   setFormValues({
  //     ...formValues,
  //     [id]: value,
  //   });
  // };

  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Create New User</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2 ">
                <Label htmlFor="teamName" className="w-full required">
                  Name
                </Label>
                <Input id="teamName" placeholder="Enter Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Username
                </Label>
                <Input id="teamEmail" placeholder="Enter Username" />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Email
                </Label>
                <Input id="teamEmail" placeholder="Enter Email" />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Mobile Number
                </Label>
                <Input id="teamEmail" placeholder="Enter Mobile Number" />
              </div>
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Address
                </Label>
                <Input id="teamEmail" placeholder="Enter Address" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="required" htmlFor="city">
                    City
                  </Label>

                  <Input
                    id="city"
                    placeholder="Enter City"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="required" htmlFor="state">
                    State
                  </Label>
                  <Input
                    id="state"
                    placeholder="Enter State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country<span className="text-red-600 ml-1">*</span>
                  </Label>
                  <Select id="source">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">India</SelectItem>
                      <SelectItem value="Trade Show">South Africa</SelectItem>
                      <SelectItem value="Referral">China</SelectItem>
                      <SelectItem value="Cold Call">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-20">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="teamMembers" className="w-full required">
                    Add Role
                  </Label>
                  {/* <Combobox options={roles} value={selectRole} placeholder="Search for Role" /> */}
                  <Select
                      id="role"
                      onValueChange={(value) =>
                        handleSelectRoleChange("role", value)
                      }
                      value={selectRole || undefined} // Set the selected value
                      className='w-16'
                    >
                      <SelectTrigger className="w-[180px]">
                          <SelectValue  placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.name} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="teamRoles">Assign Roles</Label>
                  <Combobox placeholder="Search for roles" />
                </div> */}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>
                Back
              </RButton>
            <RButton className="ml-5" onClick={handleSubmit} type="submit">Submit</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(CreateUser);
