"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Ig from "@/app/images/igLogo.png";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/provider/AuthProvider";
import { toast } from "sonner";
const Page = () => {
  const { token, setToken } = useUser();
  const router = useRouter();
  const [InputValues, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const signup = async () => {
    const data = await fetch("http://localhost:5555/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: InputValues.email,
        password: InputValues.password,
        username: InputValues.username,
      }),
    });
    if (window.location !== undefined) {
      if (data.ok) {
        const newUser = await data.json();
        localStorage.setItem("token", newUser);
        setToken(newUser);
        router.push("/");
        toast.success("Sign up successful");
      } else {
        toast.error("this email already existed");
      }
    }
  };
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setInputValue({ ...InputValues, email: value });
    }
    if (name === "password") {
      setInputValue({ ...InputValues, password: value });
    }
    if (name === "username") {
      setInputValue({ ...InputValues, username: value });
    }
  };
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
  return (
    <div className="flex flex-col gap-[64px] pt-[200px] pr-[80px] pb-[200px] pl-[80px] w-[430px] h-[932px]">
      <div className="flex flex-col gap-[24px]">
        <img src={Ig.src} className="h-[48px] w-[48px] ml-[100px]" />
        <div className="w-[310px] h-[40px] flow-horizontal  text-[#898484fe]">
          Sign up to see photos and videos from your friends
        </div>
      </div>
      <div className="flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[4px]">
            {" "}
            <Input
              className="w-[270px] h-[40px] border-[1px] rounded-md pt-[8px] pr-[12px] pb-[8px] pl-[12px] bg-[#F4F4F5CC]"
              onChange={(e) => {
                handleValue(e);
              }}
              name="email"
              placeholder="Email"
            />
            <Input
              className="w-[270px] h-[40px] border-[1px] rounded-md pt-[8px] pr-[12px] pb-[8px] pl-[12px] bg-[#F4F4F5CC]"
              name="password"
              onChange={(e) => {
                handleValue(e);
              }}
              placeholder="Password"
              type="password"
            />
            <Input
              className="w-[270px] h-[40px] border-[1px] rounded-md pt-[8px] pr-[12px] pb-[8px] pl-[12px] bg-[#F4F4F5CC]"
              name="username"
              onChange={(e) => {
                handleValue(e);
              }}
              placeholder="Username"
            />
          </div>
          <Button className="w-[270px] h-[36px] bg-[#4DB5F9]" onClick={signup}>
            Sign up
          </Button>
          <div className="flex gap-[31px] items-center w-[270px] h-[33px]">
            <div className="border w-[94px] h-[1px] flex-1"></div>
            <div className="text-[14px] w-[20px] h-[14px]">OR</div>
            <div className="border w-[94px] h-[1px] flex-1"></div>
          </div>
        </div>

        <div className="w-[270px] h-[36px] flex gap-[10px] flex-col items-center">
          <div className=" h-[14px]">Have an account?</div>
          <a className=" h-[36px] text-[#0095F6]" href="/login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};
export default Page;
