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
                  <Package className="h-4 w-4" />
                  Roles
                </div>
                <div
                  className={cn(
                    activeItem === "teams" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/teams", "teams")}
                >
                  <Package className="h-4 w-4" />
                  Teams
                </div>
                <div
                  className={cn(
                    activeItem === "users" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/users", "users")}
                >
                  <Package className="h-4 w-4" />
                  Users
                </div>

                <div
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer"
                  onClick={toggleMetadata} // Handles toggling metadata
                >
                  <Package className="h-4 w-4" />
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
                  <Package className="h-4 w-4" />
                  Dashboard
                </div>
                <div
                  className={cn(
                    activeItem === "compliance" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/compliance", "compliance")}
                >
                  <Package className="h-4 w-4" />
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
                  <Package className="h-4 w-4" />
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
                  {/* <svg
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.27778 13.3333H8.94444C9.64722 13.3333 10.2222 12.7333 10.2222 12V1.33333C10.2222 0.6 9.64722 0 8.94444 0H1.27778C0.575 0 0 0.6 0 1.33333V12C0 12.7333 0.575 13.3333 1.27778 13.3333ZM1.27778 24H8.94444C9.64722 24 10.2222 23.4 10.2222 22.6667V17.3333C10.2222 16.6 9.64722 16 8.94444 16H1.27778C0.575 16 0 16.6 0 17.3333V22.6667C0 23.4 0.575 24 1.27778 24ZM14.0556 24H21.7222C22.425 24 23 23.4 23 22.6667V12C23 11.2667 22.425 10.6667 21.7222 10.6667H14.0556C13.3528 10.6667 12.7778 11.2667 12.7778 12V22.6667C12.7778 23.4 13.3528 24 14.0556 24ZM12.7778 1.33333V6.66667C12.7778 7.4 13.3528 8 14.0556 8H21.7222C22.425 8 23 7.4 23 6.66667V1.33333C23 0.6 22.425 0 21.7222 0H14.0556C13.3528 0 12.7778 0.6 12.7778 1.33333Z"
                      fill="#F5F5F5"
                    />
                  </svg> */}
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
