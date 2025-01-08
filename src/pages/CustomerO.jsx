import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { Input } from "@/components/ui/input";
import RButton from "@/components/ui/rButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import customerData from "@/lib/customerData";
import { FilePenIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomerO = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const leads = customerData;

  const statuses = Array.from(new Set(customerData.map((item) => item.Stage)));

  const filteredData = filter
    ? leads.filter((item) => item.Stage === filter)
    : leads;

  const [date, setDate] = useState();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const [selectedStage, setSelectedStage] = useState("");
  const handleStageFilter = (e) => {
    const stage = e.target.value;
    setSelectedStage(stage);
  };

  return (
    <div className="flex flex-col ">
      <div className="p-4">
        <div className="flex justify-between items-center overflow-hidden sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Customer Onboarding</h1>
        </div>
        <div className="flex flex-row items-center mt-4 mb-4">
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700"
          >
            <option value="stage2">John Smith</option>
            <option value="stage1">Emily Davis</option>
            <option value="stage1">Michael Brown </option>
          </select>

          <DateRangePicker placeholder="Jan 01 2024   To   Dec 31 2024" />
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <Input
            type="search"
            placeholder="Search Customer Onboarding..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          {/* <DateRangePicker placeholder="Jan 01 2024 - Dec 31 2024" /> */}
        </div>
        <div className="border rounded-lg  overflow-auto max-h-[400px] ">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black">
              <TableRow>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Customer Name</TableHead>

                <TableHead className="text-white">Customer Type</TableHead>
                <TableHead className="text-white">Country</TableHead>
                <TableHead className="text-white">Contact Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                {/* <TableHead className="text-white">
                  {" "}
                  <div className="flex items-center space-x-2 text-black">
                    <span className="text-white">Stage</span>
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
                          All Stages
                        </SelectItem>
                        {statuses.map((stage) => (
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
                 */}

                <TableHead className=" text-white text-center -ml-2">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.Date}</TableCell>
                  <TableCell>{lead?.Customer}</TableCell>
                  <TableCell>{lead.ClientType}</TableCell>
                  <TableCell>{lead.Country}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>{lead.Name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.Email}</TableCell>
                  <TableCell>{lead.MobileNumber}</TableCell>

                  {/* <TableCell>{lead.Stage}</TableCell> */}

                  <TableCell>
                    <div className="flex ">
                      <RButton
                        variant="ghost"
                        className="relative group flex items-center gap-2"
                        onClick={() => navigate("/initiateonboarding")}
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
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
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
                            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
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

export default WithLayout("onboarding")(CustomerO);
