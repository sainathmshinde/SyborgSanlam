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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const initialRoles = [
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
    name: "Customer Admin User",
    description:
      "The end-user or client who uses the products or services offered. This user has access to all the features and functionalities of the system.",
  },
  {
    id: 8,
    name: "Customer User",
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
    name: "Customer Support User",
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

  const [searchterm, setSearchTerm] = useState("");
  const filterData = roles.filter((role) =>
    role.name.toLocaleLowerCase().includes(searchterm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
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
    navigate("/editRole");
  };

  const handleNew = () => {
    navigate("/createrole");
  };
  return (
    <div className="p-4">
      <div className=" flex flex-col justify-between">
        <div>
          <h1 className=" text-2xl font-bold ">Roles</h1>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <Input
            type="search"
            placeholder="Search Roles..."
            value={searchterm}
            onChange={handleSearch}
            className="w-full  bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <RButton
            onClick={() => {
              handleNew();
            }}
            className="ml-10"
          >
            <span className="flex items-center">
              Create Role
              {/* <CirclePlus className="ml-2 h-4 w-4" /> */}
            </span>
          </RButton>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black sticky top-0 z-10 ">
            <TableRow>
              <TableHead className="p-2 text-white">Role Name</TableHead>
              <TableHead className="p-2 text-white">Role Description</TableHead>
              <TableHead className="p-2 text-white text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
      <div className="overflow-auto max-h-[400px]">
        <Table>
          <TableBody>
            {filterData?.length ? (
              filterData?.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="p-2">{role.name}</TableCell>
                  <TableCell className="p-2">{role.description}</TableCell>
                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end">
                      <RButton
                        variant="ghost"
                        className="relative group flex items-center gap-2"
                        onClick={() => {
                          handleEdit();
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
                            d="M18 7V6L12 0H2C0.89 0 0 0.89 0 2V16C0 16.5304 
                            0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 
                            18H8V16.13L16.39 7.74C16.83 7.3 17.39 7.06 18 7ZM11 1.5L16.5 7H11V1.5ZM19.85 
                            11.19L18.87 12.17L16.83 10.13L17.81 9.15C18 8.95 18.33 8.95 18.53 9.15L19.85 
                            10.47C20.05 10.67 20.05 11 19.85 11.19ZM16.13 10.83L18.17 12.87L12.04 19H10V16.96L16.13 10.83Z"
                            fill="#0D99FF"
                          />
                        </svg>
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 
                        bottom-full mb-2 hidden group-hover:flex items-center justify-center 
                        bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
                        >
                          Edit
                        </div>
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="relative group flex items-center gap-2"
                            onClick={() => {
                              setRoleIndex(role.id);
                            }}
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
      <div className="flex justify-end"></div>
    </div>
  );
};

export default WithLayout("admin")(Role);
