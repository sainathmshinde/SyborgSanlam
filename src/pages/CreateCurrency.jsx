import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useNavigate } from "react-router";

const CreateCurrency = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/currency"); 
  };
  const handleSubmit = () => {
    navigate("/currency"); 
  };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Create New Currency</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="country" className="w-full required">
                  Country
                </Label>
                <Input id="teamName" placeholder="Enter Country " />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamName" className=" w-full required">
                  Currency Name
                </Label>
                <Input id="teamEmail" placeholder="Enter Currency " />
              </div>

              {/* <div className="flex gap-20"> */}
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamMembers" className="w-full required">
                  Code
                </Label>
                <Input id="code" placeholder="Enter Code" />
              </div>
              <div className="space-y-2 mt-2">
                <Label htmlFor="teamRoles" className="w-full required">
                  Symbol
                </Label>
                <Input id="symbol" placeholder="Enter Symbol" />
              </div>
              {/* </div> */}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>
                                                  Back
                                                </RButton>
            <RButton className="ml-5" onClick={handleSubmit} type="submit">Submit</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(CreateCurrency);
