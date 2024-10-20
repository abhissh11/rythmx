"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();
  return (
    <div className="mx-10 py-4 flex justify-between">
      <div className="">Rythmx</div>
      <div className="">
        {session.data?.user && (
          <button
            className="m-2 p-2 rounded text-white bg-blue-600"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
        {!session.data?.user && (
          <button
            className="m-2 p-2 rounded text-white bg-blue-600"
            onClick={() => signIn()}
          >
            Signin
          </button>
        )}
      </div>
    </div>
  );
}
