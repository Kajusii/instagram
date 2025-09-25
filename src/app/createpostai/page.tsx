"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImages] = useState("");
  const handleValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const fetchData = async () => {
    if (!inputValue.trim()) return;

    const res = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF}`,
        },
        body: JSON.stringify({
          inputs: inputValue,
          parameters: {
            negative_prompt: "blurry, bad quality, distorted",
            num_inference_stops: 20,
            guidance_scale: 7.5,
          },
        }),
      }
    );

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    setImages(imageUrl);
  };

  return (
    <div>
      <div className="flex">
        <button className="w-[40px] h-[40px]">X</button>
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
      <img src={image} className="rounded-lg shadow-md w-full h-[500px]" />
    </div>
  );
};
export default Page;
