import WithLayout from "@/components/layout/WithLayout";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
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

const Compliance = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState();

  const handleEdit = () => {
    navigate("/complianceChecklist");
  };

  const leadsWithComplianceTeam = [
    {
      Customer: "Teslack Organization",
      Name: "Sarah Johnson",
      ClientType: "Company",
      Stage: "Pending",
      MobileNumber: "0855678901",
      Email: "sarahjohnson@example.com",
      Country: "South Africa",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Crios Trust",
      Name: "Mila Powell",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0856789012",
      Email: "milapowell@example.com",
      Country: "South Africa",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Sebastian Price",
      Name: "Sebastian Price",
      ClientType: "Indivisual",
      Stage: "Approved",
      MobileNumber: "0857890123",
      Email: "sebastianprice@example.com",
      Country: "Canada",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Aria Bell",
      Name: "Aria Bell",
      ClientType: "Partnership",
      Stage: "Pending",
      MobileNumber: "0858901234",
      Email: "ariabell@example.com",
      Country: "India",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "Harper Ward",
      ClientType: "Individual",
      Stage: "Approved",
      MobileNumber: "0859012345",
      Email: "harperward@example.com",
      Country: "Australia",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Harper Ward",
      Name: "Jackson Perez",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0860123456",
      Email: "jacksonperez@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Harper Ward",
      Name: "Ella Gray",
      ClientType: "Company",
      Stage: "Pending",
      MobileNumber: "0861234567",
      Email: "ellagray@example.com",
      Country: "United States",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "Liam Murphy",
      ClientType: "Partnership",
      Stage: "Approved",
      MobileNumber: "0862345678",
      Email: "liammurphy@example.com",
      Country: "United Kingdom",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Harper Ward",
      Name: "Charlotte Barnes",
      ClientType: "Individual",
      Stage: "Approved",
      MobileNumber: "0863456789",
      Email: "charlottebarnes@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Harper Ward",
      Name: "Amelia Shaw",
      ClientType: "Trust",
      Stage: "Pending",
      MobileNumber: "0864567890",
      Email: "ameliashaw@example.com",
      Country: "Canada",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "Henry Patterson",
      ClientType: "Company",
      Stage: "Approved",
      MobileNumber: "0865678901",
      Email: "henrypatterson@example.com",
      Country: "New Zealand",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Harper Ward",
      Name: "Lucas Wallace",
      ClientType: "Partnership",
      Stage: "Approved",
      MobileNumber: "0866789012",
      Email: "lucaswallace@example.com",
      Country: "Australia",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Harper Ward",
      Name: "Isla Mitchell",
      ClientType: "Individual",
      Stage: "Pending",
      MobileNumber: "0867890123",
      Email: "islamitchell@example.com",
      Country: "South Africa",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "Oscar Knight",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0868901234",
      Email: "oscarKnight@example.com",
      Country: "United States",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Harper Ward",
      Name: "Grace Cooper",
      ClientType: "Company",
      Stage: "Approved",
      MobileNumber: "0869012345",
      Email: "gracecooper@example.com",
      Country: "United Kingdom",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Harper Ward",
      Name: "Emily Turner",
      ClientType: "Partnership",
      Stage: "Pending",
      MobileNumber: "0870123456",
      Email: "emilyturner@example.com",
      Country: "Canada",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "James Simmons",
      ClientType: "Individual",
      Stage: "Approved",
      MobileNumber: "0871234567",
      Email: "jamessimmons@example.com",
      Country: "India",
      AssignedTo: "David Thompson",
    },
    {
      Customer: "Harper Ward",
      Name: "Olivia Brooks",
      ClientType: "Trust",
      Stage: "Approved",
      MobileNumber: "0872345678",
      Email: "oliviabrooks@example.com",
      Country: "South Africa",
      AssignedTo: "Samantha Green",
    },
    {
      Customer: "Harper Ward",
      Name: "Aiden Diaz",
      ClientType: "Company",
      Stage: "Pending",
      MobileNumber: "0873456789",
      Email: "aidendiaz@example.com",
      Country: "New Zealand",
      AssignedTo: "Lisa Anderson",
    },
    {
      Customer: "Harper Ward",
      Name: "Evelyn Hayes",
      ClientType: "Partnership",
      Stage: "Approved",
      MobileNumber: "0874567890",
      Email: "evelynhayes@example.com",
      Country: "Australia",
      AssignedTo: "David Thompson",
    },
  ];

  return (
    <div className="">
      <div className="mb-3 p-4">
        <h1 className="text-2xl font-bold">Compliance Requests</h1>
        <p className="text-muted-foreground">
          View and manage all complaince requests.
        </p>
      </div>
      <div className="px-4">
        <div className="bg-background my-4">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
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
                Onboarded
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-lg bg-white shadow-md">
            <Table>
              <TableHeader className="bg-custom-black hover:bg-custom-black">
                <TableRow>
                  <TableHead className="text-white">Customer Name</TableHead>
                  <TableHead className="text-white">Client Type</TableHead>
                  <TableHead className="text-white">Contact Name</TableHead>
                  <TableHead className="text-white">Stage</TableHead>
                  <TableHead className="text-white">Mobile Number</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Country</TableHead>
                  <TableHead className="text-white">Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadsWithComplianceTeam.map((lead, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:text-blue-500"
                    onClick={handleEdit}
                  >
                    <TableCell>{lead.Customer}</TableCell>
                    <TableCell>{lead.ClientType}</TableCell>
                    <TableCell>{lead.Name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lead.Stage}</Badge>
                    </TableCell>
                    <TableCell>{lead.MobileNumber}</TableCell>
                    <TableCell>{lead.Email}</TableCell>
                    <TableCell>{lead.Country}</TableCell>
                    <TableCell>{lead.AssignedTo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithLayout("compliance")(Compliance);
