import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import RButton from "@/components/ui/rButton";
import RInput from "@/components/ui/rInput";
import countryData from "@/lib/country";
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

const countries = countryData;

const Country = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState(countries);
  const [countryIndex, setCountryIndex] = useState(0);

  const handleSearch = () => {};
  const handleDeleteCountry = () => {};

  const handleEdit = (id) => {
    navigate("/editCountry");
  };
  // const handleNew = () => {
  //   navigate("/createCountry");
  // };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Countries</h1>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <Input
            type="search"
            placeholder="Search Country..."
            onChange={handleSearch}
            className="w-full bg-white shadow-none appearance-none  md:w-1/2 lg:w-1/2 dark:bg-gray-950"
          />
          {/* <RButton
            onClick={() => {
              handleNew();
            }}
            className="ml-10"
          >
            <span className="flex items-center">
              Create Country
              <CirclePlus className="ml-2 h-4 w-4" />
            </span>
          </RButton> */}
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black">
            <TableRow>
              <TableHead className="text-white p-2">Id</TableHead>
              <TableHead className="text-white p-2 ">Country Name</TableHead>
              <TableHead className="text-white p-0">Country Code</TableHead>
              <TableHead className="p-2 px-8 text-white text-end">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {country?.length ? (
              country?.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="p-2">{item.id}</TableCell>

                  <TableCell className=" p-2">{item.name}</TableCell>
                  <TableCell className=" p-2">{item.code}</TableCell>
                  <TableCell className=" p-2 text-right">
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
                              setRoleIndex(item.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteCountry(countryIndex)}
                        dialogTitle="Are you sure to delete the role?"
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

export default WithLayout("admin")(Country);
