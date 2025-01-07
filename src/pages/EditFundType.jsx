import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { useNavigate } from "react-router";


const EditFundType = () => {
  const [fund, setFund] = useState({
    fundType: "Equity",
    description: "Type of investment fund that primarily invests in stocks or shares of companies.",
  });

   const navigate = useNavigate();
    const goBack = () => {
      navigate("/fundType"); 
    };
    const handleSubmit = () => {
      navigate("/fundType"); 
    };

  const handleInputChange = (field, value) => {
    setFund((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Edit Fund Type</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="fundType" className="w-full required">
                  Fund Type
                </Label>
                <Input
                  id="fundType"
                  placeholder="Enter Fund Type "
                  value={fund.fundType}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  //   required
                />
              </div>
              <div className="space-y-2 w-full mt-4">
                <Label htmlFor="fundType" className="w-full required">
                 Description
                </Label>
                <Input
                  id="fundType"
                  placeholder="Enter Fund Type "
                  value={fund.description}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  //   required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>Back</RButton>
            <RButton className="ml-5" onClick={handleSubmit} type="submit">Update</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditFundType);
