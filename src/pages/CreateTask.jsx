import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/datePicker";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import WithLayout from "@/components/layout/WithLayout";

const CreateTask = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    status: "",
    assignedUser: "",
    dueDate: "",
    description: "",
  });

  const handleSaveTask = () => {
    navigate("/tasks");
  };

  const handleInputChange = (field, value) => {
    setNewTask({ ...newTask, [field]: value });
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Create Task</h1>
      </div>
      <div>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newTask.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={newTask.priority}
              onValueChange={(value) => handleInputChange("priority", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={newTask.status}
              onValueChange={(value) => handleInputChange("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="assignedUser">Assigned User</Label>
            <Select
              id="assignedUser"
              value={newTask.assignedUser}
              onValueChange={(value) =>
                handleInputChange("assignedUser", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select assigned user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="John Doe">John Doe</SelectItem>
                <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                <SelectItem value="Alice Lee">Alice Lee</SelectItem>
                <SelectItem value="Tom Wilson">Tom Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <DatePicker
              id="dueDate"
              date={newTask.dueDate}
              onChange={(date) => handleInputChange("dueDate", date)}
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 mt-4">
          <Button onClick={handleSaveTask}>Save</Button>
          <Button variant="ghost" onClick={() => navigate("/tasks")}>
            Cancel
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};

export default WithLayout(CreateTask);
