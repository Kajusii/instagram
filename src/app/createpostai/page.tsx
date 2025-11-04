"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/provider/AuthProvider";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Instagram from "../_components/header";

type Post = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  comment: string[];
  updatedAt: Date;
  createdAt: Date;
  user: {
    createdAt: Date;
    email: string;
    followers: string[];
    following: string[];
    password: string;
    updatedAt: Date;
    username: string;
    _id: string;
    profilePicture: string;
  };
};
const Page = () => {
  const { user, token } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [captionValue, setCaptionValue] = useState("");
  const [image, setImages] = useState<string | null>(null);
  const router = useRouter();
  const handleValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const fetchData = async () => {
    if (!inputValue.trim()) return;

    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt: inputValue }),
    });

    if (!response.ok) throw new Error("Failed to generate");

    const blob = await response.blob();

    const file = new File([blob], "generated.png", { type: "image/png" });

    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setImages(uploaded.url);
  };

  const captionValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCaptionValue(value);
  };
  const createPost = async () => {
    const response = await fetch(
      "https://ig-backend-6yzx.onrender.com/post/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          caption: captionValue,
          images: [image],
        }),
      }
    );
    const res = response.json();
    console.log(res);
    console.log(user, "user");
    if (response.ok) {
      router.push("/");
    }
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);
  return (
    <div className="mb-[41px] mt-[55px]">
      <Instagram />

      <div className="flex">
        <button
          className="w-[40px] h-[40px]"
          onClick={() => router.push("/createpost")}
        >
          X
        </button>
        <div className="w-[130px] h-[20px] font-bold ml-[100px] mt-[10px]">
          New photo post
        </div>
      </div>
      <div className="flex-1 h-px bg-gray-200"></div>
      <div className="flex flex-col p-4 gap-[40px]">
        <div className="flex flex-col">
          <div className="text-[24px] font-bold">
            Explore AI generated images
          </div>
          <div className="flow-horizontal">
            Describe what is on your mind. For best results, be specific
          </div>
        </div>
        <Textarea
          onChange={(e) => {
            handleValue(e);
          }}
          placeholder="Example: Im walking in fog like Bladerunner 2049"
          className="h-[100px]"
        />
        <Button className="h-[36px] w-[200px]" onClick={fetchData}>
          Generate
        </Button>
      </div>
      <img src={image ?? "fallback-image.jpg"} />
      <Input
        placeholder="your caption"
        onChange={(e) => {
          captionValues(e);
        }}
      />
      <Button className="h-[36px] w-[200px]" onClick={createPost}>
        create a post
      </Button>
    </div>
  );
};
export default Page;
