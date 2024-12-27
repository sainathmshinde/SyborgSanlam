import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";

const EditClientType = () => {
  const [client, setClient] = useState({
    clientType: "Individual",
  });

  const handleInputChange = (field, value) => {
    setClient((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Edit Client Type</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="teamName" className="w-full required">
                  Client Type
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter Client Type "
                  value={client.clientType}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  //   required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton type="submit">Edit Client Type</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditClientType);
