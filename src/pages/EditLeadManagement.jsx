import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Separator } from "@radix-ui/react-select";
import CommentSection from "@/components/ui/commentSection";

import {
  Building,
  ChevronDown,
  ChevronRight,
  Dot,
  FileIcon,
  FileText,
  PlusCircle,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const TreeNode = ({ node, level }) => {
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <div className="flex items-center py-1">
        <span className="mr-2">{level > 0 ? "└─" : ""}</span>
        <span>{node.name}</span>
      </div>
      {node.children?.map((child, index) => (
        <TreeNode key={index} node={child} level={level + 1} />
      ))}
    </div>
  );
};
// To do document categories based on selected client type

const EditLeadManagement = () => {
  const [recipientType, setRecipientType] = useState("onboardingTeam");
  const navigate = useNavigate();
  const [isBeneficiaryDialogOpen, setIsBeneficiaryDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [preview, setPreview] = useState(null);

  const [bType, setbType] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Company");

  let params = new URLSearchParams(window.location.search);
  const [clientType, setClientType] = useState(
    params.get("clientType") || "company"
  );

  const [isManagerSelected, setIsManagerSelected] = useState(false);
  const [contact, setContact] = useState({
    // Personal Information
    name: "Teslack Organization",
    contactName: "Sarah Johnson",
    customerType: "Company",
    mobile: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    description: "Prospective investment of $20 million ",
    // Assignment Details
    relationshipManager: "john_doe",
    // stage: "proposal",
    stage: "Initiate Onboarding",
    onboardingManager: "John_smith",
    // Address Information
    address: "742 Maple Avenue",
    address1: "Oakwood Drive, Building 5",

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
  const handleUpload = () => {
    if (file) {
      console.log(
        `Uploading ${file.name} as ${selectedDocument} for ${selectedCategory}`
      );
      setUploadedDocuments((prev) => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], selectedDocument],
      }));
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  const handleDocumentSelect = (category, subOption) => {
    setSelectedCategory(category);
    setSelectedSubOption(subOption);
    setFile(null);
    setPreview(null);
  };

  const [beneficiaries, setBeneficiaries] = useState([
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      mobile: "+1 (555) 111-2222",
      type: "Individual",
      designation: "Director",
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      mobile: "+1 (555) 111-3333",
      type: "Individual",
      designation: "Director",
    },
  ]);

  const documentCategories = {
    "Certificate of Company": {
      main: "Incorporation Document",
      subOptions: ["Registration Certificate", "Incorporation Letter"],
    },
    "Address Proof of Company": {
      main: "Address Document",
      subOptions: ["Utility Bill", "Rental Agreement", "Bank Statement"],
    },
  };

  const documentCategories1 = {
    "ID Proof of Alice Johnson": {
      main: "ID Document",
      subOptions: ["National ID", "Driving Licence", "Passport"],
    },
    "Address Proof of Alice Johnson": {
      main: "Address Document",
      subOptions: ["Utility Bill", "Rental Agreement", "Bank Statement"],
    },
    "ID Proof of Bob Johnson": {
      main: "ID Document",
      subOptions: ["National ID", "Driving Licence", "Passport"],
    },
    "Address Proof of Bob Johnson": {
      main: "Address Document",
      subOptions: ["Utility Bill", "Rental Agreement", "Bank Statement"],
    },
  };
  const handleCreateLead = () => {
    setNewLead({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
      address1: "",

      city: "",
      state: "",
      country: "",
      status: "New",
      description: "",
      industry: "",
      source: "",
      assignedUser: "",
    });
  };
  // console.log("Initial customerType value:", contact.customerType);

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
    { value: "Jessica", label: "Jessica Wilson" },
  ];

  const stages = [
    { value: " newLead", label: " New Lead" },
    { value: "prospect", label: "Prospect" },
    { value: "proposal", label: "Proposal" },
    { value: "Initiate Onboarding", label: " Initiate Onboarding " },
    { value: "lost", label: " Lost" },
  ];

  const countries = [
    { value: "USA", label: "United States" },
    { value: "ZAF", label: "South Africa" },
    { value: "CHN", label: "China" },
    { value: "AUS", label: "Australia" },
    { value: "IND", label: "India" },
  ];
  const customerType = [
    { value: "company", label: "Company" },
    { value: "partnership", label: "Partnership" },
    { value: "individual", label: "Individual" },
    { value: "trust", label: "Trust" },
    { value: "fund", label: "Fund" },
  ];

  return (
    <div className="p-4">
      <div className="flex  items-center overflow-hidden sticky top-0 z-10">
        <h1 className=" text-xl font-bold ">Teslack Organization</h1>
      </div>

      {clientType === "company" ||
      clientType === "partnership" ||
      clientType === "trust" ? (
        <Tabs defaultValue="about">
          <div className="overflow-hidden sticky z-10 mb-2">
            <TabsList className=" flex justify-start mb-4 mt-4 ">
              <TabsTrigger
                value="about"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Manage Lead
              </TabsTrigger>
              <TabsTrigger
                value="basic"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Basic Information and Assign Lead
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Key Contributors
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Upload Documents
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="overflow-auto max-h-[500px]">
            <TabsContent value="about">
              <form className="space-y-4">
                {/* Personal Information Card */}
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}

                    <div className="space-y-2 grid-cols-1 ">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="relationshipManager"
                          className="required"
                        >
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
                              <SelectItem
                                key={manager.value}
                                value={manager.value}
                              >
                                {manager.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stage">
                          Stage
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Select
                          value={contact.stage}
                          onValueChange={(value) =>
                            handleInputChange("stage", value)
                          }
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
                    {/* <div className="grid grid-cols-2 md:grid-cols-2 gap-16 mt-3">
                      <div className="space-y-2  ">
                        <Label htmlFor="onboardingManager">
                          Select Onboarding Team Member
                        </Label>
                        <Select
                          value={contact.onboardingManager}
                          onValueChange={(value) => {
                            handleInputChange("onboardingManager", value);
                            setIsManagerSelected(true);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select onboarding manager" />
                          </SelectTrigger>
                          <SelectContent>
                            {onboardingManagers.map((manager) => (
                              <SelectItem
                                key={manager.value}
                                value={manager.value}
                              >
                                {manager.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="p-8">
                        <Button
                          disabled={!isManagerSelected}
                          onClick={() => navigate("/leadManagement")}
                        >
                          Assign For Onboarding
                        </Button>
                      </div>
                    </div> */}
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4 mr-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/leadManagement")}
                  >
                    Back
                  </Button>
                  <Button onClick={() => navigate("/leadManagement")}>
                    Update and Next
                  </Button>
                </div>

                <CommentSection className="bg-gray-200" />
              </form>
            </TabsContent>

            <TabsContent value="basic">
              <form className="space-y-4">
                {/* Personal Information Card */}
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Customer Name
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={contact.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="Enter Full Name"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerType">
                          Customer Type
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Select
                          // value="com"
                          onValueChange={(value) =>
                            handleInputChange("customerType", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Company" />
                          </SelectTrigger>
                          <SelectContent>
                            {customerType.map((customer) => (
                              <SelectItem
                                key={customer.value}
                                value={customer.value}
                              >
                                {customer.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address Line 1
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          value={contact.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          placeholder="Enter Complete Address"
                          className="min-h-[50px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address Line 2
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          value={contact.address1}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          placeholder="Enter Complete Address"
                          className="min-h-[50px]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City <span className="text-red-600 ml-1">*</span>
                          </Label>
                          <Input
                            id="city"
                            value={contact.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="Enter City"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">
                            State <span className="text-red-600 ml-1">*</span>
                          </Label>
                          <Input
                            id="state"
                            value={contact.state}
                            onChange={(e) =>
                              handleInputChange("state", e.target.value)
                            }
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
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
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
                {/* Address Information Card */}
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    {/* <h2 className="text-lg font-semibold mb-4">Address Information</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Contact Person
                          <span className="text-red-600 ml-1">*</span>
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
                          onChange={(e) =>
                            handleInputChange("mobile", e.target.value)
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
                          value={contact.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="Enter Email Address"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-16 mt-3">
                      <div className="space-y-2">
                        <Label htmlFor="sendTo">Send To -</Label>

                        {/* Radio Group for Selection */}
                        <RadioGroup
                          value={recipientType}
                          onValueChange={setRecipientType}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="onboardingTeam"
                              id="onboardingTeam"
                            />
                            <Label htmlFor="onboardingTeam">
                              Onboarding Team Member
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="customer" id="customer" />
                            <Label htmlFor="customer">Customer</Label>
                          </div>
                        </RadioGroup>

                        {/* Conditional Fields */}
                        {recipientType === "onboardingTeam" && (
                          <div className="space-y-2">
                            <Select
                              value={contact.onboardingManager}
                              onValueChange={(value) => {
                                handleInputChange("onboardingManager", value);
                                setIsManagerSelected(true);
                              }}
                            >
                              <SelectTrigger className="w-full mt-3">
                                <SelectValue placeholder="Select onboarding manager" />
                              </SelectTrigger>
                              <SelectContent>
                                {onboardingManagers.map((manager) => (
                                  <SelectItem
                                    key={manager.value}
                                    value={manager.value}
                                  >
                                    {manager.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {recipientType === "customer" && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              id="customerName"
                              placeholder="Enter customer Name"
                              className="w-full border p-2 rounded-md mt-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
              <div className="flex justify-end space-x-4 mt-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/leadManagement")}
                >
                  Back
                </Button>
                <Button onClick={() => navigate("/leadManagement")}>
                  Update and Next
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Key Contributors</CardTitle>
                  <CardDescription>
                    Manage key contributors information for the lead.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Dialog
                      open={isBeneficiaryDialogOpen}
                      onOpenChange={(e) => {
                        setIsBeneficiaryDialogOpen(e);
                        if (!e) {
                          setbType("");
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Key
                          Contributors
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Key Contributors</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addBeneficiary(Object.fromEntries(formData));
                          }}
                          className="space-y-4"
                        >
                          {/* <div className="space-y-2">
                              <Label htmlFor="type" className="required">
                                Type
                              </Label>
                              <Select name="type" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Individual">
                                    Individual
                                  </SelectItem>
                                  <SelectItem value="Trust">Trust</SelectItem>
                                  <SelectItem value="Company">
                                    Company
                                  </SelectItem>
                                  <SelectItem value="Partnership">
                                    Partnership
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div> */}
                          <div className="space-y-2">
                            <Label htmlFor="designation" className="required">
                              Designation
                            </Label>
                            <Select
                              name="designation"
                              required
                              onValueChange={(e) => {
                                setbType(e);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Individual">
                                  Director
                                </SelectItem>
                                <SelectItem value="Trust">Partner</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="required">
                                First Name
                              </Label>
                              <Input id="firstName" name="firstName" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="required">
                                Last Name
                              </Label>
                              <Input id="lastName" name="lastName" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="required">
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mobile" className="required">
                              Mobile Number
                            </Label>
                            <Input
                              id="mobile"
                              name="mobile"
                              type="tel"
                              required
                            />
                          </div>
                          {bType?.length ? (
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold my-5">
                                Compliance Checklist
                              </h3>

                              <div>
                                {Object.keys(individualDocuments).map(
                                  (item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2"
                                    >
                                      <Dot />
                                      <Label className="text-sm leading-tight">
                                        {convertToLabel(item)}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ) : null}

                          <Button
                            type="submit"
                            onClick={() => {
                              setbType("");
                              setIsBeneficiaryDialogOpen(false);
                            }}
                          >
                            Add Key Contributors
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile Number</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Designation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {beneficiaries.map((beneficiary, index) => (
                        <TableRow key={index}>
                          <TableCell>{beneficiary.firstName}</TableCell>
                          <TableCell>{beneficiary.lastName}</TableCell>
                          <TableCell>{beneficiary.email}</TableCell>
                          <TableCell>{beneficiary.mobile}</TableCell>
                          <TableCell>{beneficiary.type}</TableCell>
                          <TableCell>{beneficiary.designation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <div className="my-5 flex justify-end mx-5">
                {/* <Button
                      variant="outline"
                      onClick={() => navigate("/leads")}
                    >
                      Cancel
                    </Button> */}
                <Button className="ml-5" onClick={handleCreateLead}>
                  Initiate Onboarding
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar for document categories */}
                <div className="w-90 bg-white p-4 shadow-md overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Documents</h2>
                  <ul className="space-y-4">
                    <h3>
                      <strong> Company Documents - </strong>
                    </h3>
                    {Object.entries(documentCategories).map(
                      ([category, categoryData], index, arr) => (
                        <li
                          key={category}
                          className="border-b border-gray-300 pb-2" // Adds a visible border at the bottom
                        >
                          {/* Category header with expand/collapse toggle */}
                          <Button
                            variant={
                              category === selectedCategory
                                ? "secondary"
                                : "ghost"
                            }
                            className="flex items-center justify-between cursor-pointer w-full"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5" />
                              <span className="font-semibold">{category}</span>
                            </div>
                            {expandedCategories[category] ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                          </Button>

                          {/* Sub-options dropdown when category is expanded */}
                          {expandedCategories[category] && (
                            <div className="ml-6 mt-2 space-y-2">
                              <Select
                                onValueChange={(subOption) =>
                                  handleDocumentSelect(category, subOption)
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={`Select ${category} `}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {categoryData.subOptions.map((subOption) => (
                                    <SelectItem
                                      key={subOption}
                                      value={subOption}
                                      className={`${
                                        selectedSubOption === subOption
                                          ? "bg-green-100"
                                          : ""
                                      }`}
                                    >
                                      {subOption}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* Separator but not on last item */}
                          {index !== arr.length - 1 && (
                            <Separator className="my-2 border-gray-500" />
                          )}
                        </li>
                      )
                    )}
                  </ul>

                  <ul className="space-y-4">
                    <h3 className="mt-4">
                      <strong> KYC of Key Contributors - </strong>
                    </h3>
                    {Object.entries(documentCategories1).map(
                      ([category, categoryData], index, arr) => (
                        <li
                          key={category}
                          className="border-b border-gray-300 pb-2"
                        >
                          {/* Category header with expand/collapse toggle */}
                          <Button
                            variant={
                              category === selectedCategory
                                ? "secondary"
                                : "ghost"
                            }
                            className={`flex items-center justify-between cursor-pointer `}
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5" />
                              <span className="font-semibold">{category}</span>
                            </div>
                            {expandedCategories[category] ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                          </Button>

                          {/* Sub-options dropdown when category is expanded */}
                          {expandedCategories[category] && (
                            <div className="ml-6 mt-2 space-y-2">
                              <Select
                                onValueChange={(subOption) =>
                                  handleDocumentSelect(category, subOption)
                                }
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={`Select ${category} `}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {categoryData.subOptions.map((subOption) => (
                                    <SelectItem
                                      key={subOption}
                                      value={subOption}
                                      className={`${
                                        selectedSubOption === subOption
                                          ? "bg-green-100"
                                          : ""
                                      }`}
                                    >
                                      {subOption}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {index !== arr.length - 1 && (
                            <Separator className="my-2 border-gray-500" />
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Document Upload Section */}
                <div className="flex-1 px-4 overflow-auto max-h-[700px]">
                  <Card className="h-full">
                    <CardContent className="p-4">
                      <h1 className="text-2xl font-bold mb-4">
                        Upload {selectedSubOption || "Document"}
                      </h1>

                      <div className="mb-4">
                        <Label htmlFor="file-upload" className="required">
                          Select file
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </div>

                      <div
                        className="my-5 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center"
                        style={{ minHeight: "520px" }}
                      >
                        {preview ? (
                          file.type.startsWith("image/") ? (
                            <img
                              src={preview}
                              alt="Preview"
                              className="max-w-full max-h-[400px] object-contain"
                            />
                          ) : (
                            <div className="text-center">
                              <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                              <p className="text-lg font-semibold">
                                {file.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {file.type}
                              </p>
                            </div>
                          )
                        ) : (
                          <p className="text-gray-500 text-center">
                            You will see your document here.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end mt-2 mb-2">
                    <Button
                      onClick={handleUpload}
                      disabled={!file || !selectedSubOption}
                      className="ml-auto flex items-center"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload {selectedSubOption || "Document"}
                    </Button>
                  </div>

                  {/* <div className="my-10 flex justify-end">
                              <Button
                                className="mx-5"
                                onClick={() =>
                                  toast({
                                    title: "Success",
                                    description: "Onboarding initiated successfully.",
                                    variant: "success",
                                  })
                                }
                              >
                                Submit
                              </Button>
                            </div> */}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      ) : null}
    </div>
  );
};

export default WithLayout("sales")(EditLeadManagement);
