import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FilePenIcon, TrashIcon, UserPlusIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ClientType from "./ClientType";

const Contacts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      stage: "Onboarding",
      email: "sarah.j@example.com",
      mobile: "+1234567890",
      address: "742 Maple Avenue, Suite 200",
      city: "San Francisco",
      state: "California",
      country: "United States",
      comment: "Initiated Onboarding",
      relationshipManager: "Jane Smith",
      clientType: "Company",
      customer: "Teslack Organization",
    },
    {
      id: 2,
      name: "Merry Johnson",
      stage: "Proposal",
      email: "merry@example.com",
      mobile: "+1234567866",
      address: "789 Elm St",
      city: "Elsewhere",
      state: "TX",
      country: "Australia",
      comment: "Proposal Submitted",
      relationshipManager: "Jane Smith",
      clientType: "Company",
      customer: "Crios Organization",
    },
    {
      id: 4,
      name: "Jane Smith",
      stage: " Lead",
      email: "jane@example.com",
      mobile: "+1234567811",
      address: "456 Oak Rd",
      city: "270 street oak",
      state: "NY",
      country: "USA",
      comment: "Lead generated will schedule meeting",
      relationshipManager: "John Doe",
      clientType: "Individual",
      customer: "Jane Smith",
    },
    {
      id: 3,
      name: "Bob Johnson",
      stage: "Prospect",
      email: "bob@example.com",
      mobile: "+1234567822",
      address: "789 Elm St",
      city: "Elsewhere",
      state: "TX",
      country: "South Africa",
      comment: "Scheduled meeting for further discussion",
      relationshipManager: "Jane Smith",
      clientType: "Individual",
      customer: "Bob Johnson",
    },

    {
      id: 3,
      name: "Carl El",
      stage: "Lost",
      email: "carl@example.com",
      mobile: "+1234567891",
      address: "789 Elm St",
      city: "Elsewhere",
      state: "TX",
      country: "Canada",
      comment: "Not Interested",
      relationshipManager: "Jane Smith",
      clientType: "Trust",
      customer: "Prestine",
    },
  ];

  const handleCreateContact = () => {
    navigate("/createContact");
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
          />
          {/* <div className="flex space-x-2">
            <Button
              variant={status === "pending" ? "default" : "outline"}
              // onClick={() => handleStatusFilter("pending")}
              className="flex-1 md:flex-none"
            >
              Qualified
            </Button>
            <Button
              variant={status === "approved" ? "default" : "outline"}
              // onClick={() => handleStatusFilter("approved")}
              className="flex-1 md:flex-none"
            >
              Proposal
            </Button>
            <Button
              variant={status === "rejected" ? "default" : "outline"}
              // onClick={() => handleStatusFilter("rejected")}
              className="flex-1 md:flex-none"
            >
              Closed Won
            </Button>
          </div> */}
          <Button Onboarding onClick={handleCreateContact}>
            Create Lead
          </Button>
        </div>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black ">
              <TableRow>
                <TableHead className="text-white">Customer Name</TableHead>
                <TableHead className="text-white">Client Type</TableHead>
                <TableHead className="text-white">Contact Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Country</TableHead>
                <TableHead className="text-white">Stage</TableHead>
                <TableHead className="text-white">Comment</TableHead>

                <TableHead className="text-white">
                  Relationship Manager
                </TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.customer}</TableCell>
                  <TableCell>{contact.clientType}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.mobile}</TableCell>

                  <TableCell>{contact.country}</TableCell>
                  <TableCell>
                    <Badge>{contact.stage}</Badge>
                  </TableCell>
                  <TableCell>{contact.comment}</TableCell>

                  <TableCell>{contact.relationshipManager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="gost"
                        size="icon"
                        className="text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          navigate("/viewcontact");
                        }}
                      >
                        <FilePenIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="gost"
                        size="icon"
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="gost"
                              size="icon"
                              className="text-green-500 hover:bg-green-500 hover:text-white"
                              disabled={contact.stage !== "Onboarding"}
                              onClick={() => {
                                navigate("/salesCustomerOnboarding");
                              }}
                            >
                              <UserPlusIcon className="h-4 w-4" />
                              <span className="sr-only">Onboard</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Onboard</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default WithLayout("sales")(Contacts);
