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
import RButton from "@/components/ui/rButton";
import { ConfirmDialog } from "@/components/ui/confirmDialog";

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

const LeadM = () => {
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

      stage: "Onboarding",
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

      stage: " Onboarding",
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

      stage: "Onboarding",
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

      stage: "Onboarding",
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
        <div className="flex justify-between items-center mb-2 overflow-hidden sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Leads </h1>
        </div>
        <div className="flex flex-row items-center mb-4 ">
          <h1>
            <strong> Relationship Manager : </strong>
          </h1>
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700 ml-2"
          >
            {/* <option value="">Stages</option> */}
            <option value="stage2"> Jared Palmer</option>
            <option value="stage1">Sarah Johnson </option>
            <option value="stage1">Alex Doe </option>
          </select>
          <h1>
            <strong> Stages : </strong>
          </h1>
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700 ml-2"
          >
            {/* <option value="">Stages</option> */}
            <option value="stage2">Onboarding</option>
            <option value="stage1">Sales</option>
            <option value="stage1">Compliance</option>
            {/* <option value="stage3">Proposal</option> */}
            <option value="stage3">Lost</option>
          </select>
          <h1>
            <strong> Date : </strong>
          </h1>
          <DateRangePicker
            placeholder="Jan 01 2024   To   Dec 31 2024"
            className="ml-2"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none  md:w-2/3 lg:w-1/2 dark:bg-gray-950"
          />
          <div className="flex space-x-2">
            {/* <Button
              variant={status === "pending" ? "default" : "outline"}
              onClick={() => handleStatusFilter("pending")}
              className="flex-1 md:flex-none ml-2 "
            >
              Jared Palmer
            </Button> */}
            {/* <Button
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
            </Button> */}
          </div>

          <Button Onboarding onClick={handleCreateContact}>
            Create Lead
          </Button>
        </div>
        <div className="border rounded-lg  overflow-auto max-h-[400px] ">
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

                <TableHead className="text-white">
                  {" "}
                  <div className="flex items-center space-x-2 text-black">
                    <span className="text-white">Stages</span>
                    {/* <Select
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
                    </Select> */}
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
                  <TableCell>{LeadManagement.date}</TableCell>

                  <TableCell>{LeadManagement.customer}</TableCell>

                  <TableCell>{LeadManagement.clientType}</TableCell>
                  <TableCell>{LeadManagement.country}</TableCell>

                  <TableCell>{LeadManagement.name}</TableCell>

                  <TableCell>{LeadManagement.email}</TableCell>
                  {/* <TableCell>{LeadManagement.mobile}</TableCell> */}

                  <TableCell>
                    <Badge>{LeadManagement.stage}</Badge>
                  </TableCell>
                  <TableCell>{LeadManagement.comment}</TableCell>

                  <TableCell>{LeadManagement.relationshipManager}</TableCell>
                  <TableCell>
                    <div className="flex ">
                      <RButton
                        variant="ghost"
                        className="relative group flex items-center gap-2"
                        onClick={() => navigate("/editLeadManagement")}
                      >
                        {/* <FilePenIcon className="h-4 w-4" /> */}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM13.7 6.35C13.92 6.14 13.92 5.79 13.7 5.58L12.42 4.3C12.3705 4.24765 12.3108 4.20595 12.2446 4.17745C12.1784 4.14895 12.1071 4.13425 12.035 4.13425C11.9629 4.13425 11.8916 4.14895 11.8254 4.17745C11.7592 4.20595 11.6995 4.24765 11.65 4.3L10.65 5.3L12.7 7.35L13.7 6.35ZM4 11.94V14H6.06L12.12 7.94L10.06 5.88L4 11.94Z"
                            fill="#4368FA"
                          />
                        </svg>

                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
                          Edit
                        </div>
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="relative group flex items-center gap-2"
                          >
                            {/* <Trash2Icon className="h-4 w-4 text-red-500" /> */}
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
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
                              Delete
                            </div>
                          </RButton>
                        }
                        dialogTitle="Are you sure to delete the role?"
                        dialogDescription="This action cannot be undone. This will permanently delete your
                                                                product and remove your data from our servers."
                      />
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

export default WithLayout("sales")(LeadM);
