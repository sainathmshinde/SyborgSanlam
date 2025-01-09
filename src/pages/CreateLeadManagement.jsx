import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
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
    subOptions: ["Registration Certificate", "Incorporation Letter"],
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

const CreateLeadManagement = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  let params = new URLSearchParams(window.location.search);
  const [clientType, setClientType] = useState(
    params.get("clientType") || "company"
  );

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

  // const [selectedDocument, setSelectedDocument] = useState(
  //   documentCategories.Company[0]
  // );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    Company: [],
    "Director 1": [],
    "Director 2": [],
  });
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("Company");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedSubOption, setSelectedSubOption] = useState(null);

  const handleSubmit = () => {
    toast({
      title: "Success",
      description: "Onboarding initiated successfully.",
      variant: "success",
    });
    navigate("/contacts");
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

  // const handleDocumentSelect = (category, document) => {
  //   setSelectedCategory(category);
  //   setSelectedDocument(document);
  //   setFile(null);
  //   setPreview(null);
  // };
  const handleDocumentSelect = (category, subOption) => {
    setSelectedCategory(category);
    setSelectedSubOption(subOption);
    setFile(null);
    setPreview(null);
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
    <div className="p-4">
      <div className="flex justify-between items-center overflow-hidden sticky top-0 z-10">
        <h1 className="text-xl font-bold">Create New Lead</h1>
      </div>

      {clientType === "company" ||
      clientType === "partnership" ||
      clientType === "trust" ? (
        <Tabs defaultValue="basic">
          <div className="overflow-hidden sticky z-10">
            <TabsList className=" flex justify-start mb-4 mt-4 ">
              <TabsTrigger
                value="basic"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                About Lead
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="px-4 py-2 -mb-px text-sm font-medium text-center border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300"
              >
                Customer Details
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="overflow-auto max-h-[500px]">
            <TabsContent value="basic">
              <form className="space-y-2">
                {/* Personal Information Card */}
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}

                    <div className="space-y-2 grid-cols-1 ">
                      <Label htmlFor="address">
                        About Lead<span className="text-red-600 ml-1">*</span>
                      </Label>
                      <Textarea
                        placeholder="Write more about lead"
                        className="min-h-[50px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="clientServiceManager"
                          className="required"
                        >
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
                            <SelectItem value="jane_smith">
                              Jane Foster
                            </SelectItem>
                            <SelectItem value="bob_johnson">
                              Bob Marley
                            </SelectItem>
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
                            <SelectItem value="qualified"> New Lead</SelectItem>
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
                  <Button
                    variant="outline"
                    onClick={() => navigate("/leadManagement")}
                  >
                    Back
                  </Button>
                  <Button onClick={() => navigate("/leadManagement")}>
                    Submit
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="contact">
              <form className="space-y-2">
                {/* Personal Information Card */}
                <Card className="bg-gray-200">
                  <CardContent className="p-4">
                    {/* <h2 className="text-lg font-semibold mb-4">Personal Information</h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Customer Name
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={newContact.name}
                          onChange={(e) =>
                            setNewContact({
                              ...newContact,
                              name: e.target.value,
                            })
                          }
                          placeholder="Enter Name"
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">
                          Customer Type
                          <span className="text-red-600 ml-1">*</span>
                        </Label>
                        <Select id="source">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Customer Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Website">Company</SelectItem>
                            <SelectItem value="Trade Show">
                              Individual
                            </SelectItem>
                            <SelectItem value="Referral">
                              Partnership
                            </SelectItem>
                            <SelectItem value="Cold Call">Trust</SelectItem>
                            <SelectItem value="Cold Call">Fund</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4 mt-4">
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
                              setNewContact({
                                ...newContact,
                                city: e.target.value,
                              })
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
                              setNewContact({
                                ...newContact,
                                state: e.target.value,
                              })
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
                              <SelectItem value="Trade Show">
                                South Africa
                              </SelectItem>
                              <SelectItem value="Referral">China</SelectItem>
                              <SelectItem value="Cold Call">
                                Australia
                              </SelectItem>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Contact Person
                          <span className="text-red-600 ml-1">*</span>
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
                            setNewContact({
                              ...newContact,
                              mobile: e.target.value,
                            })
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
                            setNewContact({
                              ...newContact,
                              email: e.target.value,
                            })
                          }
                          placeholder="Enter Email"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/leadManagement")}
                  >
                    Back
                  </Button>
                  <Button onClick={() => navigate("/leadManagement")}>
                    Submit
                  </Button>
                </div>
              </form>
            </TabsContent>
          </div>
        </Tabs>
      ) : null}
    </div>
  );
};

export default WithLayout("sales")(CreateLeadManagement);
