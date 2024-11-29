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
import { Badge } from "@/components/ui/badge";
import WithLayout from "@/components/layout/WithLayout";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Tasks = () => {
  const navigate = useNavigate();
  const tasks = [
    {
      id: 1,
      name: "Redesign website homepage",
      status: "In Progress",
      priority: "High",
      dueDate: "2023-12-15",
      assignedUser: "John Doe",
    },
    {
      id: 2,
      name: "Implement new feature",
      status: "To Do",
      priority: "Medium",
      dueDate: "2023-11-08",
      assignedUser: "Jane Smith",
    },
    {
      id: 3,
      name: "Fix bug in checkout process",
      status: "In Review",
      priority: "High",
      dueDate: "2023-09-25",
      assignedUser: "Bob Johnson",
    },
    {
      id: 4,
      name: "Write documentation for API",
      status: "Done",
      priority: "Low",
      dueDate: "2023-09-22",
      assignedUser: "Alice Lee",
    },
    {
      id: 5,
      name: "Optimize database queries",
      status: "In Progress",
      priority: "Medium",
      dueDate: "2023-11-15",
      assignedUser: "Tom Wilson",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleCreateTask = () => {
    navigate("/createTask");
  };

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setShowDialog(true);
  };
  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedTask(null);
  };

  const handleEdit = () => {
    navigate("/createTask");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
        </div>
        <div className="flex items-center justify-between mb-6">
          <Input
            type="search"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
          />
          <Button onClick={handleCreateTask}>Create Task</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="h-full relative py-5 shadow-xl">
              <CardContent className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold mr-3">{task.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800 mt-3"
                    onClick={() => handleViewClick(task)}
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span className="sr-only">View {task.name}</span>
                  </Button>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {task.assignedUser}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {task.status}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 justify-end">
                  <Button onClick={handleEdit} variant="outline" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {showDialog && (
          <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
            <DialogContent className="w-full max-w-xl py-5 px-5">
              <DialogHeader>
                <DialogTitle>{selectedTask?.name}</DialogTitle>
              </DialogHeader>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Relationship manager</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow key={selectedTask.id}>
                      <TableCell>{selectedTask.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            selectedTask.status === "Done"
                              ? "success"
                              : selectedTask.status === "In Progress"
                              ? "warning"
                              : "info"
                          }
                        >
                          {selectedTask.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            selectedTask.priority === "High"
                              ? "danger"
                              : selectedTask.priority === "Medium"
                              ? "warning"
                              : "success"
                          }
                        >
                          {selectedTask.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{selectedTask.dueDate}</TableCell>
                      <TableCell>{selectedTask.assignedUser}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button onClick={handleCloseDialog}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default WithLayout(Tasks);

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
