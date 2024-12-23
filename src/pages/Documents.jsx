import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import RButton from "@/components/ui/rButton";
import RInput from "@/components/ui/rInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus, FilePenIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const documents = [
  {
    id: 1,
    country: "South Africa",
    clientType: "Company",
    name: "Certificate Of Incorporation",
  },
  { id: 2, country: "South Africa", clientType: "Company", name: "Id Proof" },
  {
    id: 3,
    country: "South Africa",
    clientType: "Company",
    name: "Address proof",
  },
  // { id: 4,country:"South Africa",clientType:"Company",  name: "Address Proof" },
  // { id: 5,country:"South Africa",clientType:"Company",  name: "Driver's License" },
];

const Documents = () => {
  const navigate = useNavigate();

  const [document, setDocumnet] = useState(documents);
  const [documentIndex, setDocumentIndex] = useState(0);

  const handleSearch = () => {};
  const handleDeleteDocument = () => {};

  const handleEdit = (id) => {
    navigate(`/viewChecklist`);
  };

  const handleNew = () => {
    navigate("/createDocument");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Compliance checklist</h1>
        </div>
        <div className="flex items-center justify-between mt-6 mb-6">
          <Input
            type="search"
            placeholder="Search..."
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none pl-8 md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <RButton
            onClick={() => {
              handleNew();
            }}
            className="ml-10"
          >
            <span className="flex items-center">
              Create Checklist
              <CirclePlus className="ml-2 h-4 w-4" />
            </span>
          </RButton>
        </div>
      </div>
      <div className=" rounded-lg shadow-lg">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black">
            <TableRow>
              <TableHead className="text-white p-2">Id</TableHead>
              <TableHead className="text-white p-2">Country</TableHead>
              <TableHead className="text-white p-2">Client Type</TableHead>

              <TableHead className="text-white p-2 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {document?.length ? (
              document?.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="p-2">{item.id}</TableCell>
                  {/* <TableCell className="p-2">{item.name}</TableCell> */}
                  <TableCell className="p-2">{item.country}</TableCell>
                  <TableCell className="p-2">{item.clientType}</TableCell>

                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end">
                      <RButton
                        variant="ghost"
                        className="text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setDocumentIndex(item.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteDocument(documentIndex)}
                        dialogTitle="Are you sure to delete the entity?"
                        dialogDescription="This action cannot be undone. This will permanently delete your
                                product and remove your data from our servers."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            {}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
};

export default WithLayout("compliance")(Documents);
