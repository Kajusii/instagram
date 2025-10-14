"use client";

import Ig from "@/app/images/igLogo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext, useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const { user, setUser, setToken, token } = useUser();

  const [InputValues, setInputValue] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setInputValue({ ...InputValues, email: value });
    }
    if (name === "password") {
      setInputValue({ ...InputValues, password: value });
    }
  };

  const login = async () => {
    const response = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: InputValues.email,
        password: InputValues.password,
      }),
    });
    if (window.location !== undefined) {
      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", token);
        setToken(token);
        router.push("/");
        toast.success("Log in successful");
      } else {
        toast.error("wrong password");
      }
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-[64px] pt-[200px] pr-[80px] pb-[200px] pl-[80px] w-[430px] h-[932px]">
      <img src={Ig.src} className="h-[48px] w-[48px] ml-[100px]" />
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
          </div>
          <div>
            <Button className="w-[270px] h-[36px] bg-[#4DB5F9]" onClick={login}>
              Log in
            </Button>
          </div>

          <div className="flex gap-[31px] items-center w-[270px] h-[33px]">
            <div className="border w-[94px] h-[1px] flex-1"></div>
            <div className="text-[14px] w-[20px] h-[14px]">OR</div>
            <div className="border w-[94px] h-[1px] flex-1"></div>
          </div>
        </div>

        <div className="w-[270px] h-[36px] flex gap-[10px]">
          <div className=" h-[14px]">Do not have an account?</div>
          <a className=" h-[36px] text-[#0095F6]" href="/signup">
            Sign up
          </a>
        </div>
        {/* <div>{toast("hi")}</div> */}
      </div>
    </div>
  );
};
export default Page;
