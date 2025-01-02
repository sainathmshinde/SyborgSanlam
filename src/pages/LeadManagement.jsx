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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const LeadManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const LeadManagement = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "1/12/2024",

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
      date: "30/11/2024",

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
      date: "2/12/2024",

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
      date: "3/12/2024",

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
      date: "4/12/2024",

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
    navigate("/createLeadManagement");
  };

  const stages = Array.from(new Set(LeadManagement.map((item) => item.stage)));
  // const filteredData = filter
  //   ? LeadManagement.filter((item) => item.stage === filter)
  //   : LeadManagement;
  const clientTypes = Array.from(
    new Set(LeadManagement.map((item) => item.clientType))
  );

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none  md:w-2/3 lg:w-1/2 dark:bg-gray-950"
          />
          {/* <div className="flex space-x-2">
            <Button
              variant={status === "pending" ? "default" : "outline"}
              // onClick={() => handleStatusFilter("pending")}
              className="flex-1 md:flex-none "
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
                <TableHead className="text-white">Date</TableHead>
                {/* <TableHead className="text-white">Client Type</TableHead> */}
                <TableHead className="text-white">
                  {" "}
                  <div className="flex items-center space-x-2 text-black">
                    <span className="text-white">Customer Type</span>
                    <Select
                      value={filter}
                      onValueChange={(value) => setFilter(value)}
                      className="text-black"
                    >
                      <SelectTrigger className="w-[40px] text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="h-20 w-20 text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9l7.5 7.5 7.5-7.5"
                          />
                        </svg>
                      </SelectTrigger>
                      <SelectContent className="text-black">
                        {clientTypes.map((clientType) => (
                          <SelectItem
                            className="text-black"
                            key={clientType}
                            value={clientType}
                          >
                            {clientType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>

                <TableHead className="text-white">Contact Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Country</TableHead>
                {/* <TableHead className="text-white">Stage</TableHead> */}

                <TableHead className="text-white">
                  {" "}
                  <div className="flex items-center space-x-2 text-black">
                    <span className="text-white">Stages</span>
                    <Select
                      value={filter}
                      onValueChange={(value) => setFilter(value)}
                      className="text-black"
                    >
                      <SelectTrigger className="w-[40px] text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="h-20 w-20 text-black"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9l7.5 7.5 7.5-7.5"
                          />
                        </svg>
                      </SelectTrigger>
                      <SelectContent className="text-black">
                        <SelectItem value="all" className="text-black">
                          All
                        </SelectItem>
                        {stages.map((stage) => (
                          <SelectItem
                            className="text-black"
                            key={stage}
                            value={stage}
                          >
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TableHead>

                <TableHead className="text-white">Comment</TableHead>

                <TableHead className="text-white">
                  Relationship Manager
                </TableHead>
                <TableHead className="text-white text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LeadManagement.map((LeadManagement) => (
                <TableRow key={LeadManagement.id}>
                  <TableCell>{LeadManagement.customer}</TableCell>
                  <TableCell>{LeadManagement.date}</TableCell>

                  <TableCell>{LeadManagement.clientType}</TableCell>
                  <TableCell>{LeadManagement.name}</TableCell>

                  <TableCell>{LeadManagement.email}</TableCell>
                  <TableCell>{LeadManagement.mobile}</TableCell>

                  <TableCell>{LeadManagement.country}</TableCell>
                  <TableCell>
                    <Badge>{LeadManagement.stage}</Badge>
                  </TableCell>
                  <TableCell>{LeadManagement.comment}</TableCell>

                  <TableCell>{LeadManagement.relationshipManager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="gost"
                        size="icon"
                        className="text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          navigate("/editLeadManagement");
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
                              disabled={LeadManagement.stage !== "Onboarding"}
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

export default WithLayout("sales")(LeadManagement);
