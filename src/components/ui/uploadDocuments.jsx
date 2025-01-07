import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  CheckCircle2,
  File as FileIcon,
  FileText,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";

const documentCategories = {
  Company: [
    "VAT Registration Document",
    "Bank Statement",
    "Certificate of Incorporation",
  ],
  "Director 1": ["ID Proof", "Address Proof"],
  "Director 2": ["ID Proof", "Address Proof"],
};

export default function UploadDocuments() {
  const [selectedCategory, setSelectedCategory] = useState("Company");
  const [selectedDocument, setSelectedDocument] = useState(
    documentCategories.Company[0]
  );
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState({
    Company: [],
    "Director 1": [],
    "Director 2": [],
  });
  const fileInputRef = useRef(null);

  const handleDocumentSelect = (category, document) => {
    setSelectedCategory(category);
    setSelectedDocument(document);
    setFile(null);
    setPreview(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log(
        `Uploading ${file.name} as ${selectedDocument} for ${selectedCategory}`
      );
      setUploadedDocuments((prev) => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], selectedDocument],
      }));
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Company":
        return <Building className="h-5 w-5" />;
      case "Director 1":
      case "Director 2":
        return <User className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-90 bg-white p-4 shadow-md overflow-auto">
        <h2 className="text-xl font-bold mb-4">Documents Checklist</h2>
        <ul className="space-y-4">
          {Object.entries(documentCategories).map(([category, documents]) => (
            <li key={category}>
              <div className="flex items-center mb-2">
                {getCategoryIcon(category)}
                <span className="ml-2 font-semibold">{category}</span>
              </div>
              <ul className="pl-6 space-y-2">
                {documents.map((document) => (
                  <li key={document} className="flex items-center">
                    <Button
                      // variant={
                      //   document === selectedDocument &&
                      //   category === selectedCategory
                      //     ? "default"
                      //     : "ghost"
                      // }
                      className="w-full justify-start text-sm"
                      onClick={() => handleDocumentSelect(category, document)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {document}
                    </Button>
                    {uploadedDocuments[category].includes(document) && (
                      <CheckCircle2
                        className="h-5 w-5 text-green-500 ml-2"
                        aria-label={`${document} uploaded`}
                      />
                    )}
                  </li>
                ))}
              </ul>
              {category !== "Director 2" && <Separator className="my-2" />}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Card className="mb-6">
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold mb-4">
              Upload {selectedDocument}
            </h1>
            <p className="text-sm text-gray-500 mb-4">
              Category: {selectedCategory}
            </p>
            <div className="mb-4">
              <Label htmlFor="file-upload">Select file</Label>
              <Input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
            <div
              className=" my-5 border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center"
              style={{ minHeight: "400px" }}
            >
              {preview ? (
                file.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full max-h-[400px] object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-lg font-semibold">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.type}</p>
                  </div>
                )
              ) : (
                <p className="text-gray-500 text-center">
                  No file selected. Please upload a document to see the preview
                  here.
                </p>
              )}
            </div>
            <Button className="mr-10" onClick={handleUpload} disabled={!file}>
              <Upload className="mr-2 h-4 w-4" />
              Upload {selectedDocument}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
