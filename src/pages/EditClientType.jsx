import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditClientType = () => {
  const [client, setClient] = useState({
    clientType: "Individual",
    description: "Clearly communicate their needs, provide necessary information, make timely decisions, give feedback, and fulfill financial obligations.",
  });

  const handleInputChange = (field, value) => {
    setClient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const navigate = useNavigate();
    const goBack = () => {
      navigate("/clientType"); 
    };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Edit Customer Type</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Customer Type
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Client Type "
                  value={client.clientType}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  //   required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                 Description
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Description "
                  value={client.description}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  //   required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>
                                      Back
                                    </RButton>
            <RButton className="ml-5" type="submit">Update</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditClientType);
