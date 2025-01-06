import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateContact = () => {
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({
    name: "",
    contactName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    assignedUser: "",
  });

  return (
    <div className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create New Lead</h1>
        {/* <Button variant="secondary" className="flex items-center">
          <UserPlusIcon className="h-4 w-4 mr-2" />
          <span>Transfer to onboarding</span>
        </Button> */}
      </div>

      <form className="space-y-2">
        {/* Personal Information Card */}
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Customer Name<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                  placeholder="Enter Name"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">
                  Contact Person<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="contactName"
                  value={newContact.contactName}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      contactName: e.target.value,
                    })
                  }
                  placeholder="Enter Name"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">
                  Mobile<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="mobile"
                  value={newContact.mobile}
                  onChange={(e) =>
                    setNewContact({ ...newContact, mobile: e.target.value })
                  }
                  placeholder="Enter Mobile Number"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newContact.email}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                  placeholder="Enter Email"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2 grid-cols-1 mt-2">
              <Label htmlFor="address">
                About Lead<span className="text-red-600 ml-1">*</span>
              </Label>
              <Textarea
                placeholder="Write more about lead"
                className="min-h-[50px]"
              />
            </div>
          </CardContent>
        </Card>
        {/* Address Information Card */}
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Address Information</h2> */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">
                  Address<span className="text-red-600 ml-1">*</span>
                </Label>
                <Textarea
                  placeholder="Enter Address"
                  className="min-h-[50px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="required" htmlFor="city">
                    City
                  </Label>

                  <Input
                    id="city"
                    value={newContact.city}
                    onChange={(e) =>
                      setNewContact({ ...newContact, city: e.target.value })
                    }
                    placeholder="Enter City"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="required" htmlFor="state">
                    State
                  </Label>
                  <Input
                    id="state"
                    value={newContact.state}
                    onChange={(e) =>
                      setNewContact({ ...newContact, state: e.target.value })
                    }
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
            </div>
          </CardContent>
        </Card>
        {/* Assignment Details Card */}
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Assignment Details</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientServiceManager" className="required">
                  Relationship Manager
                </Label>
                <Select
                  id="clientServiceManager"
                  value={newContact.clientServiceManager}
                  onValueChange={(value) =>
                    setNewContact({
                      ...newContact,
                      clientServiceManager: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Relationship Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john_doe">Self</SelectItem>
                    <SelectItem value="john_doe">John Doe</SelectItem>
                    <SelectItem value="jane_smith">Jane Foster</SelectItem>
                    <SelectItem value="bob_johnson">Bob Marley</SelectItem>
                    <SelectItem value="alice_williams">
                      Alice Williams
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">
                  Stage<span className="text-red-600 ml-1">*</span>
                </Label>
                <Select
                  id="stage"
                  value={newContact.clientServiceManager}
                  onValueChange={(value) =>
                    setNewContact({
                      ...newContact,
                      clientServiceManager: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qualified">Lead</SelectItem>
                    <SelectItem value="proposal">Prospect</SelectItem>
                    <SelectItem value="neg">Proposal</SelectItem>
                    <SelectItem value="cw">Onboarding</SelectItem>
                    <SelectItem value="cl">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 pt-4">
          <Button variant="outline" onClick={() => navigate("/contacts")}>
            Cancel
          </Button>
          <Button onClick={() => navigate("/contacts")}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default WithLayout("sales")(CreateContact);
