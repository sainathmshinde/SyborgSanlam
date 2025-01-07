import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirmDialog";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
// import { Pagination } from "@/components/ui/pagination";
import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import RButton from "@/components/ui/rButton";
import { CirclePlus, FilePenIcon, Trash2Icon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Users = () => {
  const navigate = useNavigate();
  const users = [
    { 
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1234567890",
      userName: "johnDoe",
      role: "Admin",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1234567891",
      userName: "janeSmith",
      role: "Onboarding Manger",
      status: "To Do",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      mobile: "+1234567892",
      userName: "bobJohnson",
      role: "Compliance Reviewer",
      status: "In Review",
    },
    {
      id: 4,
      name: "Alice Lee",
      email: "alice.lee@example.com",
      mobile: "+1234567893",
      userName: "aliceLee",
      role: "Client Admin User",
      status: "Done",
    },
    {
      id: 5,
      name: "Tom Wilson",
      email: "tom.wilson@example.com",
      mobile: "+1234567894",
      userName: "tomWilson",
      role: "Client Support User",
      status: "In Progress",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateUser = () => {
    navigate("/createUser");
  };

  const handleEdit =()=>{
    navigate("/editUsers");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 overflow-hidden  sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <Button onClick={handleCreateUser}>Create User</Button>
        </div>
        <div className="border rounded-lg  overflow-auto max-h-[400px]">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black ">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Username</TableHead>
                <TableHead className="text-white">Role</TableHead>
                <TableHead className="p-2 px-8 text-white text-end">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* </Table>
            </div>
            <div className="overflow-auto max-h-[400px]">
            <Table> */}
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 7V6L12 0H2C0.89 0 0 0.89 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H8V16.13L16.39 7.74C16.83 7.3 17.39 7.06 18 7ZM11 1.5L16.5 7H11V1.5ZM19.85 11.19L18.87 12.17L16.83 10.13L17.81 9.15C18 8.95 18.33 8.95 18.53 9.15L19.85 10.47C20.05 10.67 20.05 11 19.85 11.19ZM16.13 10.83L18.17 12.87L12.04 19H10V16.96L16.13 10.83Z" fill="#0D99FF"/>
</svg>
<div
    className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
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
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z" fill="#E31F21"/>
</svg>
<div
    className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
  >
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
              ))}
            </TableBody>
          </Table>
        </div>
        {/* <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={paginate}
          />
        </div> */}
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

export default WithLayout("admin")(Users);
