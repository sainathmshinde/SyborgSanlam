import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateOpportunity = () => {
  const navigate = useNavigate();

  const [newOpportunity, setNewOpportunity] = useState({
    name: "",
    stage: "",
    amount: "",
    probability: "",
    closeDate: "",
    contact: "",
    assignedUser: "",
    description: "",
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Create Opportunity</h1>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="source">Select Lead</Label>
            <Select id="lead">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">Lead 1</SelectItem>
                <SelectItem value="Referral">Lead 2</SelectItem>
                <SelectItem value="Cold Call">Lead 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stage">Stage</Label>
            <Select
              id="stage"
              value={newOpportunity.stage}
              onValueChange={(value) =>
                setNewOpportunity({ ...newOpportunity, stage: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Closed Won">Closed Won</SelectItem>
                  <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={newOpportunity.amount}
              onChange={(e) =>
                setNewOpportunity({ ...newOpportunity, amount: e.target.value })
              }
              placeholder="Enter Amount"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="probability">Probability</Label>
            <div className="relative md:w-1/2 ">
              <Slider
                defaultValue={[50]}
                min={0}
                max={100}
                step={1}
                className="h-2 bg-muted rounded-full"
              >
                <div className="bg-primary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" />
                </div>
                <div className="bg-primary w-4 h-4 rounded-full shadow-md transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" />
              </Slider>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedUser">Relationship manager</Label>
            <Select
              id="assignedUser"
              value={newOpportunity.assignedUser}
              onValueChange={(value) =>
                setNewOpportunity({ ...newOpportunity, assignedUser: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an Relationship manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
            <Select
              id="contact"
              value={newOpportunity.contact}
              onValueChange={(value) =>
                setNewOpportunity({ ...newOpportunity, contact: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Bob Johnson">Bob Johnson</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

          <div className="space-y-2">
            <div className="mt-2">
              <Label htmlFor="assignedUser">Close Date</Label>
              <DatePicker
                value={newOpportunity.closeDate}
                onChange={(date) =>
                  setNewOpportunity({
                    ...newOpportunity,
                    closeDate: date,
                  })
                }
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newOpportunity.description}
              onChange={(e) =>
                setNewOpportunity({
                  ...newOpportunity,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
      </form>

      <div className="flex justify-end mt-4 gap-2">
        <Button onClick={() => navigate("/opportunities")}>Save</Button>
        <Button variant="outline" onClick={() => navigate("/opportunities")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default WithLayout("sales")(CreateOpportunity);
