/* eslint-disable no-unused-vars */
import { useState } from "react";
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

import { Navigate, useNavigate } from "react-router";
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
};

const documents = [
  {
    id: 1,
    name: "Certificate of Incorporation",
    content: "Certificate of Incorporation content...",
    image: certificateImg,
  },
  {
    id: 2,
    name: "Bank Statement",
    content: "Bank Statement content...",
    image: bankStatement,
  },
  {
    id: 3,
    name: "Address Proof",
    content: "Address Proof content...",
    image: addressproof,
  },
  {
    id: 4,
    name: "Director 1 ID Proof",
    content: "ID Proof content...",
    image: idproof,
  },
  { id: 5, name: "Director 2 ID Proof", content: "ID Proof content..." },
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

  // let params = new URLSearchParams(window.location.search);

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
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div
          onClick={goBack}
          className="hover:cursor-pointer hover:text-blue-600  w-1/12"
        >
          {" "}
          <CircleArrowLeft className="w-8 h-8" />
        </div>
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            // value={search}
            // onChange={handleSearch}
            className="pl-10 w-1/2"
          />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            </div>
            <div>
              <p className="text-sm">Client Type : {customerData.clientType}</p>
              <Badge
                variant={
                  customerData.status === "Pending" ? "secondary" : "success"
                }
              >
                {customerData.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      {
        // <div>
        //   <Card>
        //     <CardContent className="p-4">
        //       <CardTitle className="mb-2 text-md">
        //         Compliance Checklist
        //       </CardTitle>
        //       <div className="space-y-4">
        //         <div className="flex flex-row space-x-4">
        //           {Object.entries(documentCategories).map(
        //             ([category, documents]) => (
        //               <div key={category} className="flex-1">
        //                 <div className="flex items-center mb-2">
        //                   {getCategoryIcon(category)}
        //                   <span className="ml-2 font-semibold">{category}</span>
        //                 </div>
        //                 <div className="pl-6 space-y-2 flex gap-2">
        //                   {documents.map((document) => (
        //                     <div key={document} className="flex items-center">
        //                       <FileText className="mr-2 h-4 w-4" />
        //                       {document} ,
        //                     </div>
        //                   ))}
        //                 </div>
        //                 {/* {category !== "Director 2" && (
        //                   <Separator className="my-1" />
        //                 )} */}
        //               </div>
        //             )
        //           )}
        //         </div>
        //       </div>
        //     </CardContent>
        //   </Card>
        // </div>
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Documents Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-300px)]">
              <ul className="space-y-2">
                {documents.map((doc, index) => (
                  <li key={doc.id} className="flex justify-between">
                    <Button
                      variant={selectedDoc.id === doc.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedDoc(doc)}
                    >
                      {index < 4 ? (
                        <CheckCircle2
                          className="h-5 w-5 text-green-500 ml-2"
                          aria-label={`${doc.name} uploaded`}
                        />
                      ) : (
                        <XCircle
                          className="h-5 w-5 text-red-500 ml-2"
                          aria-label={`${doc.name} not uploaded`}
                        />
                      )}
                      <FileIcon className="mr-2 h-4 w-4" />
                      {doc.name}
                    </Button>
                    <RadioGroup
                      defaultValue="comfortable"
                      className="flex justify-end ml-2"
                    >
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <RadioGroupItem
                                value="approve"
                                id="r2"
                                className="text-green-500"
                                aria-label="Approve option"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <span>Approve</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <RadioGroupItem
                                value="reject"
                                id="r2"
                                className="text-red-500"
                                aria-label="Reject option"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <span>Reject</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </RadioGroup>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Document Preview: {selectedDoc.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md h-[calc(50vh-50px)] overflow-auto">
              {selectedDoc.image ? (
                <img
                  src={selectedDoc.image}
                  alt={selectedDoc.name}
                  // className="h-110 w-110 object-contain"
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
              <div className="flex justify-end space-x-2">
                <Button onClick={handleSendBack}>
                  <XCircleIcon className="mr-2 h-4 w-4" />
                  Send Back
                </Button>
                <Button variant="outline" onClick={handleApprove}>
                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WithLayout("compliance")(ComplianceChecklist);
