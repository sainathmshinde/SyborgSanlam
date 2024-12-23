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
  { name: "Entity Type", path: "/entityType", id: "entityType" },
  { name: "Client Type", path: "/clientType", id: "clientType" },
  { name: "Fund Type", path: "/fundType", id: "fundType" },
  // {
  //   name: "Compliance checklist document types",
  //   path: "/documentsList",
  //   id: "documentsList",
  // },
  { name: "Country", path: "/country", id: "country" },
  { name: "Currency", path: "/currency", id: "currency" },
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
                  Checklist
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
                    activeItem === "contacts" && "bg-custom-black text-white",
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer"
                  )}
                  onClick={handleNavigate("/contacts", "contacts")}
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
