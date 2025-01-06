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
import { DateRangePicker } from "@/components/ui/dateRangePicker";

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

  const [selectedStage, setSelectedStage] = useState("");
  const handleStageFilter = (e) => {
    const stage = e.target.value;
    setSelectedStage(stage);
  };

  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Leads</h1>
        </div>
        <div className="flex flex-row items-center mb-4">
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700"
          >
            {/* <option value="">Stages</option> */}
            <option value="stage2"> Sarah Johnson </option>
            <option value="stage2"> Jared Palmer</option>
            <option value="stage1">Sarah Johnson </option>
            <option value="stage1">Alex Doe </option>
          </select>
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700"
          >
            <option value="">Compliance</option>
            <option value="stage2">Onboarding</option>
            <option value="stage1">Lead</option>
            <option value="stage1">Prospect</option>
            <option value="stage3">Proposal</option>
            <option value="stage3">Lost</option>
          </select>
          <DateRangePicker placeholder="Jan 01 2024   To   Dec 31 2024" />
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
              onClick={() => handleStatusFilter("pending")}
              className="flex-1 md:flex-none ml-2 "
            >
              Stages
            </Button>
            <Button
              variant={status === "approved" ? "default" : "outline"}
              onClick={() => handleStatusFilter("approved")}
              className="flex-1 md:flex-none"
            >
              Proposal
            </Button>
            <Button
              variant={status === "rejected" ? "default" : "outline"}
              onClick={() => handleStatusFilter("rejected")}
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
                <TableHead className="text-white">Lead Creation</TableHead>

                <TableHead className="text-white">Customer Name</TableHead>
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
                <TableHead className="text-white">Country</TableHead>

                <TableHead className="text-white">Contact Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                {/* <TableHead className="text-white">Mobile Number</TableHead> */}
                {/* <TableHead className="text-white">Stage</TableHead> */}

                {/* <TableHead className="text-white">
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
                </TableHead> */}

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
                  <TableCell>{LeadManagement.date}</TableCell>

                  <TableCell>{LeadManagement.customer}</TableCell>

                  <TableCell>{LeadManagement.clientType}</TableCell>
                  <TableCell>{LeadManagement.country}</TableCell>

                  <TableCell>{LeadManagement.name}</TableCell>

                  <TableCell>{LeadManagement.email}</TableCell>
                  {/* <TableCell>{LeadManagement.mobile}</TableCell> */}

                  {/* <TableCell>
                    <Badge>{LeadManagement.stage}</Badge>
                  </TableCell> */}
                  <TableCell>{LeadManagement.comment}</TableCell>

                  <TableCell>{LeadManagement.relationshipManager}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="gost"
                        size="icon"
                        className="text-blue-500  hover:text-white"
                        onClick={() => {
                          navigate("/editLeadManagement");
                        }}
                      >
                        {/* <FilePenIcon className="h-4 w-4" /> */}
                        <svg
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 7V6L12 0H2C0.89 0 0 0.89 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H8V16.13L16.39 7.74C16.83 7.3 17.39 7.06 18 7ZM11 1.5L16.5 7H11V1.5ZM19.85 11.19L18.87 12.17L16.83 10.13L17.81 9.15C18 8.95 18.33 8.95 18.53 9.15L19.85 10.47C20.05 10.67 20.05 11 19.85 11.19ZM16.13 10.83L18.17 12.87L12.04 19H10V16.96L16.13 10.83Z"
                            fill="#0D99FF"
                          />
                        </svg>
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="gost"
                        size="icon"
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        {/* <TrashIcon className="h-4 w-4" /> */}
                        <svg
                          width="16"
                          height="18"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                            fill="#E31F21"
                          />
                        </svg>
                        <span className="sr-only">Delete</span>
                      </Button>

                      {/* <TooltipProvider>
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
                      </TooltipProvider> */}
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
