"use client";

import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <div>{user?.email}</div>
    </div>
  );
};
export default Page;
