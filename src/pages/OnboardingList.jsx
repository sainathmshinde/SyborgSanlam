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

const OnboardingList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const leads = customerData;

  const statuses = Array.from(new Set(customerData.map((item) => item.Stage)));

  const filteredData = filter
    ? leads.filter((item) => item.Stage === filter)
    : leads;

  const [date, setDate] = useState();

  return (
    <div className="flex flex-col ">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer Onboarding</h1>
        </div>
        <div className="bg-background my-4 ">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search..."
                // value={search}
                // onChange={handleSearch}
                className="pl-10 w-2/3"
              />
            </div>
          </div>
        </div>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black">
              <TableRow>
                <TableHead className="text-white">Customer Name</TableHead>
                <TableHead className="text-white">Contact Name</TableHead>
                <TableHead className="text-white">Client Type</TableHead>
                <TableHead className="text-white">Country</TableHead>
                <TableHead className="text-white">
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
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead?.Customer}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>{lead.Name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.ClientType}</TableCell>
                  <TableCell>{lead.Country}</TableCell>

                  <TableCell>{lead.Stage}</TableCell>
                  <TableCell>{lead.MobileNumber}</TableCell>
                  <TableCell>{lead.Email}</TableCell>
                  <TableCell>
                    <div className="flex ">
                      <RButton
                        variant="ghost"
                        className="text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => navigate("/initiateonboarding")}
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="flex items-center gap-2"
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
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
      </div>
    </div>
  );
};

export default WithLayout("onboarding")(OnboardingList);
