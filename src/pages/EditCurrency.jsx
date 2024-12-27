import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/combobox";
import RButton from "@/components/ui/rButton";
import { Card, CardContent } from "@/components/ui/card";
import RInput from "@/components/ui/rInput";
import { useState } from "react";

const EditCurrency = () => {
  const [currency, setCurrency] = useState({
    country: "United States	",
    currencyName: "United States Dollar",
    code: "USD",
    symbol: "$",
  });

  const handleInputChange = (field, value) => {
    setCurrency((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="mx-auto p-4">
      <div className="w-full space-y-6">
        <div className="">
          <h1 className="text-xl font-bold">Edit Currency</h1>
        </div>
        <form className="space-y-4">
          <Card className="bg-gray-200">
            <CardContent className="p-4 ">
              <div className="space-y-2 w-full">
                <Label htmlFor="country" className="w-full required">
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="Enter Country "
                  value={currency.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  //   required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="currencyName" className="w-full required">
                  Currency Name
                </Label>
                <Input
                  id="currencyName"
                  placeholder="Enter Currency Name "
                  value={currency.currencyName}
                  onChange={(e) =>
                    handleInputChange("currencyName", e.target.value)
                  }
                  //   required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="code" className="w-full required">
                  Code
                </Label>
                <Input
                  id="code"
                  placeholder="Enter Code "
                  value={currency.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  //   required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="symbol" className="w-full required">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  placeholder="Enter Symbol "
                  value={currency.symbol}
                  onChange={(e) => handleInputChange("symbol", e.target.value)}
                  //   required
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <RButton type="submit">Edit Currency</RButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithLayout("admin")(EditCurrency);
