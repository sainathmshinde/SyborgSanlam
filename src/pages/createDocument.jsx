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
// import { Card } from "@/components/ui/card";
import { Card, CardContent } from "@/components/ui/card";

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
        // isChecked: category === "Certificate",
        // category === "IdProof" ||
        // category === "AddressProof",
        items: allDocuments[category].reduce((acc, item) => {
          acc[item] = false;
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

  // const handleAddDocument = () => {
  //   const newDocument = prompt("Enter the new document name:");
  //   if (newDocument) {
  //     setCustomDocuments((prev) => [...prev, newDocument]);
  //   }
  // };

  const [documentData, setDocumentData] = useState([
    {
      documentType: "Certificate",
      documentNames: ["Registration Certificate", "Incorporate Letter"],
    },
    {
      documentType: "ID Proof",
      documentNames: ["Passport", "Driving Licence", "National ID"],
    },
  ]);

  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");

  const handleAddDocumentName = () => {
    if (documentType && documentName) {
      setDocumentData((prevData) => {
        // Check if the document type already exists
        const existingType = prevData.find(
          (doc) => doc.documentType === documentType
        );

        if (existingType) {
          // If document type exists, just add the new document name to that type
          return prevData.map((doc) =>
            doc.documentType === documentType
              ? {
                  ...doc,
                  documentNames: [...doc.documentNames, documentName],
                }
              : doc
          );
        } else {
          // If document type doesn't exist, create a new entry with that type and document name
          return [...prevData, { documentType, documentNames: [documentName] }];
        }
      });

      // Reset input fields
      setDocumentType("");
      setDocumentName("");
    }
  };

  // Handle deleting a document name
  const handleDeleteDocumentName = (documentType, documentName) => {
    setDocumentData((prevData) => {
      return prevData.map((doc) => {
        if (doc.documentType === documentType) {
          return {
            ...doc,
            documentNames: doc.documentNames.filter(
              (name) => name !== documentName
            ),
          };
        }
        return doc;
      });
    });
  };

  return (
    <div className="w-full p-4">
      {next == 1 && (
        <div>
          <div className="flex justify-start items-center ">
            {/* <div
              onClick={goBack}
              className="hover:cursor-pointer hover:text-blue-600  w-12 -mt-4"
            >
              {" "}
              <CircleArrowLeft className="w-8 h-8" />
            </div> */}
            <h1 className="text-xl font-bold mb-4 overflow-hidden sticky top-0 z-10">
              {" "}
              Create New Checklist
            </h1>
            <div className="flex justify-end"></div>
          </div>

          <div className="mb-4 text-md bg-gray-200 border rounded-lg overflow-x-auto max-h-[500px]">
            <div className="space-y-4 p-4">
              <div className="flex flex-col">
                {/* <div className="space-y-2 w-1/2">
               <Label htmlFor="name" className="text-md">
                 Checklist Name
               </Label>
               <Input id="name" placeholder="Enter checklist name" />
             </div> */}
                <div className="grid grid-cols-2 gap-4 ">
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
                      Customer Type
                    </Label>
                    <Select
                      id="clientType"
                      value={formValues.clientType}
                      onValueChange={
                        (value) => handleChange("clientType", value) // Update the clientType value
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer type" />
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
                {/* <div className="mt-4">
                  <Label htmlFor="doc" className="text-md  required">
                    Select Applicable Document Types
                  </Label> */}
                  {/* <div className="grid grid-cols-3 mt-2̦ gap-4">
                    {checklist.map((document) => (
                      <Card key={document} className="mt-4 gap-2 p-4">
                        <label>
                          <input
                            type="checkbox"
                            checked={isChecked(document)}
                            onChange={() => handleCheck(document)}
                            style={{ margin: 10 }}
                          />
                          {document}
                        </label>
                        <div key={document} className="flex items-center gap-2">
                          <Checkbox
                            checked={isChecked(document)}
                            onCheckedChange={() => handleCheck(document)}
                          />
                          <span className="font-semibold">{document}</span>
                        </div>
                      </Card>
                    ))}
                  </div> */}

                  {/* <div className="mb-2 mt-0 text-md">
                    <div className="space-y-4">
                      <div className="flex flex-col"> */}
                        {/* <div className="space-y-2 w-1/2">
              <Label htmlFor="name" className="text-md">
                Checklist Name
              </Label>
              <Input id="name" placeholder="Enter checklist name" />
            </div> */}
                        {/* <div className="overflow-hidden  sticky top-0 z-10">
                          <h1 className="text-2xl font-bold mb-4">
                            {" "}
                            Required Documents
                          </h1>
                        </div> */}
                        {/* <div className="overflow-auto max-h-[500px]"> */}
                        {/* <div className="mb-2 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto"> */}
                          {/* <Label htmlFor="doc" className="text-2xl font-bold mb-4">
                    Required Documents
                  </Label> */}
                          {/* <div className="grid grid-cols-3 gap-4">
                            {Object.keys(allDocuments).map((category) => (
                              <Card key={category} className="mt-4 gap-2 p-4">
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={checkedItems[category].isChecked}
                                    onCheckedChange={() =>
                                      handleCategoryChange(category)
                                    }
                                  />
                                  <span className="font-semibold">
                                    {category}
                                  </span>
                                </div>
                                <div className="pl-6 space-y-2">
                                  {allDocuments[category].map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2"
                                    >
                                      <Checkbox
                                        checked={
                                          checkedItems[category].items[item]
                                        }
                                        onCheckedChange={(checked) =>
                                          handleItemChange(
                                            category,
                                            item,
                                            checked
                                          )
                                        }
                                      />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                                <button
                                  onClick={handleAddDocument}
                                  className=" flex  mt-5 items-center justify-center
                       w-1/2 h-10 rounded-full bg-gray-800 text-white shadow-md"
                                  aria-label="Add document"
                                >
                                  {/* <Plus className="w-5 h-5" /> */}
                                  {/* Add Documents +
                                </button>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */} 
                  
                  {/* <div className="flex justify-end">
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
          <div className="flex justify-end mt-10">
            <RButton variant="outline" onClick={goBack}>
              Back
            </RButton>
            <RButton className="ml-5" onClick={goBack} type="submit">
              Submit
            </RButton>
          </div>
        </div>
      )} */}
      <form className="space-y-4 overflow-auto max-h-[585px] -ml-4">
                          <Card className="bg-gray-200">
                            <CardContent className="">
                              <div className="mt-4 ">
                                {/* <h1 className="text-xl font-semibold">Select Applicable Document Names</h1> */}
                                <h2 className="text-lg font-semibold mb-2 required">
                                  Select Applicable Document Types
                                </h2>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                                {/* Document Type */}
                                <div className="flex items-center space-x-4">
                                  <Label
                                    htmlFor="documentType"
                                    className="text-md font-semibold "
                                  >
                                    Document Type:
                                  </Label>
                                  <Input
                                    id="documentType"
                                    placeholder="Enter Document Type"
                                    value={documentType}
                                    onChange={(e) => setDocumentType(e.target.value)}
                                    className="w-64"
                                  />
                                </div>
      
                                {/* Document Name and Add Button */}
                                <div className="flex items-center space-x-4 mt-4">
                                  <Label
                                    htmlFor="documentName"
                                    className="text-md font-semibold"
                                  >
                                    Document Name:
                                  </Label>
                                  <Input
                                    id="documentName"
                                    placeholder="Enter Document Name"
                                    value={documentName}
                                    onChange={(e) => setDocumentName(e.target.value)}
                                    className="w-64"
                                  />
                                  <button
                                    type="button"
                                    onClick={handleAddDocumentName}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
                                    aria-label="Add Document Name"
                                  >
                                    <Plus className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </form>
      
                        {/* Table to display added documents */}
                        {documentData.length > 0 && (
                          <div className="mt-1">
                            <h2 className="text-lg font-semibold mb-4">
                              Added Documents
                            </h2>
                            <table className="w-full border-collapse table-auto shadow-md bg-white">
                              <thead>
                                <tr className="bg-custom-black text-white">
                                  <th className="border px-4 py-2 text-left">
                                    Document Type
                                  </th>
                                  <th className="border px-4 py-2 text-left">
                                    Document Names
                                  </th>
                                  <th className="border px-4 py-2 text-center">
                                    Actions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {documentData.map((doc, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="border px-4 py-2">
                                      {doc.documentType}
                                    </td>
                                    <td className="border px-4 py-2">
                                      <ul>
                                        {doc.documentNames.map((name, i) => (
                                          <li
                                            key={i}
                                            className="flex justify-between items-center"
                                          >
                                            <span>{name}</span>
                                            <button
                                              onClick={() =>
                                                handleDeleteDocumentName(
                                                  doc.documentType,
                                                  name
                                                )
                                              }
                                              // className="text-red-600 hover:text-red-800 text-sm mb-1"
                                              // title="Remove"
                                              // style={{ border: "1px solid red" }}
                                            >
                                              {/* <Remove h-2 w-2 /> */}
                                              <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.6963 0.915655C7.28141 0.328516 8.06628 -6.85649e-05 8.88347 1.07317e-08H20.6133C21.2945 1.07317e-08 22.0874 0.194621 22.7355 0.608483C23.3951 1.02821 24 1.75041 24 2.78448V14.2155C24 15.2496 23.3951 15.9706 22.7355 16.3915C22.0942 16.787 21.361 16.9973 20.6133 17H8.88347C8.06628 17.0001 7.28141 16.6715 6.6963 16.0843L0.601841 9.96904C0.411358 9.77789 0.259974 9.54944 0.156612 9.29714C0.05325 9.04484 0 8.77381 0 8.5C0 8.22619 0.05325 7.95516 0.156612 7.70286C0.259974 7.45056 0.411358 7.22211 0.601841 7.03097L6.6963 0.915655ZM14.2739 5.53379C14.1957 5.4474 14.1014 5.37811 13.9966 5.33005C13.8918 5.28199 13.7787 5.25615 13.6639 5.25406C13.5492 5.25198 13.4353 5.2737 13.3289 5.31793C13.2225 5.36215 13.1259 5.42798 13.0447 5.51147C12.9636 5.59497 12.8997 5.69443 12.8567 5.80392C12.8137 5.91341 12.7926 6.03068 12.7946 6.14875C12.7967 6.26682 12.8218 6.38325 12.8685 6.49111C12.9152 6.59898 12.9825 6.69605 13.0664 6.77655L14.741 8.5L13.0664 10.2234C12.9825 10.3039 12.9152 10.401 12.8685 10.5089C12.8218 10.6167 12.7967 10.7332 12.7946 10.8513C12.7926 10.9693 12.8137 11.0866 12.8567 11.1961C12.8997 11.3056 12.9636 11.405 13.0447 11.4885C13.1259 11.572 13.2225 11.6379 13.3289 11.6821C13.4353 11.7263 13.5492 11.748 13.6639 11.7459C13.7787 11.7439 13.8918 11.718 13.9966 11.67C14.1014 11.6219 14.1957 11.5526 14.2739 11.4662L15.9485 9.74276L17.623 11.4662C17.7012 11.5526 17.7956 11.6219 17.9004 11.67C18.0052 11.718 18.1183 11.7439 18.233 11.7459C18.3477 11.748 18.4617 11.7263 18.5681 11.6821C18.6745 11.6379 18.7711 11.572 18.8522 11.4885C18.9333 11.405 18.9973 11.3056 19.0403 11.1961C19.0832 11.0866 19.1043 10.9693 19.1023 10.8513C19.1003 10.7332 19.0752 10.6167 19.0285 10.5089C18.9818 10.401 18.9145 10.3039 18.8305 10.2234L17.156 8.5L18.8305 6.77655C18.9145 6.69605 18.9818 6.59898 19.0285 6.49111C19.0752 6.38325 19.1003 6.26682 19.1023 6.14875C19.1043 6.03068 19.0832 5.91341 19.0403 5.80392C18.9973 5.69443 18.9333 5.59497 18.8522 5.51147C18.7711 5.42798 18.6745 5.36215 18.5681 5.31793C18.4617 5.2737 18.3477 5.25198 18.233 5.25406C18.1183 5.25615 18.0052 5.28199 17.9004 5.33005C17.7956 5.37811 17.7012 5.4474 17.623 5.53379L15.9485 7.25724L14.2739 5.53379Z" fill="#FF0000"/>
</svg>
<div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
                                          Delete
                                        </div>
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                      {/* Optional: Button to delete the entire document type */}
                                      {/* <button
                            onClick={() => {
                              setDocumentData((prevData) =>
                                prevData.filter((item) => item.documentType !== doc.documentType)
                              );
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="delete"
                          >
                             <svg
                                                        width="16"
                                                        height="18"
                                                        viewBox="0 0 16 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                      >
                                                        <path
                                                          d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                                          fill="#E31F21"
                                                        />
                                                      </svg>
                                                      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg">
                                    Delete
                                  </div>
                            
                            
                          </button> */}
      
                                      <RButton
                                        variant="ghost"
                                        className="relative group flex items-center gap-2  ml-60"
                                        onClick={() => {
                                          setDocumentData((prevData) =>
                                            prevData.filter(
                                              (item) =>
                                                item.documentType !== doc.documentType
                                            )
                                          );
                                        }}
                                      >
                                        {/* <Trash2Icon className="h-4 w-4 text-red-500" /> */}
                                        <svg
                                          width="16"
                                          height="18"
                                          viewBox="0 0 16 18"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.19667 17.0217 1.00067 16.5507 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.0217 17.805 13.5507 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                                            fill="#E31F21"
                                          />
                                        </svg>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
                                          Delete
                                        </div>
                                      </RButton>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <RButton variant="outline" onClick={goBack}>
                    Back
                  </RButton>
      
                  <RButton
                    className="ml-5"
                    onClick={() => navigate("/documentsList")}
                    type="submit"
                  >
                    Submit
                  </RButton>
                </div>
              </div>
            )}
      {/* {next === 2 && (
        <div>
          <div className="mb-4 text-md">
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="space-y-2 w-1/2">
                  <Label htmlFor="name" className="text-md">
                    Checklist Name
                  </Label>
                  <Input id="name" placeholder="Enter checklist name" />
                </div>
                <div className="overflow-hidden  sticky top-0 z-10">
                  <h1 className="text-2xl font-bold mb-4">
                    {" "}
                    Required Documents
                  </h1>
                </div>
                <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
                  <Label htmlFor="doc" className="text-2xl font-bold mb-4">
                    Required Documents
                  </Label>
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
              <RButton variant="outline" onClick={goBack}>
                Back
              </RButton>
            </div>
            <div className="flex justify-end">
              <RButton onClick={() => navigate("/documentsList")} type="submit">
                Submit
              </RButton>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default WithLayout("admin")(CreateUser);
function Remove() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
