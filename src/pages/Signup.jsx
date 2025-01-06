import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export default function SignUp() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-8 bg-background flex items-center justify-center">
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create your account to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* <section className="space-y-4">
              <h3 className="text-lg font-semibold">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="broker">Broker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country of Origin</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section> */}

            <section className="space-y-4">
              {/* <h3 className="text-lg font-semibold">Primary Contact</h3> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="required">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter Primary Contact First Name"
                    value="Sipho"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="required">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter Primary Contact Last Name"
                    value="Keita"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="required">
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter Primary Contact Mobile Number"
                    value="0824555555"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="required">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Primary Contact Email"
                    value="siphokeita@example.com"
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Select>
                    <SelectTrigger id="designation">
                      <SelectValue placeholder="Select Primary Contact Designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CEO">Sales Manager</SelectItem>
                      <SelectItem value="CFO">Compliance Manager</SelectItem>
                      <SelectItem value="COO">CIO</SelectItem>
                      <SelectItem value="CTO">CTO</SelectItem>
                      <SelectItem value="CMO">CMO</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
                <div className="space-y-2">
                  <Label htmlFor="username" className="required">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value="siphokeita"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="required">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value="password"
                  />
                </div>
              </div>
            </section>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => {
                navigate("/login");
                toast({
                  title: "Account created",
                  description: "Your account has been successfully created.",
                  variant: "success",
                });
              }}
            >
              Sign Up
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
