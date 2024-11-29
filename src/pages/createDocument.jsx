import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import WithLayout from "@/components/layout/WithLayout";
import RButton from "@/components/ui/rButton";
import { Button } from "@/components/ui/button";
import { allDocuments } from "@/lib/documents";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";

function CreateUser() {
  const navigate = useNavigate();

  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const handleCheck = (document) => {
    setSelectedDocuments(
      (prev) =>
        prev.includes(document)
          ? prev.filter((item) => item !== document) // Remove if already selected
          : [...prev, document] // Add if not selected
    );
  };
  const isChecked = (document) => selectedDocuments.includes(document);
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold mb-2"> Create Document</h1>
        <div className="flex justify-end"></div>
      </div>
      <div className="mb-4 text-md">
        <div className="space-y-4">
          <div className="flex flex-col">
            <div className="space-y-2 w-1/2">
              <Label htmlFor="name" className="text-md">
                Document Name
              </Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="mt-4">
              <Label htmlFor="doc" className="text-md ">
                Type Of Documents
              </Label>
              <ul className="grid grid-cols-3 mt-2̦">
                {allDocuments.map((document) => (
                  <li key={document}>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked(document)}
                        onChange={() => handleCheck(document)}
                        style={{ margin: 10 }}
                      />
                      {document}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <RButton onClick={() => navigate("/documentsList")} type="submit">
          Create Document
        </RButton>
      </div>
    </div>
  );
}

export default WithLayout("admin")(CreateUser);
