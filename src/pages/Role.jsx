import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import RButton from "@/components/ui/rButton";
import RInput from "@/components/ui/rInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, FilePenIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description:
      "Responsible for managing the system, users, and overall configurations.",
  },
  {
    id: 2,
    name: "Sales Team",
    description: "Handles customer inquiries and manages sales processes.",
  },
  {
    id: 3,
    name: "Sales Manager",
    description:
      "Oversees the sales team, sets targets, and tracks performance metrics.",
  },
  {
    id: 4,
    name: "Onboarding Team",
    description:
      "Facilitates the onboarding process for new customers or team members.",
  },
  {
    id: 5,
    name: "Compliance Reviewer",
    description:
      "Reviews documents and processes to ensure compliance with regulations.",
  },
  {
    id: 6,
    name: "Compliance Approver",
    description:
      "Approves documents and processes to ensure compliance with regulations.",
  },
  {
    id: 7,
    name: "Client Admin User",
    description:
      "The end-user or client who uses the products or services offered. This user has access to all the features and functionalities of the system.",
  },
  {
    id: 8,
    name: "Client User",
    description:
      "The end-user or client who uses the products or services offered.",
  },
  {
    id: 9,
    name: "Sales User",
    description: "The salesperson who manages sales processes.",
  },
  {
    id: 10,
    name: "Onboarding User",
    description:
      "The onboarding user who onboards new clients or team members.",
  },
  {
    id: 11,
    name: "Client Support User",
    description:
      "Provides assistance and support to customers regarding products or services.",
  },
];

const Role = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState(initialRoles);
  const [roleIndex, setRoleIndex] = useState(0);

  //   useEffect(() => {
  //     (async () => {
  //       await getPaginatedRoles(paginationModel, searchTerm);
  //     })();
  //   }, []);

  //   const getPaginatedRoles = async (paginationModel, searchTerm) => {
  //     let response = await getRoles(
  //       paginationModel.pageNumber,
  //       paginationModel.recordsPerPage,
  //       searchTerm
  //     );

  //     if (response.status === "success") {
  //       setRoles(response.data);
  //       setPaginationModel(response.data.paging);
  //     } else {
  //       //show error
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: "Unable to get roles.",
  //       });
  //     }
  //   };

  //   const handleSearch = async (event) => {
  //     let pageModel = {
  //       ...paginationModel,
  //       pageNumber: 1,
  //       recordsPerPage: 50,
  //     };

  //     setPaginationModel(pageModel);
  //     setSearchTerm(event.target.value);
  //     await getPaginatedRoles(pageModel, event.target.value);
  //   };

  const handleSearch = () => {};
  const handleDeleteRole = () => {};
  //   const handleDeleteRole = async (roleId) => {
  //     let response = await deleteRole(roleId);
  //     if (response.status === "success") {
  //       toast({
  //         variant: "success",
  //         title: "Role deleted successfully",
  //         description: "Role deleted successfully.",
  //       });
  //       let pageModel = {
  //         page: 1,
  //         pageSize: 50,
  //       };

  //       setPaginationModel(pageModel);
  //       await getPaginatedRoles(paginationModel, searchTerm);
  //     } else {
  //       //show error message
  //       toast({
  //         variant: "destructive",
  //         title: "Uh oh! Something went wrong.",
  //         description: "Unable to delete role.",
  //       });
  //     }
  //   };

  const handleEdit = (id) => {
    navigate(`/createrole`);
  };

  const handleNew = () => {
    navigate("/createrole");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Roles</h1>
        </div>
        <div className="flex items-center justify-between mt-6 mb-6">
          <Input
            type="search"
            placeholder="Search Roles..."
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <RButton
            onClick={() => {
              handleNew();
            }}
            className="ml-10"
          >
            <span className="flex items-center">
              Create Role
              <CirclePlus className="ml-2 h-4 w-4" />
            </span>
          </RButton>
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black ">
            <TableRow>
              <TableHead className="p-2 text-white">Role Name</TableHead>
              <TableHead className="p-2 text-white">Role Description</TableHead>
              <TableHead className="p-2 text-white text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles?.length ? (
              roles?.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="p-2">{role.name}</TableCell>
                  <TableCell className="p-2">{role.description}</TableCell>
                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end">
                      <RButton
                        variant="ghost"
                        className="flex items-center gap-2 "
                        onClick={() => {
                          handleEdit(role.id);
                        }}
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setRoleIndex(role.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteRole(roleIndex)}
                        dialogTitle="Are you sure to delete the role?"
                        dialogDescription="This action cannot be undone. This will permanently delete your
                              product and remove your data from our servers."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            {}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
};

export default WithLayout("admin")(Role);
