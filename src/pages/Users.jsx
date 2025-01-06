import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";

const Users = () => {
  const navigate = useNavigate();
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1234567890",
      userName: "johnDoe",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1234567891",
      userName: "janeSmith",
      status: "To Do",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      mobile: "+1234567892",
      userName: "bobJohnson",
      status: "In Review",
    },
    {
      id: 4,
      name: "Alice Lee",
      email: "alice.lee@example.com",
      mobile: "+1234567893",
      userName: "aliceLee",
      status: "Done",
    },
    {
      id: 5,
      name: "Tom Wilson",
      email: "tom.wilson@example.com",
      mobile: "+1234567894",
      userName: "tomWilson",
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

  return (
    <div className="flex flex-col gap-8">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <Button onClick={handleCreateUser}>Create User</Button>
        </div>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader className="bg-custom-black hover:bg-custom-black ">
              <TableRow>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Mobile Number</TableHead>
                <TableHead className="text-white">Username</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.mobile}</TableCell>
                  <TableCell>{user.userName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / usersPerPage)}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default WithLayout("admin")(Users);
