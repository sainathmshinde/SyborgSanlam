import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Dot,
  FileIcon,
  FileText,
  Info,
  PlusCircle,
  SearchIcon,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const companyHierarchy = {
  name: "Parent Company",
  children: [
    {
      name: "Subsidiary A",
      children: [],
    },
    {
      name: "Subsidiary B",
      children: [{ name: "Department B1" }, { name: "Department B2" }],
    },
  ],
};

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
const documentCategories = {
  "Company Documents": {
    main: "Incorporation Document",
    subOptions: ["Registartion Certificate", "Incorportation Letter"],
  },
  "Address Proof": {
    main: "Address Document",
    subOptions: ["Utility Bill", "Rental Agreement", "Bank Statement"],
  },

  "ID Proof Director 1": {
    main: "ID Document",
    subOptions: ["National ID", "PAN Card", "Passport"],
  },
  "ID Proof Director 2": {
    main: "ID Document",
    subOptions: ["National ID", "PAN Card", "Passport"],
  },
};
const CreateLead = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  let params = new URLSearchParams(window.location.search);
  const [clientType, setClientType] = useState(
    params.get("clientType") || "company"
  );

  console.log(clientType);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    status: "New",
    description: "",
    industry: "",
    source: "",
    assignedUser: "",
  });

  const handleCreateLead = () => {
    navigate("/customerOnboardSuccess");

    setNewLead({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
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

  const [checkedItems, setCheckedItems] = useState({
    passport: true,
    driversLicense: true,
    utilityBill: true,
    bankStatement: true,
    panCard: true,
    birthCertificate: true,
    voterID: false,
    socialSecurityCard: false,
    insurancePolicy: false,
    leaseAgreement: false,
    creditCardStatement: false,
    taxReturn: false,
  });
  const [contacts, setContacts] = useState([
    {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sara.john@example.com",
      mobile: "+1 (555) 123-4567",
      designation: "Administrative Assistant",
      company: "Teslack Organization",
    },
  ]);

  const [beneficiaries, setBeneficiaries] = useState([
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      mobile: "+1234567890",
      type: "Individual",
      designation: "Director",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [sendToCustomer, setSendToCustomer] = useState(false);
  const [bType, setbType] = useState("");

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isBeneficiaryDialogOpen, setIsBeneficiaryDialogOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubOption, setSelectedSubOption] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState({
    Company: [],
    "Director 1": [],
    "Director 2": [],
  });
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  const [individualDocuments, setIndividualDocuments] = useState({
    idDocument: true,
    proofOfAddress: true,
  });

  const [companyDocuments, setCompanyDocuments] = useState({
    companyRegistrationDocument: true,
    proofOfAddress: true,
    bankStatement: true,
  });

  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(false);
  };

  const entities = [
    { id: 1, name: "Entity A" },
    { id: 2, name: "Entity B" },
    { id: 3, name: "Entity C" },
    { id: 4, name: "Entity D" },
    { id: 5, name: "Entity E" },
  ];

  const handleCheckboxChange = (checked, item) => {
    setCheckedItems({ ...checkedItems, [item]: checked });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedDocumentType(""); // Reset document type when category changes
  };

  const convertToLabel = (item) => {
    return item.replace(/([A-Z])/g, " $1").replace(/^./, item[0].toUpperCase());
  };

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
    setIsContactDialogOpen(false);
  };

  const addBeneficiary = (beneficiary) => {
    setBeneficiaries([...beneficiaries, beneficiary]);
    setIsBeneficiaryDialogOpen(false);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle document selection
  const handleDocumentSelect = (category, subOption) => {
    setSelectedCategory(category);
    setSelectedSubOption(subOption);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  // Upload handler
  const handleUpload = () => {
    if (file && selectedSubOption) {
      toast({
        title: "Upload Successful",
        description: `${selectedSubOption} has been uploaded.`,
        variant: "success",
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(null);
      setPreview(null);
    } else {
      toast({
        title: "Upload Failed",
        description: "Please select a document type and file.",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Company":
        return <Building className="h-5 w-5" />;
      case "Director 1":
      case "Director 2":
        return <User className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center overflow-hidden sticky top-0 z-10">
        <h1 className="text-2xl font-bold mb-4">
          Teslack Organization Onboarding
        </h1>
        {/* <div className="flex items-center space-x-2 mt-2">
          <Label htmlFor="assignTo" className="whitespace-nowrap required">
            Assign to
          </Label>
          <Select id="assignTo">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
              <SelectItem value="bob">Bob Johnson</SelectItem>
              <SelectItem value="alice">Alice Lee</SelectItem>
              <SelectItem value="tom">Tom Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>
      {/* <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg sticky top-0 z-10"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-md p-4 bg-gray-200 border rounded-lg sticky top-0 z-10 ">
          <div className="space-y-2">
            <Label htmlFor="country" className="required">
              Country
            </Label>
            <Select id="country" value="sa">
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa">South Africa</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-type" className="required">
              Customer Type
            </Label>
            <Select
              id="client-type"
              onValueChange={(e) => {
                setClientType(e);
              }}
              value={clientType === "company" ? "company" : "individual"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select client type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {clientType === "individual" ? (
          <Tabs defaultValue="basic">
            <div className="overflow-hidden sticky z-10 mb-2">
            <TabsList className=" flex justify-start mb-4  ">
              <TabsTrigger
                value="basic"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Basic Information
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="beneficiaries"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Beneficiaries
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Upload Documents
              </TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value="basic">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="required">
                    First Name
                  </Label>
                  <Input id="firstName" placeholder="First Name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="required">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Last Name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="required">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="required">
                    Mobile Number
                  </Label>
                  <Input id="mobile" type="tel" placeholder="555-1234" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    name="profession"
                    placeholder="Profession"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer</Label>
                  <Input id="employer" name="employer" placeholder="Employer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Source of Income" className="required">
                    Source of Income
                  </Label>
                  <Input
                    id="source of income"
                    name="source of income"
                    placeholder="Source of Income"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="required">
                    Address
                  </Label>
                  <Textarea id="address" name="address" placeholder="Address" />
                </div>

                <div></div>
                <div></div>
              </div>

              <div className="my-1 flex justify-end">
                <Button className="mx-5">Submit & Next</Button>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                  <CardDescription>
                    Manage contact details for the lead.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Dialog
                      open={isContactDialogOpen}
                      onOpenChange={setIsContactDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Contact</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addContact(Object.fromEntries(formData));
                          }}
                          className="space-y-4"
                        >
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

                          <Button type="submit">Add Contact</Button>
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <TableRow key={index}>
                          <TableCell>{contact.firstName}</TableCell>
                          <TableCell>{contact.lastName}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.mobile}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <div className="my-1 flex justify-end">
                  <Button className="mx-5">Submit & Next</Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="beneficiaries">
              <Card>
                <CardHeader>
                  <CardTitle>Beneficiaries</CardTitle>
                  <CardDescription>
                    Manage beneficiary information for the lead.
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
                          <PlusCircle className="mr-2 h-4 w-4" /> Add
                          Beneficiary
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Beneficiary</DialogTitle>
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
                          <Label htmlFor="type">Type</Label>
                          <Select name="type" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Individual">
                                Individual
                              </SelectItem>
                              <SelectItem value="Trust">Trust</SelectItem>
                              <SelectItem value="Company">Company</SelectItem>
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
                              className="required"
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
                              <Label className="required" htmlFor="firstName">
                                First Name
                              </Label>
                              <Input id="firstName" name="firstName" required />
                            </div>
                            <div className="space-y-2">
                              <Label className="required" htmlFor="lastName">
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

                          <Button
                            type="submit"
                            onClick={() => {
                              setbType("");
                              setIsBeneficiaryDialogOpen(false);
                            }}
                          >
                            Add Beneficiary
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
                <div className="my-5 flex justify-end mx-5">
                  <Button variant="outline" onClick={() => navigate("/leads")}>
                    Cancel
                  </Button>
                  <Button className="ml-5" onClick={handleCreateLead}>
                    Initiate Onboarding
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <div className="flex h-screen bg-gray-100">
                {/* Sidebar for document categories */}
                <div className="w-90 bg-white p-4 shadow-md overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Documents</h2>
                  <ul className="space-y-4">
                    {Object.entries(documentCategories).map(
                      ([category, categoryData]) => (
                        <li key={category}>
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
                                    placeholder={`Select ${category} Document`}
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

                          <Separator className="my-2" />
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Document Upload Section */}
                <div className="flex-1 p-4 overflow-auto">
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
                        style={{ minHeight: "400px" }}
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
                            No file selected. Please upload a document to see
                            the preview here.
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleUpload}
                        disabled={!file || !selectedSubOption}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload {selectedSubOption || "Document"}
                      </Button>
                    </CardContent>
                  </Card>

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
          </Tabs>
        ) : null}

        {clientType === "company" ||
        clientType === "partnership" ||
        clientType === "trust" ? (
          <Tabs defaultValue="basic">
            <TabsList className=" flex justify-start mb-4 ">
              <TabsTrigger
                value="basic"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Basic Information
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Contact
              </TabsTrigger>
              <TabsTrigger
                value="beneficiaries"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Beneficiaries
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Upload Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <form className="space-y-6">
                <div className="grid grid-cols-1  gap-4">
                  {/* <div className="space-y-2">
                  <Label htmlFor="source"> Parent</Label>
                  <div className="relative ">
                    <div className="flex items-center">
                      <Select>
                        <SelectTrigger className="w-full pr-12">
                          <SelectValue placeholder="Select Parent Entity" />
                        </SelectTrigger>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-10 z-10"
                        onClick={handleSearch}
                      >
                        <SearchIcon className="h-5 w-5" />
                      </Button>
                      <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Company Information</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Company Hierarchy</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4 max-h-[60vh] overflow-y-auto">
                            <TreeNode node={companyHierarchy} level={0} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Select an entity</DialogTitle>
                          <DialogDescription>
                            Search and select the entity you want.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Input placeholder="Search entities..." />
                        </div>
                        <div className="grid gap-2">
                          {entities.map((entity) => (
                            <Button
                              key={entity.id}
                              variant="ghost"
                              className="justify-start text-left"
                              onClick={() => handleEntitySelect(entity)}
                            >
                              {entity.name}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div> */}
                 <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto max-h-[325px]">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="required">
                      Customer Name
                    </Label>
                    <Input
                      id="firstName"
                      value={newLead.firstName}
                      onChange={(e) =>
                        setNewLead({ ...newLead, firstName: e.target.value })
                      }
                      placeholder="Enter Customer Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="required">
                      Country of Origin
                    </Label>
                    <Select
                      id="source"
                      value={newLead.source}
                      className="required"
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, source: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Country of Origin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website">India</SelectItem>
                        <SelectItem value="Trade Show">South Africa</SelectItem>
                        <SelectItem value="Referral">China</SelectItem>
                        <SelectItem value="Cold Call">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="required">
                      Industry
                    </Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
                      className="required"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="required">
                      Company Registration Number
                    </Label>
                    <Input
                      id="comreg"
                      placeholder="Enter Company Registration Number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="required">
                      Currency
                    </Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
                      className="required"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">INR</SelectItem>
                        <SelectItem value="Retail">USD</SelectItem>
                        <SelectItem value="Healthcare">RAND</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="required">
                      Legal Jurisdiction
                    </Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
                      className="required"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In">India</SelectItem>

                        <SelectItem value="Technology">USA</SelectItem>
                        <SelectItem value="Retail">South AFrica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="required">
                      Operational Jurisdiction
                    </Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
                      className="required"
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In">India</SelectItem>

                        <SelectItem value="Technology">USA</SelectItem>
                        <SelectItem value="Retail">South AFrica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* <div className="space-y-2">
                  <Label htmlFor="industry">Regulatory Authority</Label>
                  <Select
                    id="industry"
                    value={newLead.industry}
                    onValueChange={(value) =>
                      setNewLead({ ...newLead, industry: value })
                    }
                    className="required"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Authority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Auth 1</SelectItem>
                      <SelectItem value="Retail">Auth 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                  <div className="space-y-2">
                    <Label htmlFor="finance" className="required">
                      Financial Year End
                    </Label>
                    <Input
                      id="finance"
                      value={newLead.finance}
                      onChange={(e) =>
                        setNewLead({ ...newLead, finance: e.target.value })
                      }
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  </div>

                  {/* {clientType && (
                  <div className="space-y-5 my-5">
                    <h3 className="text-lg font-semibold mb-5">
                      Compliance Checklist
                    </h3>

                    <div>
                      {Object.keys(companyDocuments).map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <Dot />

                          <Label className="text-sm leading-tight">
                            {convertToLabel(item)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
                </div>

                <div className="my-5 flex justify-end">
                  <Button className="mx-5">Submit & Next</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="contact">
              <Card className="overflow-auto max-h-[325px]">
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                  <CardDescription>
                    Manage contact details for the lead.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Dialog
                      open={isContactDialogOpen}
                      onOpenChange={setIsContactDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Contact</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            addContact(Object.fromEntries(formData));
                          }}
                          className="space-y-4"
                        >
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
                          <div className="space-y-2">
                            <Label htmlFor="designation" className="required">
                              Designation
                            </Label>
                            <Select className="required">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select designation" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="John Doe">
                                  Administrative Assistant
                                </SelectItem>
                                <SelectItem value="Jane Smith">
                                  Customer Service Representative
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="required">
                              Company
                            </Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select company" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="John Doe">
                                  Teslack Organization
                                </SelectItem>
                                <SelectItem value="Jane Smith">
                                  XYZ Inc
                                </SelectItem>
                                <SelectItem value="Bob Johnson">
                                  ABC Inc
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="submit">Add Contact</Button>
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
                        <TableHead>Designation</TableHead>
                        <TableHead>Company</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <TableRow key={index}>
                          <TableCell>{contact.firstName}</TableCell>
                          <TableCell>{contact.lastName}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.mobile}</TableCell>
                          <TableCell>{contact.designation}</TableCell>
                          <TableCell>{contact.company}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <div className="my-5 flex justify-end">
                  <Button className="mx-5">Submit & Next</Button>
                </div> */}
              </Card>
              <div className="my-5 flex justify-end">
                  <Button className="mx-5">Submit & Next</Button>
                </div>
            </TabsContent>
            <TabsContent value="beneficiaries">
              <Card>
                <CardHeader>
                  <CardTitle>Beneficiaries</CardTitle>
                  <CardDescription>
                    Manage beneficiary information for the lead.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Dialog
                      open={isBeneficiaryDialogOpen}
                      onOpenChange={setIsBeneficiaryDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <PlusCircle className="mr-2 h-4 w-4" /> Add
                          Beneficiary
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Beneficiary</DialogTitle>
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
                              <SelectItem value="Company">Company</SelectItem>
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

                          <Button type="submit">Add Beneficiary</Button>
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
                {/* <div className="my-5 flex justify-end mx-5"> */}
                  {/* <Button variant="outline" onClick={() => navigate("/leads")}>
                  Cancel
                </Button> */}
                  {/* <Button className="mx-5" onClick={handleCreateLead}>
                    Initiate Onboarding
                  </Button>
                </div> */}
              </Card>
              <div className="my-5 flex justify-end mx-5">
                  {/* <Button variant="outline" onClick={() => navigate("/leads")}>
                  Cancel
                </Button> */}
                  <Button className="mx-5" onClick={handleCreateLead}>
                    Initiate Onboarding
                  </Button>
                </div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="flex h-screen bg-gray-100 overflow-auto max-h-[550px]">
                {/* Sidebar for document categories */}
                <div className="w-90 bg-white p-4 shadow-md overflow-auto ">
                  <h2 className="text-xl font-bold mb-4">Documents</h2>
                  <ul className="space-y-4">
                    {Object.entries(documentCategories).map(
                      ([category, categoryData]) => (
                        <li key={category}>
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
                                    placeholder={`Select ${category} Document`}
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

                          <Separator className="my-2" />
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Document Upload Section */}
                <div className="flex-1 px-4 overflow-auto">
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
                        style={{ minHeight: "400px" }}
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
                            No file selected. Please upload a document to see
                            the preview here.
                          </p>
                        )}
                      </div>

                      {/* <Button
                        onClick={handleUpload}
                        disabled={!file || !selectedSubOption}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload {selectedSubOption || "Document"}
                      </Button> */}
                      <div className="flex justify-end">
                        <Button
                          onClick={handleUpload}
                          disabled={!file || !selectedSubOption}
                          className="ml-auto flex items-center"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload {selectedSubOption || "Document"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

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
          </Tabs>
        ) : null}
      {/* </div> */}
    </div>
  );
};

export default WithLayout("onboarding")(CreateLead);
