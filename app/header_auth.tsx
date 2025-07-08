// header_auth.tsx
"use client";
import NavLink from "@/components/common/nav-link";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function HeaderAuth() {
  return (
    <>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>
      <SignedIn>
        <NavLink href="/upload">Upload a pdf</NavLink>
        <UserButton />
      </SignedIn>
      {/* <SignedOut> */}
      <Link href="/sign-in" className="font-medium hover:underline">
        Sign in
      </Link>
      {/* </SignedOut> */}
    </>
  );
}
