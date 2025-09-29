"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const role = user?.publicMetadata.role;
  console.log(user);

  const links = (
    <>
      <li>
        <Link href={"/course"}>Course</Link>
      </li>
      <li>
        <Link href={"/contact"}>Contact</Link>
      </li>
      <li>
        <Link href={"/about"}>About</Link>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link href={"/"} className="text-xl font-semibold">
          CodeTuror
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div>
        {isSignedIn ? (
          isSignedIn ? (
            <>
              {role === "user" && <Link href={"user-dashboard"}>User</Link>}
              {role === "admin" && <Link href={"admin-dashboard"}>Admin</Link>}
              {role === "educator" && (
                <Link href={"educator-dashboard"}>Educator</Link>
              )}
            </>
          ) : (
            <p>Hello</p>
          )
        ) : (
          <p>Register</p>
        )}
      </div>

      {/* auth buttons right  */}
      <div className="navbar-end">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Link className="mx-3" href={"/user-profile"}>
            Profile
          </Link>
          <SignOutButton>
            <button className="btn btn-error">Sign Out</button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
