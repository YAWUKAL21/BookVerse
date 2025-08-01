import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "../services/auth"; 

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const error = await signOut();
    if (!error) {
      navigate("/login"); 
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center space-x-2 text-blue-600">
        <BookOpen className="h-6 w-6" />
        <span className="text-xl font-bold tracking-tight">BookVerse</span>
      </Link>

      <nav className="hidden md:flex gap-6 text-gray-700">
        <Link
          to="/explore"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Explore
        </Link>
        <Link
          to="/favorites"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          Favorites
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium hover:text-blue-600 transition-colors"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-3">
       
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shadow-none border-none focus:ring-0">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[200px]">
              <nav className="flex flex-col mt-6">
                <Link
                  to="/explore"
                  className="px-3 py-2 mt-5 text-sm hover:bg-gray-100 transition-colors"
                >
                  Explore
                </Link>
                <Link
                  to="/favorites"
                  className="px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  Favorites
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

       
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border hover:ring-2 ring-blue-400 transition">
              <AvatarImage src="/src/assets/user.png" alt="User" />
              <AvatarFallback>BV</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className="w-full text-left p-0 text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
