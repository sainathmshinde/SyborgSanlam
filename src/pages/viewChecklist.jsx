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
import { ConfirmDialog } from "@/components/ui/confirmDialog";

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
  const [viewChecklist, setViewChecklist] = useState({
    name: "Admin",
    members: "John Doe",
  });

  const handleInputChange = (field, value) => {
    setViewChecklist((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const countries = country;
  const [formValues, setFormValues] = useState({
    country: "",
    clientType: "",
  });
  const [selectedDocuments, setSelectedDocuments] = useState([
    "Certificate",
    "Id Proof",
    "Address Proof",
  ]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [next, setNext] = useState(1);

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
  
  const [editingDoc, setEditingDoc] = useState(null); // Stores the document being edited
  const [editDocumentName, setEditDocumentName] = useState(""); // Stores the edited name
  const [editDocumentType, setEditDocumentType] = useState(''); // Stores the new document type
  const [showForm, setShowForm] = useState(false);
  
  const handleEdit = (doc, name) => {
    setEditingDoc({ documentType: doc.documentType, editingName: name });
    setEditDocumentType(doc.documentType); // Pre-fill document type
    setEditDocumentName(name); // Pre-fill document name
    setShowForm(true);
  };
  
 const handleSaveEdit = () => {
  if (!editDocumentType || !editDocumentName) return; // Ensure values are valid

  // Update the document data
  setDocumentData((prevData) =>
    prevData.map((doc) => {
      if (doc.documentType === editingDoc.documentType) {
        // Update the document name if it matches the documentType
        return {
          ...doc,
          documentNames: doc.documentNames.map((name) =>
            name === editingDoc.editingName ? editDocumentName : name
          ),
        };
      }
      return doc;
    })
  );

  // Reset the editing state
  setShowForm(false);
  setEditingDoc(null);
  setEditDocumentType('');
  setEditDocumentName('');
};
  
const handleCancelEdit = () => {
  setShowForm(false); 
  setEditingDoc(null); 
  setEditDocumentType('');
  setEditDocumentName('');
};
  // const handleAddDocument = () => {
  //   const newDocument = prompt("Enter the new document name:");
  //   if (newDocument) {
  //     setCustomDocuments((prev) => [...prev, newDocument]);
  //   }
  // };
  return (
    <div className="w-full p-4">
      {next == 1 && (
        <div>
          <div className="flex justify-start items-center overflow-hidden  sticky top-0 z-10 ">
            {/* <div
              onClick={goBack}
              className="hover:cursor-pointer hover:text-blue-600  w-12 -mt-4"
            >
              {" "}
              <CircleArrowLeft className="w-8 h-8" />
            </div> */}
            <h1 className="text-xl font-bold mb-4"> Edit Checklist</h1>
            {/* <div className="flex justify-end"></div> */}
          </div>
          <div className="overflow-auto max-h-[500px]">
            <div className="mb-4 text-md  bg-gray-200 border rounded-lg overflow-x-auto">
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
                        {/* value={teams.name}
                      onChange={(e) => handleInputChange("name", e.target.value)} */}
                        <SelectTrigger>
                          <SelectValue placeholder="South Africa" />
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
                        onValueChange={(value) =>
                          handleChange("clientType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="trust">Trust</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* <div className="mt-4">
                  <Label htmlFor="doc" className="text-md required">
                    Select Applicable Document Types
                  </Label>
                  <div className="grid grid-cols-3 mt-2̦ gap-4">
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
                </div> */}
                   {showForm && (
        <form className="space-y-4 overflow-auto max-h-[585px] -ml-4">
          <Card className="bg-gray-200">
            <CardContent>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 required">Edit Document Type and Name</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="documentType" className="text-md font-semibold">Document Type:</Label>
                  <Input
                    id="documentType"
                    value={editDocumentType}
                    onChange={(e) => setEditDocumentType(e.target.value)}
                    className="w-64"
                  />
                </div>

                <div className="flex items-center space-x-4 mt-4">
                  <Label htmlFor="documentName" className="text-md font-semibold">Document Name:</Label>
                  <Input
                    id="documentName"
                    value={editDocumentName}
                    onChange={(e) => setEditDocumentName(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <button type="button" onClick={handleCancelEdit} className="mr-3 text-gray-500">
                  Cancel
                </button>
                <button type="button" onClick={handleSaveEdit} className="ml-3 bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}

      {/* Table to display added documents */}
      {documentData.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-4">Added Documents</h2>
          <table className="w-full border-collapse table-auto shadow-md bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Document Type</th>
                <th className="border px-4 py-2 text-left">Document Names</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documentData.map((doc, index) => (
                <tr key={index} className="border-b">
                  <td className="border px-4 py-2">{doc.documentType}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {doc.documentNames.map((name, i) => (
                        <li key={i} className="flex justify-between items-center">
                          {editingDoc && editingDoc.documentType === doc.documentType && editingDoc.editingName === name ? (
                            <div className="flex">
                              <Input
                                value={editDocumentType}
                                onChange={(e) => setEditDocumentType(e.target.value)}
                                className="w-48"
                              />
                              <Input
                                value={editDocumentName}
                                onChange={(e) => setEditDocumentName(e.target.value)}
                                className="w-48 ml-2"
                              />
                            </div>
                          ) : (
                            <span>{name}</span>
                          )}
                          <button
                            onClick={() => handleEdit(doc, name)}
                            className="ml-2 text-blue-500"
                          >
                            Edit
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
          onClick={() => {
            setDocumentData((prevData) =>
              prevData.filter((item) => item.documentType !== doc.documentType)
            );
          }}
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
        </RButton>
      </td>
    </tr>
  ))}
</tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="flex justify-end">
            <RButton variant="outline" onClick={goBack}>
                    Back
                  </RButton>

            <RButton className="ml-5" onClick={() => navigate("/documentsList")} type="submit">
                Update Checklist
              </RButton>
          </div> */}
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
              Update Checklist
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
                <div className="overflow-hidden  sticky top-0 z-10">
                  <h1 className="text-2xl font-bold mb-4">
                    {" "}
                    Required Documents
                  </h1>
                </div>
                <div className="mb-4 text-md p-4 bg-gray-200 border rounded-lg overflow-x-auto">
                  {/* <Label htmlFor="doc" className="text-lg font-bold">
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
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
            >
              <div className="flex justify-end">
                <RButton variant="outline" onClick={goBack}>
                  Back
                </RButton>
              </div>
              <div className="flex justify-end">
                <RButton
                  onClick={() => navigate("/documentsList")}
                  type="submit"
                >
                  Update Checklist
                </RButton>
              </div>
            </div>
          </div>
        </div>
      )}
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
