import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WithLayout from "@/components/layout/WithLayout";
import RButton from "@/components/ui/rButton";
import { Button } from "@/components/ui/button";
import { allDocuments } from "@/lib/documents";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { CircleArrowLeft } from "lucide-react";
import country from "@/lib/country";
import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

const checklist = [
  "Certificate",
  "Id Proof",
  "Address Proof",
  "Bank Statement",
  "Partnership Agreement",
  "PartnerIds",
  "Trust Registration Certificate",
  "TrusteeIds",
];

function CreateUser() {
  const navigate = useNavigate();
  const countries = country;
  const [formValues, setFormValues] = useState({
    country: "",
    clientType: "",
  });
  
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [next, setNext] = useState(1);

  const handleCheck = (document) => {
    setSelectedDocuments(
      (prev) =>
        prev.includes(document)
          ? prev.filter((item) => item !== document) // Remove if already selected
          : [...prev, document] // Add if not selected
    );
  };
  const isChecked = (document) => selectedDocuments.includes(document);

  const handleSelectChange = (key, value) => {
    if (key === "country") {
      setSelectedCountry(value);
    }
    // Handle other fields if necessary
  };
  const handleChange = (id, value) => {
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const HandleNext = () => {
    setNext(2);
  };

  const goBack = () => {
    navigate("/documentsList");
  };

  const [checkedItems, setCheckedItems] = useState(() => {
    const initialState = {};
    Object.keys(allDocuments).forEach((category) => {
      initialState[category] = {
        isChecked:
          category === "Certificate" ||
          category === "IdProof" ||
          category === "AddressProof", // Independent state for the category
        items: allDocuments[category].reduce((acc, item) => {
          acc[item] = false; // Independent state for each sub-item
          return acc;
        }, {}),
      };
    });
    return initialState;
  });

  // Handle category checkbox changes
  const handleCategoryChange = (category, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        isChecked, // Update only the category's state
      },
    }));
  };

  // Handle individual sub-item checkbox changes
  const handleItemChange = (category, item, isChecked) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        items: {
          ...prev[category].items,
          [item]: isChecked, // Update only the specific item's state
        },
      },
    }));
  };
  const [customDocuments, setCustomDocuments] = useState([]);

  const handleAddDocument = () => {
    const newDocument = prompt("Enter the new document name:");
    if (newDocument) {
      setCustomDocuments((prev) => [...prev, newDocument]);
    }
  };
  
  return (
    <div className="w-full p-4">
      {next == 1 && (
        <div>
          <div className="flex justify-start items-center ">
            <div
              onClick={goBack}
              className="hover:cursor-pointer hover:text-blue-600  w-12 -mt-4"
            >
              {" "}
              <CircleArrowLeft className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold mb-4"> Create Checklist</h1>
            <div className="flex justify-end"></div>
          </div>
         
          <div className="mb-4 text-md bg-gray-200 border rounded-lg overflow-x-auto">
            <div className="space-y-4 p-4">
              <div className="flex flex-col">
                {/* <div className="space-y-2 w-1/2">
               <Label htmlFor="name" className="text-md">
                 Checklist Name
               </Label>
               <Input id="name" placeholder="Enter checklist name" />
             </div> */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="country" className="required">
                      Country
                    </Label>
                    <Select
                      id="country"
                      onValueChange={(value) =>
                        handleSelectChange("country", value)
                      }
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
                <div className="mt-4">
                  <Label htmlFor="doc" className="text-md  required">
                    Select Applicable Document Types
                  </Label>
                  <div className="grid grid-cols-3 mt-2̦ gap-4">
                    {checklist.map((document) => (
                      <Card key={document} className="mt-4 gap-2 p-4">
                        {/* <label>
                          <input
                            type="checkbox"
                            checked={isChecked(document)}
                            onChange={() => handleCheck(document)}
                            style={{ margin: 10 }}
                          />
                          {document}
                        </label> */}
                        <div key={document} className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked(document)}
                            onCheckedChange={() => handleCheck(document)}
                          />
                          <span className="font-semibold">{document}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddDocument}
                      className=" flex items-center justify-center
                       w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
                      aria-label="Add document"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-16">
            <RButton onClick={HandleNext} type="submit">
              Next
            </RButton>
          </div>
        </div>
      )}
      {next === 2 && (
        <div>
          <div className="mb-4 text-md">
            <div className="space-y-4">
              <div className="flex flex-col">
                {/* <div className="space-y-2 w-1/2">
              <Label htmlFor="name" className="text-md">
                Checklist Name
              </Label>
              <Input id="name" placeholder="Enter checklist name" />
            </div> */}
                <div className="gap-4 "></div>
                <h1 className="text-2xl font-bold mb-4"> Required Documents</h1>
                <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
                  {/* <Label htmlFor="doc" className="text-2xl font-bold mb-4">
                    Required Documents
                  </Label> */}
                  <div className="grid grid-cols-3 gap-4">
                    {Object.keys(allDocuments).map((category) => (
                      <Card key={category} className="mt-4 gap-2 p-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={checkedItems[category].isChecked}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(category, checked)
                            }
                          />
                          <span className="font-semibold">{category}</span>
                        </div>
                        <div className="pl-6 space-y-2">
                          {allDocuments[category].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                              <Checkbox
                                checked={checkedItems[category].items[item]}
                                onCheckedChange={(checked) =>
                                  handleItemChange(category, item, checked)
                                }
                              />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <div className="flex justify-end">
              <RButton onClick={() => setNext(1)}>Back</RButton>
            </div>
            <div className="flex justify-end">
              <RButton onClick={() => navigate("/documentsList")} type="submit">
                Submit
              </RButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WithLayout("compliance")(CreateUser);
