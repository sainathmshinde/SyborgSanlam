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

const fundTypes = [
  { id: 1, name: "Equity" },
  { id: 2, name: "Money market" },
  { id: 4, name: "Balanced" },
  { id: 5, name: "Property" },
];

const FundType = () => {
  const navigate = useNavigate();

  const [fundType, setFundType] = useState(fundTypes);
  const [fundTypeIndex, setFundTypeIndex] = useState(0);

  const handleSearch = () => {};
  const handleDeleteFundType = () => {};

  const handleEdit = (id) => {
    navigate(`/createFundType/${id}`);
  };

  const handleNew = () => {
    navigate("/createFundType");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Fund Types</h1>
        </div>
        <div className="flex items-center justify-between mt-6 mb-6">
          <Input
            type="search"
            placeholder="Search fund type..."
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
              Create Fund Type
              <CirclePlus className="ml-2 h-4 w-4" />
            </span>
          </RButton>
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black">
            <TableRow>
              <TableHead className="text-white p-2">Id</TableHead>
              <TableHead className="text-white p-2">Fund Type</TableHead>
              <TableHead className="text-white p-2 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fundType?.length ? (
              fundType?.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="p-2">{item.id}</TableCell>

                  <TableCell className="p-2">{item.name}</TableCell>
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
                              setFundTypeIndex(item.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteFundType(fundTypeIndex)}
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

export default WithLayout("admin")(FundType);
