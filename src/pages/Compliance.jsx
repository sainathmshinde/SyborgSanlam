import WithLayout from "@/components/layout/WithLayout";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useParams } from "react-router";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import country from "@/lib/country";
import RButton from "@/components/ui/rButton";

const Compliance = () => {
  const navigate = useNavigate();
  const handleSearch = () => {};
  const countries = country;
  const [formValues, setFormValues] = useState({
    country: "",
    clientType: "",
  });

  const handleChange = (id, value) => {
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const [date, setDate] = useState();
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleEdit = (id) => {
    navigate(`/complianceChecklist/${id}`);
  };
  const handleSelectChange = (key, value) => {
    if (key === "country") {
      setSelectedCountry(value);
    }

    // Handle other fields if necessary
  };
  const [selectedStage, setSelectedStage] = useState("");
  const handleStageFilter = (e) => {
    const stage = e.target.value;
    setSelectedStage(stage);
  };
  const leadsWithComplianceTeam = [
    {
      id: 1,
      Customer: "Teslack Organization",
      Name: "Sarah Johnson",
      Date: "2/12/2024",
      ClientType: "Company",
      Stage: "Pending",
      MobileNumber: "0855678901",
      Email: "sarahjohnson@example.com",
      Country: "South Africa",
      AssignedTo: "Lisa Anderson",
    },
    {
      id: 2,
      Customer: "Crios Organization",
      Name: "Mila Powell",
      Date: "3/12/2024",
      ClientType: "Company",
      Stage: "Approved",
      MobileNumber: "0856789012",
      Email: "milapowell@example.com",
      Country: "South Africa",
      AssignedTo: "David Thompson",
    },
    {
      id: 3,
      Customer: "Sebastian Price",
      Name: "Sebastian Price",
      Date: "4/12/2024",
      ClientType: "Indivisual",
      Stage: "Rejected",
      MobileNumber: "0857890123",
      Email: "sebastianprice@example.com",
      Country: "Canada",
      AssignedTo: "Samantha Green",
    },
    {
      id: 4,
      Customer: "Aria Bell",
      Name: "Aria Bell",
      Date: "5/12/2024",
      ClientType: "Partnership",
      Stage: "Pending",
      MobileNumber: "0858901234",
      Email: "ariabell@example.com",
      Country: "India",
      AssignedTo: "Lisa Anderson",
    },

    {
      id: 5,
      Customer: "Harper Ward",
      Name: "Jackson Perez",
      Date: "7/12/2024",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0860123456",
      Email: "jacksonperez@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },

    {
      id: 5,
      Customer: "Harper Ward",
      Name: "Jackson Perez",
      Date: "7/12/2024",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0860123456",
      Email: "jacksonperez@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },

    {
      id: 5,
      Customer: "Harper Ward",
      Name: "Jackson Perez",
      Date: "7/12/2024",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0860123456",
      Email: "jacksonperez@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },

    {
      id: 5,
      Customer: "Harper Ward",
      Name: "Jackson Perez",
      Date: "7/12/2024",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0860123456",
      Email: "jacksonperez@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },
  ];

  const stages = Array.from(
    new Set(leadsWithComplianceTeam.map((item) => item.Stage))
  );
  const filteredData = filter
    ? leadsWithComplianceTeam.filter((item) => item.Stage === filter)
    : leadsWithComplianceTeam;

  return (
    <div className="p-4">
      <div className="flex flex-col justify-between overflow-hidden sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold ">Compliance Requests</h1>
        </div>
        <div className="flex flex-row items-center mt-4 mb-4">
          <h1>
            {" "}
            <strong>Compliance Team : </strong>{" "}
          </h1>
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700 ml-2"
          >
            {/* <option value="">Stages</option> */}
            <option value="stage1">David Thompson </option>
            <option value="stage2">Lisa Anderson</option>

            <option value="stage1">Samantha Green </option>
          </select>
          <h1>
            {" "}
            <strong>Stages : </strong>{" "}
          </h1>
          <select
            onChange={handleStageFilter}
            className="mr-4 p-2 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-950 dark:border-gray-700 ml-2"
          >
            {/* <option value="">Stages</option> */}
            <option value="stage1">Pending</option>
            <option value="stage2">Approved</option>

            <option value="stage1">Rejected</option>
            {/* <option value="stage3">Proposal</option>
            <option value="stage3">Lost</option> */}
          </select>
          <h1>
            {" "}
            <strong>Date : </strong>{" "}
          </h1>
          <DateRangePicker
            className="ml-2"
            placeholder="Jan 01 2024   To   Dec 31 2024"
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search Compliance Requests..."
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
        </div>
      </div>
      <div className="rounded-lg bg-white overflow-auto max-h-[400px]  ">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black  ">
            <TableRow>
              <TableHead className="text-white  text-left">Date</TableHead>
              <TableHead className="text-white  text-center">
                Customer Name
              </TableHead>

              <TableHead className="text-white">
                {" "}
                <div className="flex items-center text-black">
                  <span className="text-white text-left">Customer Type</span>
                  {/* <div className="space-y-2">
                      <Label htmlFor="client-type" >
                         Client Type
                      </Label> */}
                  {/* <Select
                    id="clientType"
                    value={formValues.clientType}
                    onValueChange={
                      (value) => handleChange("clientType", value) // Update the clientType value
                    }
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
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>
              </TableHead>
              <TableHead className="text-white">
                {" "}
                <div className="flex items-center space-x-2 text-black">
                  <span className="text-white text-left">Country</span>
                  <Select
                    id="country"
                    onValueChange={(value) =>
                      handleSelectChange("country", value)
                    }
                    value={selectedCountry}
                  >
                    <SelectTrigger className="flex items-center space-x-2 w-[35px] text-black bg-white p-2 rounded-md">
                      {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      // className="h-5 w-5 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h18M8 12h8m-5 8h2"
      />
    </svg> */}
                    </SelectTrigger>

                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TableHead>
              <TableHead className="text-white text-left">
                Contact Name
              </TableHead>
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
              <TableHead className="text-white text-left">Email</TableHead>
              <TableHead className="text-white text-left">
                Mobile Number
              </TableHead>

              {/* <TableHead className="text-white">Country</TableHead> */}

              <TableHead className="text-white w-48text-left">
                Assigned To
              </TableHead>
              <TableHead className=" text-white text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          {/* </Table>
      </div>
      <div >
        <Table> */}
          <TableBody>
            {filteredData.map((lead, index) => (
              <TableRow
                key={index}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => handleEdit(lead?.id)}
              >
                <TableCell>{lead.Date}</TableCell>
                <TableCell>{lead.Customer}</TableCell>

                <TableCell>{lead.ClientType}</TableCell>
                <TableCell>{lead.Country}</TableCell>
                <TableCell>{lead.Name}</TableCell>
                {/* <TableCell>
                  <Badge variant="secondary">{lead.Stage}</Badge>
                </TableCell> */}
                <TableCell>{lead.Email}</TableCell>
                <TableCell>{lead.MobileNumber}</TableCell>

                <TableCell>{lead.AssignedTo}</TableCell>
                <TableCell>
                  <div className="flex ">
                    <RButton
                      variant="ghost"
                      className="relative group flex items-center gap-2"
                      onClick={() => navigate("/initiateonboarding")}
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
    //   </div>
    // </div>
  );
};

export default WithLayout("compliance")(Compliance);
