"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  console.log(user);
  // Safe type casting for publicMetadata role
  const role = user?.publicMetadata?.role as string | undefined;

  const links = (
    <>
      <li>
        <Link href="/course">Course</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left side: Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          {/* Mobile Menu Button */}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg /* ... SVG content ... */
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* Mobile Links */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link href="/" className="text-xl font-semibold">
          CodeTutor
        </Link>
      </div>

      {/* Center: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right side: Role-Based Links and Auth Buttons */}
      <div className="navbar-end space-x-3">
        {/* Role-based dashboard links */}
        {isSignedIn && (
          <div className="flex items-center space-x-2 mr-2">
            {role === "user" && (
              <Link href="/user-dashboard" className="btn btn-ghost btn-sm">
                Dashboard
              </Link>
            )}
            {role === "admin" && (
              <Link href="/admin-dashboard" className="btn btn-ghost btn-sm">
                Admin Panel
              </Link>
            )}
            {role === "educator" && (
              <Link href="/educator-dashboard" className="btn btn-ghost btn-sm">
                Instructor Hub
              </Link>
            )}
          </div>
        )}

        {/* Signed Out State (Sign In Button) */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm">
              Sign In / Register
            </button>
          </SignInButton>
        </SignedOut>

        {/* Signed In State (User Buttons) */}
        <SignedIn>
          <Link className="btn btn-ghost btn-sm" href="/user-profile">
            Profile
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
