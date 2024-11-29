/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import {
  Building,
  CheckCircle2,
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
const documentTemplates = {
  Company: {
    Company: [
      "Certificate of Incorporation",
      "Bank Statement",
      "Address Proof",
    ],
    "Director 1": ["ID Proof"],
    "Director 2": ["ID Proof"],
  },
  Individual: {
    Individual: ["ID Proof", "Address Proof"],
  },
  Trust: {
    Trust: ["Trust Registration Certificate", "Trustees’ IDs"],
  },
  Partnership: {
    Partnership: ["Partnership Agreement", "Partners IDs"],
  },
};

const CreateLead = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [individualDocuments, setIndividualDocuments] = useState({
    idDocument: true,
    proofOfAddress: true,
  });

  const [companyDocuments, setCompanyDocuments] = useState({
    companyRegistrationDocument: true,
    proofOfAddress: true,
    bankStatement: true,
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
      mobile: "+1 (555) 111-2222",
      type: "Individual",
      designation: "Director",
    },
  ]);

  const [bType, setbType] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [sendToCustomer, setSendToCustomer] = useState(false);
  const [assignTo, setAssignTo] = useState("onboarding");

  const handleSubmit = () => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isBeneficiaryDialogOpen, setIsBeneficiaryDialogOpen] = useState(false);
  const [documentCategories, setDocumentCategories] = useState(
    documentTemplates.Company || {}
  );
  const [clientType, setClientType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Company");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const initialUploadedDocuments = {
    Company: { Company: [], "Director 1": [], "Director 2": [] },
    Individual: { Individual: [] },
    Trust: { Trust: [] },
    Partnership: { Partnership: [] },
  };

  const [uploadedDocuments, setUploadedDocuments] = useState(
    initialUploadedDocuments.Company
  );
  const fileInputRef = useRef(null);

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

  const handleDocumentSelect = (category, document) => {
    setSelectedCategory(category);
    setSelectedDocument(document);
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
  const handleClientType = (clientType) => {
    setClientType(clientType);
    const documents = documentTemplates[clientType] || {};
    setDocumentCategories(documents);

    // Safely set default document and category
    const firstCategory = Object.keys(documents)[0];

    // Check if firstCategory and its documents exist
    if (
      firstCategory &&
      documents[firstCategory] &&
      documents[firstCategory].length > 0
    ) {
      const firstDocument = documents[firstCategory][0];
      setSelectedCategory(firstCategory);
      setSelectedDocument(firstDocument);
    } else {
      // If no documents are found, reset the selected document and category
      setSelectedCategory("");
      setSelectedDocument("");
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teslack Organization Onboarding</h1>
        <div className="flex items-center space-x-2">
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
        </div>
      </div>

      <div className=" my-5">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sendToCustomer"
            checked={sendToCustomer}
            onCheckedChange={() => {
              setSendToCustomer(!sendToCustomer);
              setAssignTo("onboarding");
            }}
          />
          <Label htmlFor="sendToCustomer" className="font-medium">
            Send for completion
          </Label>
        </div>
        <p className="text-sm text-muted-foreground pl-6">
          Check this box to send the form to another party for completion
        </p>
      </div>
      {sendToCustomer && (
        <div className="space-y-4 mb-4 required">
          <RadioGroup value={assignTo} onValueChange={setAssignTo}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="onboarding" id="onboarding" />
              <Label htmlFor="onboarding">Assign to Onboarding</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="customer" id="customer" />
              <Label htmlFor="customer">Assign to Customer</Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country" className="required">
                Country
              </Label>
              <Select id="country">
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
                Client Type
              </Label>
              <Select id="client-type" onValueChange={handleClientType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Trust">Trust</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*    {clientType && (
        <div>
          <Card>
            <CardContent className="p-4">
              <CardTitle className="mb-2 text-md">
                Compliance Checklist
              </CardTitle>
              <div className="space-y-4">
                <div className="flex flex-row space-x-4">
                  {Object.entries(documentCategories).map(
                    ([category, documents]) => (
                      <div key={category} className="flex-1">
                        <div className="flex items-center mb-2">
                          {getCategoryIcon(category)}
                          <span className="ml-2 font-semibold">{category}</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          {documents.map((document) => (
                            <div key={document} className="flex items-center">
                              <FileText className="mr-2 h-4 w-4" />
                              {document}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )} */}

      {clientType === "Individual" ? (
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
            {sendToCustomer ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <span className="text-red-600 ml-1">*</span>
                  <Input id="firstName" placeholder="John" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="required">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Doe" />
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
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="required">
                    First Name
                  </Label>
                  <Input id="firstName" placeholder="John" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="required">
                    Last Name
                  </Label>
                  <Input id="lastName" placeholder="Doe" />
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
                {/* <div className="space-y-4">
                  {clientType && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold my-5">
                        Compliance Checklist
                      </h3>

                      <div>
                        {Object.keys(individualDocuments).map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <Dot />
                            <Label className="text-sm leading-tight">
                              {convertToLabel(item)}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div> */}
                <div></div>
                <div></div>
              </div>
            )}
            {sendToCustomer ? (
              <div className="my-10 flex justify-end">
                <Button
                  className="mx-5"
                  onClick={() => {
                    if (sendToCustomer && assignTo) {
                      navigate("/leads");
                    }
                  }}
                >
                  {sendToCustomer && assignTo ? "Assign" : "Save & Next"}
                </Button>
              </div>
            ) : (
              <div className="my-10 flex justify-end">
                <Button className="mx-5">Save & Next</Button>
              </div>
            )}
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
              <div className="my-10 flex justify-end">
                <Button className="mx-5">Save & Next</Button>
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
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Beneficiary
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
                        <div className="space-y-2">
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
                        </div>
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
              <div className="my-10 flex justify-end mx-5">
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
              <div className="w-90 bg-white p-4 shadow-md overflow-auto">
                <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
                <ul className="space-y-4">
                  {Object.entries(documentCategories).map(
                    ([category, documents]) => (
                      <li key={category}>
                        <div className="flex items-center mb-2">
                          {getCategoryIcon(category)}
                          <span className="ml-2 font-semibold">{category}</span>
                        </div>
                        <ul className="pl-6 space-y-2">
                          {documents.map((document) => (
                            <li key={document} className="flex items-center">
                              <Button
                                variant={
                                  document === selectedDocument &&
                                  category === selectedCategory
                                    ? "default"
                                    : "ghost"
                                }
                                className="w-full justify-start text-sm"
                                onClick={() =>
                                  handleDocumentSelect(category, document)
                                }
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                {document}
                              </Button>
                              {(uploadedDocuments[category] || []).includes(
                                document
                              ) && (
                                <CheckCircle2
                                  className="h-5 w-5 text-green-500 ml-2"
                                  aria-label={`${document} uploaded`}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                        {category !== "Director 2" && (
                          <Separator className="my-2" />
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold mb-4">
                      Upload {selectedDocument}
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
                      className=" my-5 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center"
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
                            <p className="text-lg font-semibold">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.type}</p>
                          </div>
                        )
                      ) : (
                        <p className="text-gray-500 text-center">
                          No file selected. Please upload a document to see the
                          preview here.
                        </p>
                      )}
                    </div>
                    <Button onClick={handleUpload} disabled={!file}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload {selectedDocument}
                    </Button>
                  </CardContent>
                </Card>
                <div className="my-10 flex justify-end">
                  <Button
                    className="mx-5"
                    onClick={() =>
                      toast({
                        title: "Success",
                        className: "bg-green",
                        description: "Onboard initiated successfully.",
                        variant: "success",
                      })
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : null}

      {clientType === "Company" ||
      clientType === "Partnership" ||
      clientType === "Trust" ? (
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
              {/* <div className=" my-5">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendToCustomer"
                    checked={sendToCustomer}
                    onCheckedChange={() => {
                      setSendToCustomer(!sendToCustomer);
                      setAssignTo("onboarding");
                    }}
                  />
                  <Label htmlFor="sendToCustomer" className="font-medium">
                    Send for completion
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  Check this box to send the form to another party for
                  completion
                </p>
              </div>
              {sendToCustomer && (
                <div className="space-y-4">
                  <RadioGroup value={assignTo} onValueChange={setAssignTo}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onboarding" id="onboarding" />
                      <Label htmlFor="onboarding">Assign to Onboarding</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="customer" id="customer" />
                      <Label htmlFor="customer">Assign to Customer</Label>
                    </div>
                  </RadioGroup>
                </div>
              )} */}

              {sendToCustomer ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="required">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="John" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="required">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Doe" />
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
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
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
                              <span className="sr-only">
                                Company Information
                              </span>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="required">
                      Entity Name
                    </Label>
                    <Input
                      id="firstName"
                      value={newLead.firstName}
                      onChange={(e) =>
                        setNewLead({ ...newLead, firstName: e.target.value })
                      }
                      placeholder="Enter Entity Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="required">
                      Country of Origin
                    </Label>
                    <Select
                      id="source"
                      value={newLead.source}
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
                      Base Currency/Billing Currency
                    </Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
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
                    <Label htmlFor="industry">Regulatory Authority</Label>
                    <Select
                      id="industry"
                      value={newLead.industry}
                      onValueChange={(value) =>
                        setNewLead({ ...newLead, industry: value })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Authority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Auth 1</SelectItem>
                        <SelectItem value="Retail">Auth 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
              )}

              {sendToCustomer ? (
                <div className="my-10 flex justify-end">
                  <Button
                    className="mx-5"
                    onClick={() => {
                      if (sendToCustomer && assignTo) {
                        navigate("/leads");
                      }
                    }}
                  >
                    {sendToCustomer && assignTo ? "Assign" : "Save & Next"}
                  </Button>
                </div>
              ) : (
                <div className="my-10 flex justify-end">
                  <Button className="mx-5">Save & Next</Button>
                </div>
              )}
            </form>
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

                        <div className="space-y-2">
                          <Label htmlFor="designation" className="required">
                            Designation
                          </Label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select designation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="John Doe">
                                Customer Service Representative
                              </SelectItem>
                              <SelectItem value="Jane Smith">
                                Administrative Assistant
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
              <div className="my-10 flex justify-end">
                <Button className="mx-5">Save & Next</Button>
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
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Beneficiary
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
                        <div className="space-y-2">
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
                        </div>
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
                              {Object.keys(individualDocuments).map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2"
                                >
                                  <Dot />
                                  <Label className="text-sm leading-tight">
                                    {convertToLabel(item)}
                                  </Label>
                                </div>
                              ))}
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
              <div className="my-10 flex justify-end mx-5">
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
              <div className="w-90 bg-white p-4 shadow-md overflow-auto">
                <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
                <ul className="space-y-4">
                  {Object.entries(documentCategories).map(
                    ([category, documents]) => (
                      <li key={category}>
                        <div className="flex items-center mb-2">
                          {getCategoryIcon(category)}
                          <span className="ml-2 font-semibold">{category}</span>
                        </div>
                        <ul className="pl-6 space-y-2">
                          {documents.map((document) => (
                            <li key={document} className="flex items-center">
                              <Button
                                variant={
                                  document === selectedDocument &&
                                  category === selectedCategory
                                    ? "default"
                                    : "ghost"
                                }
                                className="w-full justify-start text-sm"
                                onClick={() =>
                                  handleDocumentSelect(category, document)
                                }
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                {document}
                              </Button>
                              {(uploadedDocuments[category] || []).includes(
                                document
                              ) && (
                                <CheckCircle2
                                  className="h-5 w-5 text-green-500 ml-2"
                                  aria-label={`${document} uploaded`}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                        {category !== "Director 2" && (
                          <Separator className="my-2" />
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold mb-4">
                      Upload {selectedDocument}
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
                      className=" my-5 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center"
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
                            <p className="text-lg font-semibold">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.type}</p>
                          </div>
                        )
                      ) : (
                        <p className="text-gray-500 text-center">
                          No file selected. Please upload a document to see the
                          preview here.
                        </p>
                      )}
                    </div>
                    <Button onClick={handleUpload} disabled={!file}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload {selectedDocument}
                    </Button>
                  </CardContent>
                </Card>
                <div className="my-10 flex justify-end">
                  <Button
                    className="mx-5"
                    onClick={() =>
                      toast({
                        title: "Success",
                        className: "bg-green",
                        description: "Onborading initiated successfully.",
                        variant: "success",
                      })
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      ) : null}
    </div>
  );
};

export default WithLayout("sales")(CreateLead);
