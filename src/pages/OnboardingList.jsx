import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import RButton from "@/components/ui/rButton";
import {
  CalendarIcon,
  FilePenIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import customerData from "@/lib/customerData";

const OnboardingList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const leads = customerData;

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
            <div className="flex space-x-2">
              <Button
                variant={status === "pending" ? "default" : "outline"}
                // onClick={() => handleStatusFilter("pending")}
                className="flex-1 md:flex-none"
              >
                Pending
              </Button>
              <Button
                variant={status === "approved" ? "default" : "outline"}
                // onClick={() => handleStatusFilter("approved")}
                className="flex-1 md:flex-none"
              >
                Approved
              </Button>
              <Button
                variant={status === "rejected" ? "default" : "outline"}
                // onClick={() => handleStatusFilter("rejected")}
                className="flex-1 md:flex-none"
              >
                Rejected
              </Button>
            </div>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full md:w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
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
                <TableHead className="text-white">Status</TableHead>
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
