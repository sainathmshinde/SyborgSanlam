import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadDocuments from "@/components/ui/uploadDocuments";
import {
  Building,
  CheckCircle2,
  Dot,
  FileIcon,
  FileText,
  TriangleAlertIcon,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function Profile() {
  let params = new URLSearchParams(window.location.search);
  const [mode, setMode] = useState(params.get("mode"));

  const navigate = useNavigate();

  const [clientType, setClientType] = useState(
    params.get("clientType") || "individual"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEntity, setSelectedEntity] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const [bType, setbType] = useState("");

  const [individualDocuments, setIndividualDocuments] = useState({
    companyRegistrationDocument: true,
    proofOfAddress: true,
    bankStatement: true,
  });

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
  const documentCategories = {
    Company: [
      "Certificate of Incorporation",
      "Bank Statement",
      "Address Proof",
    ],
    "Director 1": ["ID Proof"],
    "Director 2": ["ID Proof"],
  };

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isBeneficiaryDialogOpen, setIsBeneficiaryDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Company");
  const [selectedDocument, setSelectedDocument] = useState(
    documentCategories.Company[0]
  );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    Company: [],
    "Director 1": [],
    "Director 2": [],
  });
  const fileInputRef = useRef(null);
  // const [clientType, setClientType] = useState("company");

  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity);
    setIsModalOpen(false);
  };

  const handleDocumentSelect = (category, document) => {
    setSelectedCategory(category);
    setSelectedDocument(document);
    setFile(null);
    setPreview(null);
  };
  const entities = [
    { id: 1, name: "Entity A" },
    { id: 2, name: "Entity B" },
    { id: 3, name: "Entity C" },
    { id: 4, name: "Entity D" },
    { id: 5, name: "Entity E" },
  ];

  // const handleCheckboxChange = (checked, item) => {
  //   setCheckedItems({ ...checkedItems, [item]: checked });
  // };

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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {mode === "doc" ? (
        <div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
            <div className="flex items-start gap-4">
              <TriangleAlertIcon className="flex-shrink-0 text-yellow-600 h-6 w-6" />
              <div>
                <h3 className="text-yellow-800 font-medium">
                  Please upload the documents
                </h3>
                <p className="text-yellow-700 text-sm">
                  Ensure that all documents are uploaded correctly.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-6">
              <Card className="  mb-6">
                <CardHeader className="mt-4">
                  <CardTitle className="font-semibold">ABC Corp</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <Label htmlFor="phone">Client Code :</Label>
                    <span> 545GHDRU7858</span>
                  </div>
                </CardHeader>

                <div className="w-1/2 ">
                  {/* <CardHeader>
                    <CardTitle>Primary Contact</CardTitle>
                  </CardHeader> */}
                  <CardContent>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">
                      Contact: 555-5678
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: jane.smith@example.com
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Client Service Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-muted-foreground">
                    Contact: 555-5678
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Email: jane.smith@example.com
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <UploadDocuments />
        </div>
      ) : (
        <div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
            <div className="flex items-start gap-4">
              <TriangleAlertIcon className="flex-shrink-0 text-yellow-600 h-6 w-6" />
              <div>
                <h3 className="text-yellow-800 font-medium">
                  Please complete the details and submit
                </h3>
                <p className="text-yellow-700 text-sm">
                  Make sure to fill out all the required fields before
                  submitting the form.
                </p>
              </div>
            </div>
          </div>
          {clientType === "individual" ? (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="required">
                      First Name
                    </Label>
                    <Input id="firstName" placeholder="John" value="Sarah" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="required">
                      Last Name
                    </Label>
                    <Input id="lastName" placeholder="Doe" value="Johnson" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="required">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value="sarahjohnson@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="required">
                      Mobile Number
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="555-1234"
                      value="0824567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession</Label>
                    <Input
                      id="profession"
                      name="profession"
                      placeholder="Profession"
                      value="Manager"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Employer</Label>
                    <Input
                      id="employer"
                      name="employer"
                      placeholder="Employer"
                      value="Teslack Organization"
                    />
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
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Address"
                    />
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

                <div className="my-10 flex justify-end">
                  <Button className="mx-5">Save & Next</Button>
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
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  required
                                />
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
                                  <SelectItem value="Company">
                                    Company
                                  </SelectItem>
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
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  required
                                />
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
                    <Button
                      variant="outline"
                      onClick={() => navigate("/leads")}
                    >
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
                    <h2 className="text-xl font-bold mb-4">Documents</h2>
                    <ul className="space-y-4">
                      {Object.entries(documentCategories).map(
                        ([category, documents]) => (
                          <li key={category}>
                            <div className="flex items-center mb-2">
                              {getCategoryIcon(category)}
                              <span className="ml-2 font-semibold">
                                {category}
                              </span>
                            </div>
                            <ul className="pl-6 space-y-2">
                              {documents.map((document) => (
                                <li
                                  key={document}
                                  className="flex items-center"
                                >
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
                                  {uploadedDocuments[category].includes(
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
                            description: "Profile updated successfully.",
                            variant: "success",
                            className: cn(
                              "p-4 rounded-md",
                              variant === "success"
                                ? "toast-success"
                                : "toast-error" // Apply based on the variant
                            ),
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
              </TabsList>

              <TabsContent value="basic">
                <form className="space-y-6">
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
                        </div>
                        <Dialog
                          open={isModalOpen}
                          onOpenChange={setIsModalOpen}
                        >
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
                      <Label htmlFor="firstName">Entity Name</Label>
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
                      <Label htmlFor="country">Country of Origin</Label>
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
                          <SelectItem value="Trade Show">
                            South Africa
                          </SelectItem>
                          <SelectItem value="Referral">China</SelectItem>
                          <SelectItem value="Cold Call">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
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
                      <Label htmlFor="industry">
                        Company Registration Number
                      </Label>
                      <Input
                        id="comreg"
                        placeholder="Enter Company Registration Number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">
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
                      <Label htmlFor="industry">Legal Jurisdiction</Label>
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
                          <SelectItem value="Technology">India</SelectItem>
                          <SelectItem value="Retail">South AFrica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Operational Jurisdiction</Label>
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
                          <SelectItem value="Technology">India</SelectItem>
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
                      <Label htmlFor="finance">Financial Year End</Label>
                      <Input
                        id="finance"
                        value={newLead.finance}
                        onChange={(e) =>
                          setNewLead({ ...newLead, finance: e.target.value })
                        }
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    {clientType && (
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
                    )}
                  </div>

                  <div className="my-10 flex  justify-end">
                    <Button className="mx-5">Save & Next</Button>
                  </div>
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
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" required />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="mobile">Mobile Number</Label>
                              <Input
                                id="mobile"
                                name="mobile"
                                type="tel"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="designation">Designation</Label>
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
                              <Label htmlFor="company">Company</Label>
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
                            <div className="space-y-2">
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
                                  <SelectItem value="Company">
                                    Company
                                  </SelectItem>
                                  <SelectItem value="Partnership">
                                    Partnership
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="designation">Designation</Label>
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
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                  id="firstName"
                                  name="firstName"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" name="lastName" required />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="mobile">Mobile Number</Label>
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
                  <div className="my-10 flex justify-end mx-5">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/leads")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="ml-5"
                      onClick={() => navigate("/customerSuccess")}
                    >
                      Save
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          ) : null}
        </div>
      )}
    </div>
  );
}
export default WithLayout("client")(Profile);
