"use client";

import Bottom from "@/app/_components/buttom";
import { Button } from "@/components/ui/button";

import { useUser } from "@/provider/AuthProvider";
import { useParams } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { token } = useUser();
  const params = useParams();
  const postId = params.postId;
  const [input, setInput] = useState("");
  const comment = () => {
    fetch(`http://localhost:5555/post/comment/${postId}`, {
      method: "PUSH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <div>
      <div className="fixed bottom-12">
        <input placeholder="Add a comment..." />
        <Button>Comment</Button>
        <Bottom />
      </div>
    </div>
  );
};
export default Page;
