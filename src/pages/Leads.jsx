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
import { FilePenIcon, Trash2Icon, UserPlusIcon } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { Badge } from "@/components/ui/badge";

const Leads = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const leads = [
    {
      id: 1,
      firstName: "Sarah Johnson",
      status: "Onboarding",
      email: "sarah.johnson@example.com",
      mobile: "+9834567890",
      address: "742 Maple Avenue, Suite 200",
      city: "San Francisco",
      state: "California",
      country: "United States",
      comment: "Documents Pending",
      assignedUser: "Jane Smith",
      clientType: "Company",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      clientType: "Individual",
      mobile: "+1234567890",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      country: "USA",
      status: "Pending",
      description: "This is a new lead",
      industry: "Technology",
      source: "Website",
      assignedUser: "Jane Smith",
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Doe",
      clientType: "Individual",
      email: "jane@example.com",
      mobile: "+1234567890",
      address: "456 Oak Rd",
      city: "Somewhere",
      state: "NY",
      country: "USA",
      status: "With Compliance",
      description: "This lead has been contacted",
      industry: "Retail",
      source: "Trade Show",
      assignedUser: "John Doe",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Customer Onboarding</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/2 dark:bg-gray-950"
          />
          {/* <div className="flex space-x-2">
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
              With Compliance
            </Button>
          </div> */}
          <Button onClick={() => navigate("/createLead")}>
            <UserPlusIcon className="h-4 w-4 mr-4" />
            <span>Initiate Onboarding</span>
          </Button>
        </div>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black ">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Client Type</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">
                  Relationship Manager
                </TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        {lead.firstName} {lead.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.clientType}</TableCell>
                  <TableCell>
                    <Badge>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>{lead.mobile}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.assignedUser}</TableCell>
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

export default WithLayout("sales")(Leads);
