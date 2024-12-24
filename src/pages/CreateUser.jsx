import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WithLayout from "@/components/layout/WithLayout";
import RButton from "@/components/ui/rButton";
import { Button } from "@/components/ui/button";

function CreateUser() {
  return (
    <div className="w-full">
      {/* Please complete the details and submit */}
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-bold mt-2 mb-6">Create User</h1>
        <div className="flex justify-end"></div>
      </div>
      <div className="mb-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <RButton type="submit">Create User</RButton>
      </div>
    </div>
  );
}

export default WithLayout("admin")(CreateUser);
