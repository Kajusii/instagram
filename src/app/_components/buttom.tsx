import { CircleUserRound } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { House } from "lucide-react";
import { Search } from "lucide-react";
import Link from "next/link";
const Button = () => {
  return (
    <div className="fixed bottom-0 bg-white">
      <div className="border w-[430px] "></div>
      <div className="flex justify-between px-8 py-2">
        <Link href="/">
          <House className="h-[25px] w-[25px] " />
        </Link>
        <Link href="/search">
          <Search className="h-[25px] w-[25px]" />
        </Link>
        <Link href="/createpost">
          <SquarePlus className="h-[25px] w-[25px]" />
        </Link>
        <Link href="/myprofile">
          <CircleUserRound className="h-[25px] w-[25px]" />
        </Link>
      </div>
    </div>
  );
};
export default Button;
