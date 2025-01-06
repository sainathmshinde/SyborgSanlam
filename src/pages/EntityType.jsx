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

const entities = [
  { id: 1, name: "Customer", description: "Their involvement or responsibilities in a project or business relationship."},
  { id: 2, name: "Broker", description: "A broker acts as an intermediary between two parties to facilitate a transaction or agreement." },
  { id: 3, name: "Bank", description:"Providing financial services to individuals, businesses, and governments." },
  { id: 4, name: "Fund", description:"It involves pooling resources from investors to achieve specific financial objectives."},
  { id: 5, name: "Company", description:"Its purpose and responsibilities in a specific context, such as in the economy, a project, or an industry. " },
  { id: 5, name: "Trust", description:"Managing and safeguarding assets on behalf of beneficiaries." },
];

const EntityType = () => {
  const navigate = useNavigate();

  const [entity, setEntity] = useState(entities);
  const [entityIndex, setEntityIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterData = entities.filter((entity) =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteEntity = () => {};

  const handleEdit = (id) => {
    navigate(`/editEntityType`);
  };

  const handleNew = () => {
    navigate("/createEntityType");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Entity Types</h1>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <Input
            type="search"
            placeholder="Search Entity Types..."
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          <RButton
            onClick={() => {
              handleNew();
            }}
            className="ml-10"
          >
            <span className="flex items-center">
              Create Entity Type
              {/* <CirclePlus className="ml-2 h-4 w-4" /> */}
            </span>
          </RButton>
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black ">
            <TableRow>
              <TableHead className="p-2 text-white">Sr No.</TableHead>
              <TableHead className="p-2 text-white">Entity Type</TableHead>
              <TableHead className="p-2 text-white">Description</TableHead>
              <TableHead className="p-2 px-8 text-white text-end">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData?.length ? (
              filterData?.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="p-2">{item.id}</TableCell>

                  <TableCell className="p-2">{item.name}</TableCell>
                  <TableCell className="p-2">{item.description}</TableCell>
                  <TableCell className="p-2 text-right">
                    <div className="flex justify-end">
                      <RButton
                        variant="ghost"
                        className="flex items-center gap-2 "
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
                              setEntityIndex(item.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteEntity(entityIndex)}
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

export default WithLayout("admin")(EntityType);
