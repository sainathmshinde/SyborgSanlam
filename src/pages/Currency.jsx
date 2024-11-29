import WithLayout from "@/components/layout/WithLayout";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const currencies = [
  {
    id: 1,
    name: "United States Dollar",
    country: "United States",
    code: "USD",
    symbol: "$",
  },
  { id: 2, name: "Euro", country: "Eurozone", code: "EUR", symbol: "€" },
  {
    id: 3,
    name: "British Pound Sterling",
    country: "United Kingdom",
    code: "GBP",
    symbol: "£",
  },
  { id: 4, name: "Japanese Yen", country: "Japan", code: "JPY", symbol: "¥" },
  {
    id: 5,
    name: "Swiss Franc",
    country: "Switzerland",
    code: "CHF",
    symbol: "CHF",
  },
  {
    id: 6,
    name: "Canadian Dollar",
    country: "Canada",
    code: "CAD",
    symbol: "$",
  },
  {
    id: 7,
    name: "Australian Dollar",
    country: "Australia",
    code: "AUD",
    symbol: "$",
  },
  {
    id: 8,
    name: "New Zealand Dollar",
    country: "New Zealand",
    code: "NZD",
    symbol: "$",
  },
  { id: 9, name: "Chinese Yuan", country: "China", code: "CNY", symbol: "¥" },
  { id: 10, name: "Indian Rupee", country: "India", code: "INR", symbol: "₹" },
  {
    id: 11,
    name: "Russian Ruble",
    country: "Russia",
    code: "RUB",
    symbol: "₽",
  },
  {
    id: 12,
    name: "Brazilian Real",
    country: "Brazil",
    code: "BRL",
    symbol: "R$",
  },
  {
    id: 13,
    name: "South African Rand",
    country: "South Africa",
    code: "ZAR",
    symbol: "R",
  },
  { id: 14, name: "Mexican Peso", country: "Mexico", code: "MXN", symbol: "$" },
  {
    id: 15,
    name: "Singapore Dollar",
    country: "Singapore",
    code: "SGD",
    symbol: "$",
  },
  {
    id: 16,
    name: "Hong Kong Dollar",
    country: "Hong Kong",
    code: "HKD",
    symbol: "$",
  },
  {
    id: 17,
    name: "Norwegian Krone",
    country: "Norway",
    code: "NOK",
    symbol: "kr",
  },
  {
    id: 18,
    name: "Swedish Krona",
    country: "Sweden",
    code: "SEK",
    symbol: "kr",
  },
  {
    id: 19,
    name: "Danish Krone",
    country: "Denmark",
    code: "DKK",
    symbol: "kr",
  },
  { id: 20, name: "Turkish Lira", country: "Turkey", code: "TRY", symbol: "₺" },
  {
    id: 21,
    name: "South Korean Won",
    country: "South Korea",
    code: "KRW",
    symbol: "₩",
  },
  {
    id: 22,
    name: "Indonesian Rupiah",
    country: "Indonesia",
    code: "IDR",
    symbol: "Rp",
  },
  { id: 23, name: "Thai Baht", country: "Thailand", code: "THB", symbol: "฿" },
  {
    id: 24,
    name: "Philippine Peso",
    country: "Philippines",
    code: "PHP",
    symbol: "₱",
  },
  {
    id: 25,
    name: "Malaysian Ringgit",
    country: "Malaysia",
    code: "MYR",
    symbol: "RM",
  },
  {
    id: 26,
    name: "United Arab Emirates Dirham",
    country: "United Arab Emirates",
    code: "AED",
    symbol: "د.إ",
  },
  {
    id: 27,
    name: "Saudi Riyal",
    country: "Saudi Arabia",
    code: "SAR",
    symbol: "﷼",
  },
  {
    id: 28,
    name: "Kuwaiti Dinar",
    country: "Kuwait",
    code: "KWD",
    symbol: "د.ك",
  },
  {
    id: 29,
    name: "Israeli New Shekel",
    country: "Israel",
    code: "ILS",
    symbol: "₪",
  },
  {
    id: 30,
    name: "Egyptian Pound",
    country: "Egypt",
    code: "EGP",
    symbol: "£",
  },
];

const CurrencyPage = () => {
  const navigate = useNavigate();

  const [currency, setCurrency] = useState(currencies);
  const [currencyIndex, setCurrencyIndex] = useState(0);

  const handleSearch = () => {};
  const handleDeleteCurrency = () => {};

  const handleEdit = (id) => {
    navigate(`/createCurrency/${id}`);
  };

  const handleNew = () => {
    navigate("/createCurrency");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold ">Currency</h1>
        </div>
        <div className="flex items-center justify-between mt-6 mb-6">
          <Input
            type="search"
            placeholder="Search currency ..."
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
              Create Currency
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
              <TableHead className="text-white p-2">Currency Name</TableHead>
              <TableHead className="text-white p-2">Code</TableHead>
              <TableHead className="text-white p-2">Symbol</TableHead>

              <TableHead className="p-2 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currency?.length ? (
              currency?.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="p-2">{item.id}</TableCell>
                  <TableCell className="p-2">{item.country}</TableCell>
                  <TableCell className="p-2">{item.name}</TableCell>
                  <TableCell className="p-2">{item.code}</TableCell>
                  <TableCell className="p-2">{item.symbol}</TableCell>

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
                              setCurrencyIndex(item.id);
                            }}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </RButton>
                        }
                        onConfirm={() => handleDeleteCurrency(currencyIndex)}
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

export default WithLayout("admin")(CurrencyPage);
