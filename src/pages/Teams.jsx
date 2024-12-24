import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import WithLayout from "@/components/layout/WithLayout";
import RButton from "@/components/ui/rButton";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { FilePenIcon, Trash2Icon } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { Button } from "@/components/ui/button";

const Teams = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teams</h1>
      </div>
      <div className="flex items-center justify-between mb-6">
        <Input
          type="search"
          placeholder="Search Teams..."
          //   value={}
          //   onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white shadow-none appearance-none pl-8 md:w-1/2 lg:w-1/2 dark:bg-gray-950"
        />
        {/* <div className="flex space-x-2">
          <Button
            variant={status === "pending" ? "default" : "outline"}
            // onClick={() => handleStatusFilter("pending")}
            className="flex-1 md:flex-none"
          >
            Sales
          </Button>
          <Button
            variant={status === "approved" ? "default" : "outline"}
            // onClick={() => handleStatusFilter("approved")}
            className="flex-1 md:flex-none"
          >
            Onboarding
          </Button>
          <Button
            variant={status === "rejected" ? "default" : "outline"}
            // onClick={() => handleStatusFilter("rejected")}
            className="flex-1 md:flex-none"
          >
            Compliance
          </Button>
          <Button
            variant={status === "rejected" ? "default" : "outline"}
            // onClick={() => handleStatusFilter("rejected")}
            className="flex-1 md:flex-none"
          >
            Support
          </Button>
          <Button
            variant={status === "rejected" ? "default" : "outline"}
            // onClick={() => handleStatusFilter("rejected")}
            className="flex-1 md:flex-none"
          >
            IT Manager
          </Button>
        </div> */}
        <RButton onClick={() => navigate("/createTeam")}>Create Team</RButton>
      </div>
      <div>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black ">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Members</TableHead>
                {/* <TableHead className="text-white">Roles</TableHead> */}
                <TableHead className="text-white text-right ">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Admin</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge>John Doe</Badge>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Admin</Badge>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-end">
                    <RButton
                      variant="ghost"
                      className="flex items-center gap-2 "
                    >
                      <FilePenIcon className="h-4 w-4" />
                    </RButton>
                    <ConfirmDialog
                      dialogTrigger={
                        <RButton
                          variant="ghost"
                          className="flex items-center gap-2 "
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
              <TableRow>
                <TableCell className="font-medium">Sales Team</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Jared Palmer</Badge>
                    <Badge>Sarah Johnson</Badge>
                    <Badge>Alex Doe</Badge>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Sales Manager</Badge>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-end">
                    <RButton
                      variant="ghost"
                      className="flex items-center gap-2 "
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
              <TableRow>
                <TableCell className="font-medium">Onboarding Team</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge>John Smith</Badge>
                    <Badge>Emily Davis</Badge>
                    <Badge>Michael Brown</Badge>
                    <Badge>Jessica Wilson</Badge>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Onboarding Manager</Badge>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-end">
                    <RButton
                      variant="ghost"
                      className="flex items-center gap-2 "
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
              <TableRow>
                <TableCell className="font-medium">Compliance Team</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Lisa Anderson</Badge>
                    <Badge>David Thompson</Badge>
                    <Badge>Samantha Green</Badge>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Compliance Manager</Badge>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-end">
                    <RButton
                      variant="ghost"
                      className="flex items-center gap-2 "
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

              <TableRow>
                <TableCell className="font-medium">Support Team</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Adam Barlow</Badge>
                    <Badge>Sophia Anderson</Badge>
                    <Badge>Daniel Smith</Badge>
                  </div>
                </TableCell>
                {/* <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Support Manager</Badge>
                    <Badge variant="secondary">Account Manager</Badge>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex justify-end">
                    <RButton
                      variant="ghost"
                      className="flex items-center gap-2 "
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WithLayout("admin")(Teams);
