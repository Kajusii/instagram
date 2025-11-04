"use client";
import { Button } from "@/components/ui/button";

import Buttom from "../_components/buttom";
import { ChangeEvent, useEffect, useState } from "react";
import { useUser } from "@/provider/AuthProvider";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import API_BASE_URL from "../api/config";

const Page = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const { token } = useUser();
  const [inputValues, setInputValues] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });
  const handleValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "username") {
      setInputValues({ ...inputValues, username: value });
    }
    if (name === "bio") {
      setInputValues({ ...inputValues, bio: value });
    }
    if (name === "profilePicture") {
      setInputValues({ ...inputValues, profilePicture: value });
    }
  };
  const fetchFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };

  const photo = async () => {
    if (!file) return;
    const uploaded = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    console.log(uploaded);
    setImage(uploaded.url);
  };
  const editUser = async () => {
    const res = await fetch(`${API_BASE_URL}/editprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: inputValues.username,
        bio: inputValues.bio,
        profilePicture: image,
      }),
    });
    if (res.ok) {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <div>
      <div className="flex gap-[100px]">
        <button className="w-[40px] h-[40px]" onClick={() => router.push("/")}>
          {"<"}
        </button>
        <div>Edit Profile Picture</div>
      </div>
      <div className="flex gap-[10px]">
        <div>profilePicture</div>
        <Input
          type="file"
          onChange={(e) => {
            fetchFile(e);
          }}
          name="profilePicture"
        />
      </div>
      <div className="flex">
        <div>username</div>
        <Input
          placeholder="username"
          onChange={(e) => {
            handleValues(e);
          }}
          name="username"
        />
      </div>
      <div className="flex">
        <div>bio</div>
        <Input
          placeholder="bio"
          name="bio"
          onChange={(e) => {
            handleValues(e);
          }}
        />
      </div>
      <Button onClick={photo}>upload image</Button>
      <div>
        <img src={image ?? "fallback-image.jpg"} />
      </div>
      <Button onClick={editUser}>Submit</Button>
      <Buttom />
    </div>
  );
};
export default Page;
