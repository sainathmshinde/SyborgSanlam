/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-select";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  FileIcon,
  CheckCircleIcon,
  XCircleIcon,
  Building,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  CircleArrowLeft,
  SearchIcon,
  FilePenIcon,
} from "lucide-react";
import WithLayout from "@/components/layout/WithLayout";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import certificateImg from "@/assets/Certificate_of_Incorporation.jpg";
import bankStatement from "@/assets/BankStatementChequing.png";
import addressproof from "@/assets/addressproof.png";
import idproof from "@/assets/idproof.png";

import { Navigate, useNavigate, useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for demonstration
const customerData = {
  status: "Pending",
  name: "Teslack Organization",
  contactName: "Sarah Johnson",
  clientType: "Company",
  Stage: "With Compliance Team",
  mobile: "0855678901",
  email: "sarahjohnson@outlook.com",
  country: "South Africa",
  designation: "Administrative Assistant",
};

const documents = [
  {
    id: 1,
    name: "Certificate of Company",
    type: "Certificate of Incorporation",
    content: "Certificate of Incorporation content...",
    image: certificateImg,
  },

  // Add more documents as needed
];
const documents3 = [
  {
    id: 2,
    name: "Address Proof of Company",
    type: "Passport",
    content: "Bank Statement content...",
    image: addressproof,
  },

  // Add more documents as needed
];
const documents4 = [
  {
    id: 3,
    name: "ID Proof of Alice Johnson",
    type: "Passport",
    content: "Address Proof content...",
    image: addressproof,
  },
];
const documents1 = [
  {
    id: 4,
    name: "ID Proof of Bob Johnson",
    type: "Passport",
    content: "Address Proof content...",
    image: addressproof,
  },

  // Add more documents as needed
];
const documents2 = [
  {
    id: 6,
    name: "Address Proof of Bob Johnson",
    type: "Bank Statement",
    content: "ID Proof content...",
    image: idproof,
  },

  // Add more documents as needed
];
const documents5 = [
  {
    id: 5,
    name: "Address Proof of Alice Johnson",
    type: "Driving License",
    content: "ID Proof content...",
    image: idproof,
  },

  // Add more documents as needed
];

// To do document categories based on selected client type
// const documentCategories = {
//   Company: ["Bank Statement", "Certificate of Incorporation"],
//   "Director 1": ["ID Proof", "Address Proof"],
//   "Director 2": ["ID Proof", "Address Proof"],
// };

function ComplianceChecklist() {
  const [selectedDoc, setSelectedDoc] = useState(documents[0]);
  const [comment, setComment] = useState("");
  const [indexValue, setIndexValue] = useState("");

  const [customerData, setCustomerData] = useState({
    status: "Pending",
    name: "Teslack Organization",
    contactName: "Sarah Johnson",
    clientType: "Company",
    Stage: "With Compliance Team",
    mobile: "0855678901",
    email: "sarahjohnson@outlook.com",
    country: "South Africa",
    designation: "Administrative Assistant",
  });
  console.log("indexValue", indexValue);

  const param = useParams();
  let id = param.id;
  useEffect(() => {
    if (id == 1) {
      setIndexValue(6);
    } else if (id == 2) {
      setCustomerData({
        status: "Approved",
        name: "Crios Organization",
        contactName: "Mila Powell",
        clientType: "Company",
        Stage: "With Compliance Team",
        mobile: "0855678901",
        email: "milapowell@outlook.com",
        country: "South Africa",
        designation: "Administrative Assistant",
      });
      setIndexValue(6);
    } else {
      setIndexValue(4);
    }
  }, [id]);

  const handleSendBack = () => {
    console.log(
      "Sending back document:",
      selectedDoc.name,
      "Comment:",
      comment
    );
    // Implement send back logic here
    setComment(""); // Clear comment after action
  };

  const handleApprove = () => {
    console.log("Approving document:", selectedDoc.name, "Comment:", comment);
    // Implement approve logic here
    setComment(""); // Clear comment after action
    toast({
      title: "Success",
      description: "Client onboarded successfully.",
      variant: "success",
    });
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
  const documentCategories = {
    Company: [
      "Certificate of Incorporation",
      "Bank Statement",
      "Address Proof",
      "Director 1 ID Proof",
      "Director 2 ID Proof",
    ],
    // "Director 1": ["ID Proof"],
    // "Director 2": ["ID Proof"],
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/compliance");
  };
  return (
    <div className="container mx-auto p-4 space-y-4 bg-gray-200 border rounded-lg overflow-x-auto">
      <div className="overflow-hidden  sticky top-0 z-10">
        <div className="flex justify-between items-center">
          {/* <div
            onClick={goBack}
            className="hover:cursor-pointer hover:text-blue-600  w-1/12"
          >
            {" "}
            <CircleArrowLeft className="w-8 h-8" />
          </div> */}
          {/* <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            // value={search}
            // onChange={handleSearch}
            className="pl-10 w-1/2"
          />
        </div> */}
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-2xl font-bold">Customer Details</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="assignTo" className="whitespace-nowrap">
              Assigned to : Lisa Anderson
            </Label>
            {/* <Select id="assignTo" value="Lisa Anderson">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">Lisa Anderson</SelectItem>
                <SelectItem value="jane">David Thompson</SelectItem>
                <SelectItem value="bob">Samantha Green</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{customerData.name}</p>
              <p className="text-sm text-muted-foreground">
                {customerData.contactName}
              </p>
              <p className="text-sm text-muted-foreground">
                {customerData.mobile}
              </p>
              <p className="text-sm text-muted-foreground">
                {customerData.email}
              </p>
              <p className="text-sm">
                Designation : {customerData.designation}
              </p>
            </div>
            <div>
              <p className="text-sm">
                Customer Type : {customerData.clientType}
              </p>
              <Badge variant={id == 2 ? "default" : "secondary"}>
                {id == 1 ? "Pending" : id == 2 ? "Approved" : "Rejected"}
              </Badge>
              <p className="text-lg">
                <Button
                  variant="gost"
                  size="icon"
                  className="text-blue-500 hover:bg-blue-500 hover:text-white"
                  // onClick={() => {
                  //   navigate("/viewcontact");
                  // }}
                >
                  {/* <FilePenIcon className="h-4 w-4" /> */}
                  <span className="sr-only">Edit</span>
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="overflow-auto max-h-[500px]"> */}
      <div className="flex flex-row md:grid-cols-3 gap-2">
        <Card className="md:col-span-2 ">
          {/* <CardHeader>
            <CardTitle>Documents Checklist</CardTitle>
          </CardHeader> */}
          <CardContent>
            {/* <ScrollArea className="h-[calc(100vh-300px)]"> */}
            <ul className="space-y-2 mt-6">
              <h2 className="text-xl font-bold underline mb-4 mt-4">
                Company Documents
              </h2>
              {documents.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5 text-green-600" />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4 " />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    {/* <Button
                        variant={"secondary"}
                        value="approve"
                        id="r2"
                        className={
                          id == 3 && index == 4 ? "text-black" : "text-black"
                        }
                        aria-label="Approve option"
                        disabled={index === indexValue}
                      >
                        {id == 2 ? "Approved" : "Approve"}
                      </Button> */}
                    <Button
                      className=" border-green-500 bg-green-500 text-white hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-white text-black border border-red-500 hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>

                    {/* <Button
                        variant={"secondary"}
                        value="reject"
                        id="r2"
                        className={
                          id == 2 || (id == 3 && index == 4)
                            ? "text-black"
                            : "text-black"
                        }
                        aria-label="Reject option"
                        disabled={index === indexValue || id == 2}
                      >
                        {id == 3 && index == 3 ? "Rejected" : "Reject"}
                      </Button> */}
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-6 ">
              {documents3.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5 text-red-600 " />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4 " />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    <Button
                      className="bg-white text-black border border-green-500 hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className=" border-red-500 bg-red-500 text-white hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-6">
              <h2 className="text-xl font-bold underline mb-4 mt-4">
                Key Individuals' Documents
              </h2>
              {documents4.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5 text-yellow-500" />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4" />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    <Button
                      className="bg-white text-black border border-green-500 hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-white text-black border border-red-500 hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-6">
              {documents5.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5 text-red-600 " />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4" />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    <Button
                      className="bg-white text-black border border-green-500 hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className=" border-red-500 text-white bg-red-500 hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>

            <ul className="space-y-2 mt-6">
              {documents1.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5  " />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4" />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    <Button
                      className="bg-white text-black border border-green-500 hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-white text-black border border-red-500 hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>
            <ul className="space-y-2 mt-6">
              {documents2.map((doc, index) => (
                <li
                  key={doc.id}
                  className="flex justify-between border-b border-gray-300 pb-4"
                >
                  <Button
                    variant={selectedDoc.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    {index < indexValue ? (
                      // <FileIcon className="mr-2 h-4 w-4 text-green-500" />
                      <FileText className="mr-2 h-5 w-5  " />
                    ) : (
                      // <CheckCircle2
                      //   className="h-5 w-5 text-green-500 ml-2"
                      //   aria-label={`${doc.name} uploaded`}
                      // />
                      // <XCircle
                      //   className="h-5 w-5 text-red-500 ml-2"
                      //   aria-label={`${doc.name} not uploaded`}
                      // />
                      <FileIcon className="mr-2 h-4 w-4" />
                    )}

                    {doc.name}
                  </Button>
                  <div
                    defaultValue="comfortable"
                    className="flex flex-row justify-end ml-2 gap-1"
                  >
                    <Button
                      className="bg-white text-black border border-green-500 hover:bg-green-500 hover:text-white focus:ring-0 focus:outline-none"
                      variant="ghost"
                    >
                      Approve
                    </Button>
                    <Button
                      className="bg-white text-black border border-red-500 hover:bg-red-500 hover:text-white focus:ring-0 focus:outline-none "
                      variant="ghost"
                    >
                      Reject
                    </Button>
                  </div>
                  <Separator className="my-2" />
                </li>
              ))}
            </ul>
            {/* </ScrollArea> */}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex-grow">
          <CardHeader>
            <CardTitle>Document Preview: {selectedDoc.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="bg-muted p-4 rounded-md  overflow-auto flex items-center justify-center"
              style={{ minHeight: "400px" }}
            >
              {selectedDoc.image ? (
                <img
                  src={selectedDoc.image}
                  alt={selectedDoc.name}
                  // className="h-110 w-110 object-contain"
                  className="max-w-full max-h-[400px] object-contain "
                />
              ) : (
                <p>{selectedDoc.content}</p>
              )}
            </div>
            <div className="space-y-4 mt-4">
              <Label className="required">Comment</Label>
              <Textarea
                placeholder="Add your comments here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              {id == 3 ? (
                <div className="flex justify-end space-x-2">
                  <Button onClick={handleSendBack}>
                    <XCircleIcon className="mr-2 h-4 w-4" />
                    Send Back
                  </Button>
                  <Button onClick={handleApprove} variant={"outline"}>
                    <CheckCircleIcon className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              ) : (
                <div className="flex justify-end space-x-2">
                  <Button onClick={handleSendBack} variant={"outline"}>
                    <XCircleIcon className="mr-2 h-4 w-4" />
                    Send Back to Onboarding
                  </Button>
                  <Button onClick={handleApprove}>
                    <CheckCircleIcon className="mr-2 h-4 w-4" />
                    {id == 2 ? "Approved" : "Onboard the Customer"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* </div> */}
    </div>
  );
}

export default WithLayout("compliance")(ComplianceChecklist);
