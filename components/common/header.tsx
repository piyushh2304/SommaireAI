import Link from "next/link";
import NavLink from "./nav-link";
import { FileText } from "lucide-react";
import PlanBadge from "./plan_badge";
import HeaderAuth from "@/app/header_auth";
import { SignedIn } from "@clerk/nextjs";


export default function Header() {

  return (
    
    <nav
      className="container flex items-center justify-between
    py-4 lg:px-8 px-2 mx-auto"
    >
    <div className="flex lg:flex-1">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg:text-xl text-gray-900">Sommaire</span>
        </NavLink>
      </div>
     <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
      </div>
       <div className="flex lg:justify-end lg:flex-1">
          <div className="flex gap-2 items-center">
            <SignedIn>
       <PlanBadge />
            </SignedIn>
           <HeaderAuth />
          
          </div>
      </div>
    </nav>
  );
}
