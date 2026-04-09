"use client";

import { signOut } from "@/lib/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/");
        } else {
          alert("Failed to sign out");
        }
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
