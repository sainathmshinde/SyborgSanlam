import {
  CircleUser,
  LogOut,
  Menu,
  Package,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import RButton from "../ui/rButton";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const maintenance = [
  // { name: "Entity Type", path: "/entityType", id: "entityType" },
  { name: "Customer Type", path: "/clientType", id: "clientType" },
  // { name: "Fund Type", path: "/fundType", id: "fundType" },
  // {
  //   name: "Compliance checklist document types",
  //   path: "/documentsList",
  //   id: "documentsList",
  // },
  { name: "Country", path: "/country", id: "country" },
  { name: "Currency", path: "/currency", id: "currency" },
  { name: "Entity Type", path: "/entityType", id: "entityType" },
  { name: "Fund Type", path: "/fundType", id: "fundType" },
];

export default function AppLayout({ children }) {
  const type = children.props.type;
  const navigate = useNavigate();

  const [metadata, setMetadata] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    let route = path.split("/")[1];
    setActiveItem(route);
    return () => {};
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };
  const handleNavigate = (path, item) => (e) => {
    setActiveItem(item);
    navigate(path);
  };

  const toggleMetadata = () => setMetadata(!metadata);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[200px_1fr]">
      <div className="hidden   md:block ">
        <div className="hidden md:block fixed top-4 left-0 h-full w-[220px] lg:w-[200px] bg-slate-100">
          <div className="flex h-20 items-center  px-4  lg:px-6"></div>
          {type === "admin" ? (
            <div className={cn("flex-1")}>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div
                  className={cn(
                    activeItem === "roles" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/roles", "roles")}
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg  width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1409 2.10458C16.9962 1.48045 16.6358 0.927455 16.1231 0.543192C15.6105 0.15893 14.9786 -0.0319056 14.3389 0.00436093C13.6993 0.0406275 13.093 0.301665 12.6271 0.741411C12.1611 1.18116 11.8655 1.77135 11.7923 2.40783C11.7192 3.04432 11.8732 3.68619 12.2272 4.22019C12.5812 4.75418 13.1124 5.14598 13.7272 5.32643C14.3419 5.50689 15.0006 5.46441 15.5871 5.20649C16.1736 4.94857 16.6501 4.49179 16.9326 3.91675C18.6522 4.30833 20.2508 5.11236 21.5904 6.25948C22.93 7.40659 23.9705 8.86237 24.6221 10.5012L26.2801 9.84924C25.5126 7.90537 24.2767 6.18124 22.6823 4.83011C21.0879 3.47899 19.1843 2.54274 17.1409 2.10458ZM14.5048 3.63465C14.3834 3.63855 14.2625 3.61801 14.1492 3.57425C14.036 3.53049 13.9326 3.46441 13.8454 3.37993C13.7582 3.29545 13.6888 3.1943 13.6414 3.08248C13.5941 2.97067 13.5696 2.85047 13.5696 2.72903C13.5696 2.6076 13.5941 2.4874 13.6414 2.37558C13.6888 2.26377 13.7582 2.16261 13.8454 2.07813C13.9326 1.99365 14.036 1.92757 14.1492 1.88382C14.2625 1.84006 14.3834 1.81952 14.5048 1.82342C14.7451 1.82342 14.9756 1.91888 15.1455 2.0888C15.3154 2.25873 15.4109 2.48919 15.4109 2.7295C15.4109 2.96981 15.3154 3.20027 15.1455 3.3702C14.9756 3.54012 14.7451 3.63465 14.5048 3.63465ZM10.519 4.38753L9.84924 2.73043C7.90537 3.49794 6.18124 4.73384 4.83011 6.32827C3.47899 7.92269 2.54274 9.82625 2.10458 11.8697C1.48045 12.0143 0.927455 12.3748 0.543192 12.8874C0.15893 13.4001 -0.0319056 14.032 0.00436093 14.6716C0.0406275 15.3113 0.301665 15.9176 0.741411 16.3835C1.18116 16.8494 1.77135 17.1451 2.40783 17.2182C3.04432 17.2914 3.68619 17.1374 4.22019 16.7834C4.75418 16.4294 5.14598 15.8982 5.32644 15.2834C5.50689 14.6687 5.46441 14.01 5.20649 13.4235C4.94857 12.837 4.49179 12.3605 3.91675 12.078C4.30995 10.3563 5.11659 8.75635 6.26694 7.4164C7.41728 6.07645 8.8767 5.03686 10.519 4.38753ZM2.72857 15.4118C2.60958 15.4118 2.49175 15.3884 2.38182 15.3429C2.27189 15.2973 2.17201 15.2306 2.08787 15.1464C2.00373 15.0623 1.93699 14.9624 1.89146 14.8525C1.84592 14.7426 1.82248 14.6247 1.82248 14.5058C1.82248 14.3868 1.84592 14.2689 1.89146 14.159C1.93699 14.0491 2.00373 13.9492 2.08787 13.8651C2.17201 13.7809 2.27189 13.7142 2.38182 13.6686C2.49175 13.6231 2.60958 13.5997 2.72857 13.5997C2.96887 13.5997 3.19934 13.6951 3.36926 13.8651C3.53918 14.035 3.63465 14.2654 3.63465 14.5058C3.63465 14.7461 3.53918 14.9765 3.36926 15.1464C3.19934 15.3164 2.96887 15.4118 2.72857 15.4118ZM14.5048 23.5638C13.9995 23.5654 13.5046 23.7079 13.0758 23.9752C12.6469 24.2425 12.3011 24.624 12.0771 25.077C10.3572 24.6855 8.75835 23.8814 7.41854 22.7341C6.07873 21.5868 5.03816 20.1307 4.3866 18.4916L2.7295 19.1613C3.49951 21.1085 4.73955 22.8348 6.33898 24.1861C7.9384 25.5375 9.84748 26.4719 11.8959 26.906C12.0135 27.4047 12.2697 27.86 12.635 28.2193C13.0002 28.5787 13.4596 28.8275 13.9601 28.9371C14.4606 29.0467 14.9819 29.0126 15.4639 28.8387C15.9459 28.6648 16.3689 28.3583 16.6842 27.9544C16.9995 27.5505 17.1942 27.0657 17.2458 26.5559C17.2975 26.0461 17.2041 25.5322 16.9763 25.0732C16.7485 24.6142 16.3956 24.229 15.9583 23.962C15.521 23.6949 15.0172 23.5569 14.5048 23.5638ZM14.5048 27.1872C14.2645 27.1872 14.034 27.0917 13.8641 26.9218C13.6942 26.7518 13.5987 26.5214 13.5987 26.2811C13.5987 26.0408 13.6942 25.8103 13.8641 25.6404C14.034 25.4705 14.2645 25.375 14.5048 25.375C14.7451 25.375 14.9756 25.4705 15.1455 25.6404C15.3154 25.8103 15.4109 26.0408 15.4109 26.2811C15.4109 26.5214 15.3154 26.7518 15.1455 26.9218C14.9756 27.0917 14.7451 27.1872 14.5048 27.1872ZM28.9974 14.5048C28.9991 14.0198 28.871 13.5432 28.6263 13.1244C28.3817 12.7056 28.0295 12.3599 27.6062 12.1232C27.1829 11.8864 26.704 11.7672 26.2191 11.778C25.7342 11.7887 25.261 11.929 24.8486 12.1842C24.4362 12.4395 24.0996 12.8004 23.8737 13.2296C23.6479 13.6588 23.541 14.1406 23.5641 14.6251C23.5872 15.1095 23.7395 15.579 24.0052 15.9847C24.2709 16.3905 24.6403 16.7177 25.0751 16.9326C24.6835 18.6523 23.8793 20.2509 22.732 21.5906C21.5847 22.9302 20.1288 23.9706 18.4897 24.6221L19.1604 26.2801C21.1076 25.5101 22.8338 24.2701 24.1852 22.6707C25.5365 21.0712 26.4709 19.1622 26.9051 17.1138C27.4947 16.9743 28.0209 16.6418 28.4 16.1692C28.7791 15.6965 28.9894 15.1107 28.9974 14.5048ZM26.2792 15.4109C26.0389 15.4109 25.8084 15.3154 25.6385 15.1455C25.4686 14.9756 25.3731 14.7451 25.3731 14.5048C25.3731 14.2645 25.4686 14.034 25.6385 13.8641C25.8084 13.6942 26.0389 13.5987 26.2792 13.5987C26.5195 13.5987 26.75 13.6942 26.9199 13.8641C27.0898 14.034 27.1853 14.2645 27.1853 14.5048C27.1853 14.7451 27.0898 14.9756 26.9199 15.1455C26.75 15.3154 26.5195 15.4109 26.2792 15.4109Z" fill="url(#paint0_linear_2346_84)"/>
<path d="M17.0309 14.3779C17.5463 13.8747 17.8999 13.2293 18.0467 12.5242C18.1936 11.8191 18.1269 11.0862 17.8552 10.4191C17.5836 9.75209 17.1193 9.18114 16.5216 8.7792C15.9239 8.37727 15.22 8.1626 14.4997 8.1626C13.7795 8.1626 13.0756 8.37727 12.4779 8.7792C11.8802 9.18114 11.4159 9.75209 11.1443 10.4191C10.8726 11.0862 10.8059 11.8191 10.9527 12.5242C11.0996 13.2293 11.4532 13.8747 11.9685 14.3779C11.3553 14.7924 10.8529 15.3509 10.5055 16.0045C10.158 16.6581 9.97598 17.3869 9.97534 18.1271V19.9381H19.0326V18.1261C19.031 17.3852 18.8477 16.6559 18.4987 16.0023C18.1497 15.3486 17.6458 14.7915 17.0309 14.3779ZM12.6924 11.786C12.6924 11.548 12.7393 11.3124 12.8303 11.0926C12.9214 10.8727 13.0549 10.673 13.2231 10.5047C13.3914 10.3365 13.5912 10.203 13.811 10.1119C14.0308 10.0209 14.2665 9.97399 14.5044 9.97399C14.7424 9.97399 14.978 10.0209 15.1978 10.1119C15.4177 10.203 15.6174 10.3365 15.7857 10.5047C15.954 10.673 16.0874 10.8727 16.1785 11.0926C16.2696 11.3124 16.3164 11.548 16.3164 11.786C16.3164 12.2666 16.1255 12.7275 15.7857 13.0673C15.4459 13.4071 14.985 13.598 14.5044 13.598C14.0238 13.598 13.563 13.4071 13.2231 13.0673C12.8833 12.7275 12.6924 12.2666 12.6924 11.786ZM11.7864 18.1261C11.7797 17.765 11.8451 17.4062 11.9786 17.0706C12.1122 16.7351 12.3113 16.4295 12.5643 16.1717C12.8173 15.914 13.1192 15.7093 13.4522 15.5695C13.7852 15.4297 14.1428 15.3577 14.504 15.3577C14.8651 15.3577 15.2227 15.4297 15.5557 15.5695C15.8887 15.7093 16.1906 15.914 16.4436 16.1717C16.6966 16.4295 16.8957 16.7351 17.0293 17.0706C17.1628 17.4062 17.2282 17.765 17.2215 18.1261H11.7864Z" fill="url(#paint1_linear_2346_84)"/>
<defs>
<linearGradient id="paint0_linear_2346_84" x1="14.4987" y1="0" x2="14.4987" y2="29" gradientUnits="userSpaceOnUse">
<stop offset="0.62" stop-color="#2E3748"/>
<stop offset="1" stop-color="#6F85AE"/>
</linearGradient>
<linearGradient id="paint1_linear_2346_84" x1="14.5039" y1="8.1626" x2="14.5039" y2="19.9381" gradientUnits="userSpaceOnUse">
<stop offset="0.62" stop-color="#2E3748"/>
<stop offset="1" stop-color="#6F85AE"/>
</linearGradient>
</defs>
</svg>
                  Roles
                </div>
                {/* <div
                  className={cn(
                    activeItem === "teams" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/teams", "teams")}
                >
                  <Package className="h-4 w-4" />
                  Teams
                </div> */}
                <div
                  className={cn(
                    activeItem === "users" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/users", "users")}
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7778 19.9998V17.8887C15.7778 16.7689 15.3329 15.695 14.5411 14.9032C13.7493 14.1113 12.6754 13.6665 11.5556 13.6665H5.22222C4.10242 13.6665 3.02848 14.1113 2.23666 14.9032C1.44484 15.695 1 16.7689 1 17.8887V19.9998" stroke="#2E3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.38897 9.44444C10.7208 9.44444 12.6112 7.55409 12.6112 5.22222C12.6112 2.89035 10.7208 1 8.38897 1C6.0571 1 4.16675 2.89035 4.16675 5.22222C4.16675 7.55409 6.0571 9.44444 8.38897 9.44444Z" stroke="#2E3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.1112 20V17.8889C22.1105 16.9534 21.7991 16.0446 21.2259 15.3052C20.6528 14.5658 19.8503 14.0377 18.9445 13.8039M15.7778 1.13721C16.686 1.36975 17.491 1.89795 18.0659 2.63853C18.6408 3.37912 18.9528 4.28997 18.9528 5.22748C18.9528 6.165 18.6408 7.07585 18.0659 7.81643C17.491 8.55702 16.686 9.08522 15.7778 9.31776" stroke="#2E3748" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  Users
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
                  onClick={toggleMetadata} // Handles toggling metadata
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9595 24H10.7405C6.1497 24 3.85315 24 2.426 22.6522C1 21.3055 1 19.1366 1 14.8V10.2C1 5.86335 1 3.69445 2.426 2.3478C3.85315 1 6.1497 1 10.7405 1H11.9595C16.5515 1 18.8469 1 20.274 2.3478C21.7 3.69445 21.7 5.86335 21.7 10.2V10.775M6.75 6.75H15.95M6.75 12.5H12.5" stroke="#2E3748" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.4 23.9999V22.521C18.7749 22.5254 18.1581 22.378 17.6025 22.0916C17.0468 21.8052 16.569 21.3882 16.2099 20.8765M19.4 22.5199C20.0252 22.5242 20.642 22.3769 21.1976 22.0905C21.7532 21.804 22.2311 21.3871 22.5901 20.8754M19.4 15.1277C20.7306 15.1277 21.9024 15.7809 22.5901 16.7722C23.0091 17.3738 23.2338 18.0906 23.2338 18.8238C23.2338 19.5569 23.0091 20.2725 22.5901 20.8742L24 21.7804M16.2099 16.7745C16.569 16.2627 17.0468 15.8458 17.6025 15.5593C18.1581 15.2729 18.7749 15.1256 19.4 15.13V13.6499M24 15.8683L22.5901 16.7745M14.8 21.7804L16.2099 20.8742C15.7909 20.2725 15.5663 19.5569 15.5663 18.8238C15.5663 18.0906 15.7909 17.375 16.2099 16.7733M14.8 15.8694L16.2099 16.7756" stroke="#2E3748" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  Maintenance
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      metadata ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </div>
                {metadata && (
                  <div className="flex flex-col pl-14  gap-3 rounded-lg px-3 py-2  text-primary transition-all hover:text-primary cursor-pointer">
                    {maintenance.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          activeItem === item.id &&
                            "bg-custom-black text-white",
                          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                        )}
                        onClick={handleNavigate(item.path, item.id)}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </nav>
            </div>
          ) : null}

          {type === "client" ? (
            <div className={cn("flex-1")}>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div
                  className={cn(
                    activeItem === "" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/", "")}
                >
                  <Package className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  className={cn(
                    activeItem === "profile" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/profile", "profile")}
                >
                  <Package className="h-4 w-4" />
                  Profile
                </div>

                <div className="flex flex-col">
                  <div
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                  >
                    <Package className="h-4 w-4" />
                    <span>My Services</span>
                    {isServicesOpen ? (
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    ) : (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </div>

                  {isServicesOpen && (
                    <div className="ml-6 mt-2 flex flex-col gap-2">
                      <div
                        className={cn(
                          activeItem === "reports" &&
                            "bg-custom-black text-white",
                          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                        )}
                        onClick={handleNavigate("/reports", "reports")}
                      >
                        <FileText className="h-4 w-4" />
                        <span>Reports</span>
                      </div>

                      {/* <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer">
                        <DollarSign className="h-4 w-4" />
                        <span>Transact</span>
                      </div> */}
                    </div>
                  )}
                </div>
              </nav>
            </div>
          ) : null}

          {type === "compliance" ? (
            <div className={cn("flex-1")}>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div
                  className={cn(
                    activeItem === "complianceDashboard" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate(
                    "/complianceDashboard",
                    "complianceDashboard"
                  )}
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.27778 13.3333H8.94444C9.64722 13.3333 10.2222 12.7333 10.2222 12V1.33333C10.2222 0.6 9.64722 0 8.94444 0H1.27778C0.575 0 0 0.6 0 1.33333V12C0 12.7333 0.575 13.3333 1.27778 13.3333ZM1.27778 24H8.94444C9.64722 24 10.2222 23.4 10.2222 22.6667V17.3333C10.2222 16.6 9.64722 16 8.94444 16H1.27778C0.575 16 0 16.6 0 17.3333V22.6667C0 23.4 0.575 24 1.27778 24ZM14.0556 24H21.7222C22.425 24 23 23.4 23 22.6667V12C23 11.2667 22.425 10.6667 21.7222 10.6667H14.0556C13.3528 10.6667 12.7778 11.2667 12.7778 12V22.6667C12.7778 23.4 13.3528 24 14.0556 24ZM12.7778 1.33333V6.66667C12.7778 7.4 13.3528 8 14.0556 8H21.7222C22.425 8 23 7.4 23 6.66667V1.33333C23 0.6 22.425 0 21.7222 0H14.0556C13.3528 0 12.7778 0.6 12.7778 1.33333Z" fill="#F5F5F5"/>
</svg>


                  Dashboard
                </div>
                <div
                  className={cn(
                    activeItem === "compliance" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/compliance", "compliance")}
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 3H19V23H1V3H6M6 14L9 17L15 11M6 6H14V1H6V6Z" stroke="#2E3748" stroke-width="2"/>
</svg>

                  Compliance
                </div>
                <div
                  className={cn(
                    activeItem === "documentsList" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/documentsList", "documentsList")}
                >
                  {/* <Package className="h-4 w-4" /> */}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.464 1.464C0 2.93 0 5.286 0 10C0 14.714 0 17.071 1.464 18.535C2.93 20 5.286 20 10 20C14.714 20 17.071 20 18.535 18.535C20 17.072 20 14.714 20 10C20 5.286 20 2.929 18.535 1.464C17.072 0 14.714 0 10 0C5.286 0 2.929 0 1.464 1.464ZM8.544 5.517C8.61189 5.44563 8.66506 5.36158 8.70048 5.26966C8.73589 5.17773 8.75285 5.07974 8.75039 4.98126C8.74793 4.88279 8.72609 4.78576 8.68613 4.69572C8.64618 4.60568 8.58887 4.52439 8.5175 4.4565C8.44613 4.38861 8.36208 4.33544 8.27016 4.30002C8.17824 4.26461 8.08024 4.24765 7.98176 4.25011C7.88329 4.25257 7.78626 4.27441 7.69622 4.31437C7.60618 4.35432 7.52489 4.41163 7.457 4.483L5.143 6.913L4.543 6.283C4.47584 6.20878 4.39451 6.14876 4.30379 6.10646C4.21307 6.06417 4.1148 6.04046 4.01478 6.03674C3.91476 6.03302 3.815 6.04935 3.72139 6.08478C3.62778 6.12022 3.5422 6.17403 3.46971 6.24305C3.39722 6.31207 3.33928 6.3949 3.2993 6.48666C3.25932 6.57842 3.23812 6.67726 3.23693 6.77734C3.23575 6.87743 3.25461 6.97674 3.2924 7.06942C3.3302 7.1621 3.38616 7.24628 3.457 7.317L4.6 8.517C4.67005 8.59052 4.75429 8.64905 4.84763 8.68904C4.94097 8.72903 5.04146 8.74965 5.143 8.74965C5.24455 8.74965 5.34503 8.72903 5.43837 8.68904C5.53171 8.64905 5.61595 8.59052 5.686 8.517L8.544 5.517ZM11 6.25C10.8011 6.25 10.6103 6.32902 10.4697 6.46967C10.329 6.61032 10.25 6.80109 10.25 7C10.25 7.19891 10.329 7.38968 10.4697 7.53033C10.6103 7.67098 10.8011 7.75 11 7.75H16C16.1989 7.75 16.3897 7.67098 16.5303 7.53033C16.671 7.38968 16.75 7.19891 16.75 7C16.75 6.80109 16.671 6.61032 16.5303 6.46967C16.3897 6.32902 16.1989 6.25 16 6.25H11ZM8.543 12.517C8.61384 12.4463 8.6698 12.3621 8.7076 12.2694C8.74539 12.1767 8.76425 12.0774 8.76307 11.9773C8.76188 11.8773 8.74068 11.7784 8.7007 11.6867C8.66072 11.5949 8.60278 11.5121 8.53029 11.443C8.4578 11.374 8.37222 11.3202 8.27861 11.2848C8.185 11.2494 8.08524 11.233 7.98522 11.2367C7.8852 11.2405 7.78693 11.2642 7.69621 11.3065C7.60549 11.3488 7.52416 11.4088 7.457 11.483L5.143 13.913L4.543 13.283C4.47584 13.2088 4.39451 13.1488 4.30379 13.1065C4.21307 13.0642 4.1148 13.0405 4.01478 13.0367C3.91476 13.033 3.815 13.0494 3.72139 13.0848C3.62778 13.1202 3.5422 13.174 3.46971 13.243C3.39722 13.3121 3.33928 13.3949 3.2993 13.4867C3.25932 13.5784 3.23812 13.6773 3.23693 13.7773C3.23575 13.8774 3.25461 13.9767 3.2924 14.0694C3.3302 14.1621 3.38616 14.2463 3.457 14.317L4.6 15.517C4.67005 15.5905 4.75429 15.649 4.84763 15.689C4.94097 15.729 5.04146 15.7497 5.143 15.7497C5.24455 15.7497 5.34503 15.729 5.43837 15.689C5.53171 15.649 5.61595 15.5905 5.686 15.517L8.543 12.517ZM11 13.25C10.8011 13.25 10.6103 13.329 10.4697 13.4697C10.329 13.6103 10.25 13.8011 10.25 14C10.25 14.1989 10.329 14.3897 10.4697 14.5303C10.6103 14.671 10.8011 14.75 11 14.75H16C16.1989 14.75 16.3897 14.671 16.5303 14.5303C16.671 14.3897 16.75 14.1989 16.75 14C16.75 13.8011 16.671 13.6103 16.5303 13.4697C16.3897 13.329 16.1989 13.25 16 13.25H11Z" fill="#2E3748"/>
</svg>

                  Manage Checklist
                </div>
              </nav>
            </div>
          ) : null}

          {type === "onboarding" ? (
            <div className={cn("flex-1")}>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div
                  className={cn(
                    activeItem === "onboardingdashboard" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate(
                    "/onboardingdashboard",
                    "onboardingdashboard"
                  )}
                >
                  <Package className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  className={cn(
                    activeItem === "onboardinglist" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/onboardinglist", "onboardinglist")}
                >
                  <Package className="h-4 w-4" />
                  Customer Onboarding
                </div>
              </nav>
            </div>
          ) : null}

          {type === "sales" ? (
            <div className={cn("flex-1")}>
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <div
                  className={cn(
                    activeItem === "salesdashboard" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/salesdashboard", "salesdashboard")}
                >
                  <Package className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  className={cn(
                    activeItem === "leadManagement" &&
                      "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/leadManagement", "leadManagement")}
                >
                  <Package className="h-4 w-4" />
                  Lead Management
                </div>

                {/* <div
                  className={cn(
                    activeItem === "leads" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/leads", "leads")}
                >
                  <Package className="h-4 w-4" />
                  Initiate Onboarding
                </div> */}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col">
        <header className="fixed top-0 left-0 w-full flex justify-between h-16 items-center gap-4 px-4 lg:px-6 bg-slate-100 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <RButton
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </RButton>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium overflow-auto">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Button
                    variant="link"
                    onClick={() => {
                      // navigate("/");
                    }}
                    className="m-0 p-0"
                  >
                    <img
                      src=""
                      alt="Example"
                      className="h-10 cursor-pointer "
                    />
                  </Button>
                </div>
                <hr className="my-2 border-t border-gray-200" />

                <div>
                  <div
                    className={cn(
                      activeItem === "leads" && "bg-custom-black text-white",
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                    )}
                    onClick={handleNavigate("/leads", "leads")}
                  >
                    <Package className="h-4 w-4" />
                    Leads
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex h-16 items-start flex-col py-4 mb-4 ">
            <div className="flex items-center font-semibold">
              <Button
                variant="link"
                onClick={() => {
                  // navigate("/");
                }}
                className="m-0 p-0"
              >
                <h2
                  className="font-bold text-gray-400 mx-1"
                  onClick={() => {
                    navigate("/navigator");
                  }}
                >
                  <img src="src/assets/syborg-techLogo.png" className="w-28" />
                </h2>
              </Button>
            </div>
            <div className="mt-2  font-bold text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 inline-block text-transparent bg-clip-text">
              {type === "sales" && <div>Sales</div>}{" "}
              {type === "admin" && <div>Admin</div>}
              {type === "compliance" && <div>Compliance</div>}
              {type === "onboarding" && <div>Onboarding</div>}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <script type="module" src=""></script>
            <div className="font-semibold">
              {" "}
              {type === "client" ? "Hello, Sarah" : "Hello, John"}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button onClick={handleLogout} size="sm" variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="shadow-xl flex flex-1 flex-col  overflow-y-auto p-4 lg:gap-4 lg:p-4 mt-12 ">
          <div className="max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

AppLayout.defaultProps = {
  children: <></>,
};

AppLayout.propTypes = {
  children: PropTypes.element,
};

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
