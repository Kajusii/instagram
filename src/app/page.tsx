"use client";
import instagram from "@/app/images/instagram.png";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import home from "@/app/images/Home.png";
import add from "@/app/images/Add.png";
import search from "@/app/images/Search.png";
import usericon from "@/app/images/user.png";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  if (!user) {
    router.push("/login");
  }
  return (
    <div>
      <div>{user?.email}</div>
      <img
        src={instagram.src}
        className="h-[34px] w-[100px] mt-[56px] ml-[16px]"
      />
      <img src={home.src} className="h-[54px] w-[81.5px] " />
      <img src={search.src} className="h-[54px] w-[81.5px] " />
      <img src={add.src} className="h-[54px] w-[81.5px] " />
      <img src={usericon.src} className="h-[54px] w-[81.5px]  " />
    </div>
  );
};
export default Page;
