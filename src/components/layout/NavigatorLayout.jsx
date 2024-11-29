import { CircleUser, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import useLocationHistory from "@/lib/useLocationHistory";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export default function NavigatorLayout({ children }) {
  const navigate = useNavigate();

  // useLocationHistory();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="grid min-h-screen w-full ">
      <div>
        <div className="flex h-full max-h-screen flex-col gap-2 ">
          <div className="flex h-16 items-center  px-2 justify-between bg-slate-100 ">
            <div className="flex items-center font-semibold ">
              <Button variant="link" className="m-0 p-0">
                <h4
                  className="font-bold text-gray-400 mx-5"
                  onClick={() => {
                    navigate("/navigator");
                  }}
                >
                  <img src="src/assets/syborg-techLogo.png" className="w-28" />
                </h4>
              </Button>
            </div>
            <div className="flex items-center justify-around gap-3">
              <div className="font-semibold">Hello, John</div>
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
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="shadow-xl flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-4   ">
          <div className="max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

NavigatorLayout.defaultProps = {
  children: <></>,
};

NavigatorLayout.propTypes = {
  children: PropTypes.element,
};
