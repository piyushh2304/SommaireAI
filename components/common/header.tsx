'use client';

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { MotionDiv } from "./motion-wrapper";
import { Button } from "@/components/ui/button";
import { ClientWrapper } from "./client-wrapper";
import NavLink from "./nav-link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center px-8 py-4">
          {/* Logo (left) */}
          <div className="flex-1">
            <MotionDiv whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-rose-500" />
                <span className="text-xl font-bold text-gray-900">Sommaire</span>
              </Link>
            </MotionDiv>
          </div>

          {/* Navigation (center) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <ClientWrapper>
              {!isLoaded ? null : isSignedIn && (
                <>
                  <NavLink href="/dashboard" className="text-base hover:text-rose-500 transition-colors lg:text-lg">
                    Dashboard
                  </NavLink>
                  <NavLink href="/upload" className="text-base hover:text-rose-500 transition-colors lg:text-lg">
                    Upload a PDF
                  </NavLink>
                </>
              )}
            </ClientWrapper>
          </nav>

          {/* Auth Controls (right) */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <ClientWrapper fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>}>
              {!isLoaded ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex space-x-2">
                  <SignInButton>
                    <Button className="bg-rose-500 text-white hover:bg-rose-600">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignInButton>
                    <Button className="bg-rose-500 text-white hover:bg-rose-600">Get Started</Button>
                  </SignInButton>
                </div>
              )}
            </ClientWrapper>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-4">
              <ClientWrapper>
                {!isLoaded ? null : isSignedIn ? (
                  <>
                    <Link href="/dashboard" className="text-gray-700 hover:text-rose-500 transition-colors">
                      Dashboard
                    </Link>
                    {/* <Link href="/summaries" className="text-gray-700 hover:text-rose-500 transition-colors">
                      Your Summaries
                    </Link> */}
                    <Link href="/upload" className="text-gray-700 hover:text-rose-500 transition-colors">
                      Upload a PDF
                    </Link>
                    <div className="pt-4">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <SignInButton>
                       <Button className="w-full bg-rose-500 text-white hover:bg-rose-600">Sign In</Button>
                    </SignInButton>
                    <SignInButton>
                      <Button className="w-full bg-rose-500 text-white hover:bg-rose-600">Get Started</Button>
                    </SignInButton>
                  </div>
                )}
              </ClientWrapper>
            </nav>
          </MotionDiv>
        )}
      </div>
    </header>
  );
}
