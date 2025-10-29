"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/provider/AuthProvider";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Least from "../_components/buttom";
import API_BASE_URL from "../api/config";

const Page = () => {
  const { token } = useUser();
  const router = useRouter();
 const [file, setFile] = useState<File | null>(null);
const [image, setImage] = useState<string[]>([]);
  const [captionValue, setCaptionValue] = useState("");
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
    setImage((prev)=>[...prev,uploaded.url]);
  };
  console.log(image)
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCaptionValue(value);
  };
  console.log(captionValue);
  const createPost = async () => {
    const response = await fetch(`${API_BASE_URL}post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: captionValue,
        images: image
      }),
    });

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
    <div>
      <input
        type="file"
        accept="image/*"
        placeholder="choose ur photo"
        onChange={(e) => {
          fetchFile(e);
        }}
        multiple={true}
      />
      <button onClick={photo}>submit</button>
      <Input
        placeholder="caption"
        onChange={(e) => {
          handleValue(e);
        }}
      />
      <div>
        <div>{image.map((img,index)=>{
          return <img key={index} src={img} alt=""/>
        })}</div>
    
      </div>
      <Button onClick={createPost}>Post</Button>
      <Least />
    </div>
  );
};
export default Page;
