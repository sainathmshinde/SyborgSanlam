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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    navigate("/editCurrency");
  };

  const handleNew = () => {
    navigate("/createCurrency");
  };
  return (
    <div className="p-4">
      <div className="flex flex-col justify-between overflow-hidden  sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold ">Currency</h1>
        </div>
        <div className="flex items-center justify-between mt-4 mb-6">
          <Input
            type="search"
            placeholder="Search Currency ..."
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
              Create Currency
              {/* <CirclePlus className="ml-2 h-4 w-4" /> */}
            </span>
          </RButton>
        </div>
      </div>
      <div className="border rounded-lg overflow-x-auto overflow-auto max-h-[475px]">
        <Table>
          <TableHeader className="bg-custom-black hover:bg-custom-black">
            <TableRow>
              <TableHead className="text-white p-2 pr-10">Sr No.</TableHead>
              <TableHead className="text-white p-2 pr-10">Country</TableHead>
              <TableHead className="text-white p-2 pr-16">
                Currency Name
              </TableHead>
              <TableHead className="text-white p-2 pr-20">Code</TableHead>
              <TableHead className="text-white p-2">Symbol</TableHead>

              <TableHead className="p-2 px-8 text-white text-end">
                Actions
              </TableHead>
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
                        className="relative group flex items-center gap-2"
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        {/* <FilePenIcon className="h-4 w-4" /> */}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM13.7 6.35C13.92 6.14 13.92 5.79 13.7 5.58L12.42 4.3C12.3705 4.24765 12.3108 4.20595 12.2446 4.17745C12.1784 4.14895 12.1071 4.13425 12.035 4.13425C11.9629 4.13425 11.8916 4.14895 11.8254 4.17745C11.7592 4.20595 11.6995 4.24765 11.65 4.3L10.65 5.3L12.7 7.35L13.7 6.35ZM4 11.94V14H6.06L12.12 7.94L10.06 5.88L4 11.94Z"
                            fill="#4368FA"
                          />
                        </svg>

                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-white text-black text-xs px-2 py-1 rounded shadow-lg">
                          Edit
                        </div>
                      </RButton>
                      <ConfirmDialog
                        dialogTrigger={
                          <RButton
                            variant="ghost"
                            className="relative group flex items-center gap-2"
                            onClick={() => {
                              setCurrencyIndex(item.id);
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
      <div className="flex mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex justify-end"></div>
    </div>
  );
};

export default WithLayout("admin")(CurrencyPage);
