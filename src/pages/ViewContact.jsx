import { useState } from "react";
import { useNavigate } from "react-router";
import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/ui/commentSection";
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

const ViewContact = () => {
  const navigate = useNavigate();
  const [isManagerSelected, setIsManagerSelected] = useState(false);
  const [contact, setContact] = useState({
    // Personal Information
    name: "Teslack Organization",
    contactName: "Sarah Johnson",
    mobile: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    description: "Prospective investment of $20 million ",
    // Assignment Details
    relationshipManager: "john_doe",
    stage: "proposal",
    onboardingManager: "John_smith",
    // Address Information
    address: "742 Maple Avenue, Suite 200",
    city: "San Francisco",
    state: "California",
    country: "USA",
  });

  const handleInputChange = (field, value) => {
    setContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOnboardingChange = () => {};

  const relationshipManagers = [
    { value: "self", label: "Self" },
    { value: "john_doe", label: "John Doe" },
    { value: "jane_smith", label: "Jane Smith" },
    { value: "bob_johnson", label: "Bob Johnson" },
    { value: "alice_williams", label: "Alice Williams" },
  ];

  const onboardingManagers = [
    { value: "john_smith", label: "John Smith" },
    { value: "Davis", label: "Emily Davis" },
    { value: "Michael", label: "Michael Brown" },
    { value: "essica", label: "essica Wilson" },
  ];

  const stages = [
    { value: "lead", label: "Lead" },
    { value: "prospect", label: "Prospect" },
    { value: "proposal", label: "Proposal" },
    // { value: "onboarding", label: "Onboarding" },
    { value: "lost", label: " Lost" },
  ];

  const countries = [
    { value: "USA", label: "United States" },
    { value: "ZAF", label: "South Africa" },
    { value: "CHN", label: "China" },
    { value: "AUS", label: "Australia" },
    { value: "IND", label: "India" },
  ];

  return (
    <div className=" mx-auto p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lead </h1>
      </div>

      <form className="space-y-4">
        {/* Personal Information Card */}
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Customer Name<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  value={contact.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter Full Name"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">
                  Contact Person<span className="text-red-600 ml-1">*</span>
                </Label>
                <Input
                  id="contactName"
                  value={contact.contactName}
                  onChange={(e) =>
                    setContact({
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
                  value={contact.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
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
                  value={contact.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2 grid-cols-1 mt-2">
              <Label htmlFor="address">
                About Lead<span className="text-red-600 ml-1">*</span>
              </Label>
              <Textarea
                id="description"
                type="text"
                value={contact.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                  id="address"
                  value={contact.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter Complete Address"
                  className="min-h-[50px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={contact.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={contact.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Enter State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">
                    Country<span className="text-red-600 ml-1">*</span>
                  </Label>
                  <Select
                    value={contact.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment to onboarding Card */}
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Assignment Details</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="relationshipManager">
                  Relationship Manager
                </Label>
                <Select
                  value={contact.relationshipManager}
                  onValueChange={(value) =>
                    handleInputChange("relationshipManager", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Relationship Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipManagers.map((manager) => (
                      <SelectItem key={manager.value} value={manager.value}>
                        {manager.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">
                  Stage<span className="text-red-600 ml-1">*</span>
                </Label>
                <Select
                  value={contact.stage}
                  onValueChange={(value) => handleInputChange("stage", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            {/* <h2 className="text-lg font-semibold mb-4">Assignment Details</h2> */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-16">
              <div className="space-y-2">
                <Label htmlFor="onboardingManager">Assign To</Label>
                <Select
                  value={contact.onboardingManager}
                  onValueChange={(value) => {
                    handleInputChange("onboardingManager", value);
                    setIsManagerSelected(true); // Set to true when a selection is made
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select onboarding manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {onboardingManagers.map((manager) => (
                      <SelectItem key={manager.value} value={manager.value}>
                        {manager.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="p-8">
                <Button
                  disabled={!isManagerSelected}
                  onClick={() => navigate("/contacts")}
                >
                  Assign For Onboarding
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate("/contacts")}>
            Cancel
          </Button>
          <Button onClick={() => navigate("/contacts")}>Save Changes</Button>
        </div>

        <CommentSection className="bg-gray-200" />
      </form>
    </div>
  );
};

export default WithLayout("sales")(ViewContact);
