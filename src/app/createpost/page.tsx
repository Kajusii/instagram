import { Button } from "@/components/ui/button";
import Images from "../images/createpost";

const Page = () => {
  return (
    <div>
      <div className="flex ">
        <button className="w-[40px] h-[40px]">X</button>
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
            <a className="w-[147px] h-[36px] ml-[10px]" href="/createpostai">
              Generate with AI
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
