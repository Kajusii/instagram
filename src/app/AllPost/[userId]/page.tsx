/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import Buttom from "@/app/_components/buttom";
import Instagram from "@/app/_components/header";
import { Button } from "@/components/ui/button";
import { useUser } from "@/provider/AuthProvider";
import { Heart, MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  profilePicture: string;
};
type Data = {
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
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId;
  const { token, user } = useUser();
  const [post, setPost] = useState<Post[]>([]);
  const [data, setData] = useState<Data>();
  const [like, setLike] = useState(0);
  const clickLikes = async (postId: string) => {
    const res = await fetch(
      `https://ig-backend-6yzx.onrender.com/post/likes/${postId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await res.json();
    setLike(response);
    getOtherPost();
  };
  console.log(like);

  const clickFollow = async (id: string) => {
    await fetch(`https://ig-backend-6yzx.onrender.com/follow-toggle/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getOtherPost();
  };
  const getOtherPost = async () => {
    const data = await fetch(
      `https://ig-backend-6yzx.onrender.com/post/profile/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userPost = await data.json();
    setPost(userPost);
  };
  const getOtherData = async () => {
    const data = await fetch(
      `https://ig-backend-6yzx.onrender.com/profile/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userPost = await data.json();
    setData(userPost);
  };
  console.log(post, "postuud");
  console.log(data, "data");
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token) {
      getOtherPost();
      getOtherData();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-12 mb-12">
      <Instagram />

      <div className="w-full max-w-xl flex flex-col gap-6">
        {post?.map((posts, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    data?.profilePicture ??
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX6+vqPj4////+Li4u5ubn8/PyIiIiFhYWJiYnk5OShoaGnp6fT09Pn5+eRkZHu7u7Z2dn19fXCwsKamprHx8exsbHOzs7X19eurq6/v7+jo6Pe3t6WlpZaNtXmAAAE3UlEQVR4nO2d25aqOhBFsUIRbgqI4AX//zsP0fa0vUfbBoKm4ljzpfvROapIIGSFKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEWamG+P/vn/Owhi5Juu3XZHnp6Lblutm1PT9q5aDKRriVulEqZVBqUSr9pjxh0gyrWOlr273KL05Vh/gyDTkv+jdJIsscEemrNUP9K7oU0W+f6UD1Bz+9rs4xuEOrFSrR/15T7rJwiwjU/y8gF9l3IWoyHxKLAVHxS68AYej1qZDbyRFaIocbaYIjhNHHlajTqygIS2CUqRiquDYqHFAinS0H2S+0WUwijzYThP/KFahjDY8vUWvtIEUkeK5hkkYMz9X83rUoJsQ+pTy2YIrFcJ4ytn8EoZRRCocBEMoostVeFH0LfAUOs4dSK8kpfQ2pbOT4Gp1Et6mvHZr0vEOXPhYQ7vU0TCphRueHAXFj6bsKij95pSrOY9N/xQxktymPLgbJqKfobh3HWhGw0GyIW3d5vuLoeg5f/6j4TdpL9qwczdUoh+DYWhDuhPdpY5PFhdD2dfhboGxdC/ZkMsFZvxMtOH64+9pGnfDjWTBBR7xxT/ku08XqejpcGzTvWub6rXsLnW/EIVfhu7LGNIXMdxnRC16NjRw5FZD2as0F9xuTWU//l7hxmVNeCO/hKaI89dqdAAljBxe4wdxFRp4P7dPpc/2/zNnv5AhFT8X3uBonuE5FMG57/IT4e/VfkDldEU9hFPCyCx+T1XU+6AEzaw4TVH3gQmaZbcpisFV0DDlWkzD3K1Pa8ud0EnbBClotut3NmXUx9B2sd9B2fmZo86DjgVFTOXmr4d+fa4DLuAV4rJ9EF5TOg/fz2ACiBud/rRUiT5vPyF+eIWJ1v3hnGidGMY/566sPione00CR1U21HU9rCs2YWffP+kV8A3fPwQAAIAP7k/1WApJkwpTM/THeFmOfRYJuelhGgo13nYuTaJX3VqCI1W5awDhIUof/K+hzlkZneKY+F7Bmb4uOhXPq3DUv1rQ85t916CaHcrjtegSF51gePDWp1y/o4Q+X5y+p4RjETtPRVxiq6UlnmrovkvPFl9tusS2dTt87SNaInpgh68IBh3eJLhSWxjCcK7h265DX4afP9IsEDa0w1cUaomQkx2+olBLhJwsDT09IrqfEGFt6CkKxY17cNsOb3ujqX2Tobfj+N41mCbeUqVzT56bis+T6t4i6HN/+3va1Gde7z3zhdfd0e4H7jzHb5rN7fg5OzwfUjc3WmGPOvp9NeOW47Iy9P16jXavvf3W/o/+ovyVfeptufsO19Do34IiwmxLnO/1EP8vuQ30sttTJeWIjFcpihE0W/Jf0KhqI0fQbDmZeIz+c9JWxjV4g7lYtlN1LGGz0A+of/jBnOkoJTGMSM1iZdSdzNMhmYbzEiOObkVsZ/sVpv7PDJCdn+wcDfH+UQbIhiByQkzZQc8qpEqSWG5/3sMUlYVOJn5nRieHOpxPzfEoWXcbW0uT8oqHcPS+GH9wVXZ33wT81c18JzCP96F+DfGS5lrvt4d8oy65tTS9bJZOr/k1dc67XV1Foae8Lrv4uamqoS77frfd7nZ9X9ZZ1TQsbEe+E1+Zte+gARJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJP/AAFSQ7wNy+LTAAAAAElFTkSuQmCC"
                  }
                  alt="profile"
                />
                <span
                  className="font-semibold cursor-pointer"
                  onClick={() => router.push(`profile/${posts?.user._id}`)}
                >
                  {data?.username}
                </span>
              </div>
              <Button
                onClick={() => clickFollow(posts?.user?._id)}
                className="text-sm"
              >
                {posts?.user?.followers.includes(user?.data?._id!)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>

            <img
              className="w-full max-h-[600px] object-cover"
              src={posts?.images[0]}
              alt="post"
            />

            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => clickLikes(posts._id)}
                >
                  {posts.like.includes(user?.data?._id!) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                  <span>{posts.like.length}</span>
                </div>
                <MessageCircle
                  className="cursor-pointer"
                  onClick={() => router.push(`/comment/${posts._id}`)}
                />
              </div>
            </div>

            <div className="px-4 pb-4">
              <span className="font-semibold mr-2">
                {posts?.user?.username}
              </span>
              <span>{posts?.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <Buttom />
    </div>
  );
};

export default Page;
