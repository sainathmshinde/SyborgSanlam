import WithLayout from "@/components/layout/WithLayout";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import country from "@/lib/country";
import { toast } from "@/hooks/use-toast";

function CreateChecklist() {
  const countries = country;
  const [formValues, setFormValues] = useState({
    country: "",
    clientType: "",
  });
  const [checkedItems, setCheckedItems] = useState({
    certificateOfIncorporation: false,
    bankStatement: false,
    idProof: false,
    addressProof: false,
    partnershipAgreement: false,
    partnerIds: false,
    trustRegistrationCertificate: false,
    trusteeIds: false,
  });

  function formatString(str) {
    const formattedStr = str.replace(/([A-Z])/g, " $1").trim();
    return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
  }

  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (id, value) => {
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const clientTypeConfig = {
    company: {
      certificateOfIncorporation: true,
      bankStatement: false,
      idProof: false,
      addressProof: true,
      partnershipAgreement: false,
      partnerIds: false,
      trustRegistrationCertificate: false,
      trusteeIds: false,
    },
    individual: {
      certificateOfIncorporation: false,
      bankStatement: true,
      idProof: true,
      addressProof: true,
      partnershipAgreement: false,
      partnerIds: false,
      trustRegistrationCertificate: false,
      trusteeIds: false,
    },
    trust: {
      certificateOfIncorporation: false,
      bankStatement: false,
      idProof: false,
      addressProof: true,
      partnershipAgreement: false,
      partnerIds: false,
      trustRegistrationCertificate: true,
      trusteeIds: true,
    },
  };
  useEffect(() => {
    const updatedCheckedItems = clientTypeConfig[formValues.clientType] || {};
    setCheckedItems((prev) => ({
      ...prev,
      ...updatedCheckedItems, // Update only the relevant keys
    }));
  }, [formValues.clientType]);

  const handleCheckboxChange = (checked, item) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [item]: checked,
    }));
  };

  function convertToLabel(input) {
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  }

  const handleSelectChange = (key, value) => {
    if (key === "country") {
      setSelectedCountry(value);
    }
    // Handle other fields if necessary
  };

  return (
    <div className="w-full">
      <CardHeader className="p-4">
        <h1 className="text-2xl font-bold">Compliance Checklist</h1>
        <CardDescription>
          Complete the checklist to submit your documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="required">
              Country
            </Label>
            <Select
              id="country"
              onValueChange={(value) => handleSelectChange("country", value)}
              value={selectedCountry} // Set the selected value
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-type" className="required">
              Client Type
            </Label>
            <Select
              id="clientType"
              value={formValues.clientType}
              onValueChange={
                (value) => handleChange("clientType", value) // Update the clientType value
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select client type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
                <SelectItem value="company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <hr />
        {/* {selectedCountry && ( */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Required Documents</h3>
          <div>
            {Object.keys(checkedItems).map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Checkbox
                  // name={item}
                  checked={checkedItems[item]}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, item)
                  }
                />
                <label>{formatString(item)}</label>
              </div>
            ))}
          </div>
        </div>
        {/* )} */}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            toast({
              title: "Success",
              description: "Checklist submitted successfully.",
              variant: "success",
            })
          }
        >
          Submit
        </Button>
      </CardFooter>
    </div>
  );
}

export default WithLayout("compliance")(CreateChecklist);
