import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import RButton from "@/components/ui/rButton";
import RInput from "@/components/ui/rInput";
import {
  TableContainer,
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
      <div className=" flex flex-col justify-between overflow-hidden sticky top-0 z-10">
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
      <div className="overflow-auto max-h-[450px]">
        <TableContainer>
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black sticky top-0 z-10">
              <TableRow>
                <TableHead className="p-2 text-white">Role Name</TableHead>
                <TableHead className="p-2 text-white">
                  Role Description
                </TableHead>
                <TableHead className="p-2 text-white text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            {/* </Table>
      </div>
      <div className="overflow-auto max-h-[400px]">
        <Table> */}
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

                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 
                        bottom-full mb-2 hidden group-hover:flex items-center justify-center 
                        bg-white text-black text-xs px-2 py-1 rounded shadow-lg"
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
                              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
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
        </TableContainer>
      </div>
      {/* </div> */}
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
