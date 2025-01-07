import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";
import { useNavigate } from "react-router";

const EditCountry = () => {
  const [country, setCountry] = useState({
    countryName: "South Africa",
    countryCode: "ZA",
  });

  const handleInputChange = (field, value) => {
    setCountry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const navigate = useNavigate();
    const goBack = () => {
      navigate("/country"); 
    };
    const handleSubmit = () => {
      navigate("/country"); 
    };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="overflow-hidden  sticky top-0 z-10">
          <h1 className="text-xl font-bold">Edit Country</h1>
        </div>
        <form className="space-y-4 overflow-auto max-h-[500px]">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="countryName" className="w-full required">
                  Country Name
                </Label>
                <Input
                  id="countryName"
                  placeholder="Enter Country Name "
                  value={country.countryName}
                  onChange={(e) =>
                    handleInputChange("Country Name", e.target.value)
                  }
                  //   required
                />
              </div>
              <div className="space-y-2 w-full mt-4">
                <Label htmlFor="countryCode" className="w-full required">
                  Country Code
                </Label>
                <Input
                  id="countryCode"
                  placeholder="Enter Country Code "
                  value={country.countryCode}
                  onChange={(e) =>
                    handleInputChange("Country Code", e.target.value)
                  }
                  //   required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>
                                      Back
                                    </RButton>
            <RButton className="ml-5" onClick={handleSubmit} type="submit">Update</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditCountry);
