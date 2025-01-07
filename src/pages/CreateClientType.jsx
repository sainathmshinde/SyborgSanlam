import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useNavigate } from "react-router";

const CreateClientType = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/clientType"); 
  };
  const handleSubmit = () => {
    navigate("/clientType"); 
  };
  
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Create New Customer Type</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Customer Type
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Customer Type "
                  //   required
                />
              </div>
              <div className="space-y-2 w-full mt-4">
                <Label htmlFor="teamName" className="w-full required">
                  Description
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Description "
                  //   required
                />
              </div>
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

export default WithLayout("admin")(CreateClientType);
