"use client";
import { Button } from "@/components/ui/button";
import Images from "../images/createpost";
import Buttom from "../_components/buttom";
import { useRouter } from "next/navigation";
import Instagram from "../_components/header";

const Page = () => {
  const router = useRouter();
  return (
    <div className="mb-[41px] mt-[55px]">
      <Instagram />
      <div className="flex ">
        <button
          className="w-[40px] h-[40px]"
          onClick={() => {
            router.push("/");
          }}
        >
          X
        </button>
        <div className="w-[130px] h-[20px] font-bold ml-[100px] mt-[10px]">
          New photo post
        </div>
      </div>
      <div className="flex-1 h-px bg-gray-200"></div>
      <div className="flex justify-center mt-[100px]">
        <div className="flex flex-col">
          <div>
            <Images />
          </div>
          <div className="flex flex-col gap-[10px]">
            <Button className="w-[147px] h-[36px]">Photo Library</Button>
            <button
              className="w-[147px] h-[36px] ml-[10px]"
              onClick={() => {
                router.push("createpostai");
              }}
            >
              Generate with AI
            </button>
          </div>
        </div>
      </div>
      <Buttom />
    </div>
  );
};
export default Page;
