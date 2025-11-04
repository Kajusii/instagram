/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";

import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Instagram from "./_components/header";
import Buttom from "./_components/buttom";
import { Heart, MoreHorizontal } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Post = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  comment: number[];
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
  const { user } = useUser();
  const [posts, setPost] = useState<Post[]>([]);
  const { token } = useUser();
  const router = useRouter();
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
    getImages();
  };
  console.log(like);
  const getImages = async () => {
    const res = await fetch(
      `https://ig-backend-6yzx.onrender.com/post/allpost`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await res.json();
    setPost(response);
  };
  const clickFollow = async (id: string) => {
    await fetch(`https://ig-backend-6yzx.onrender.com/follow-toggle/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getImages();
  };
  console.log(posts);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token) {
      getImages();
    }
  }, [token]);
  return (
    <div className="max-w-[500px] mx-auto mt-[60px] mb-[40px]">
      <Instagram />
      <div className="flex flex-col gap-[40px]">
        {posts?.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => router.push(`profile/${post?.user?._id}`)}
              >
                <img
                  src={
                    post?.user?.profilePicture ??
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="profile"
                  className="w-[42px] h-[42px] rounded-full object-cover"
                />
                <span className="font-semibold text-[15px]">
                  {post?.user?.username}
                </span>
              </div>
              {user?.data?._id === post.user._id ? (
                <MoreHorizontal className="cursor-pointer" />
              ) : (
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                  onClick={() => clickFollow(post?.user?._id)}
                >
                  {post?.user?.followers.includes(user?.data?._id!)
                    ? "Unfollow"
                    : "Follow"}
                </Button>
              )}
            </div>

            <Carousel>
              <CarouselContent>
                {post?.images?.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <img
                      src={img}
                      alt=""
                      className="w-full h-[500px] object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="px-4 py-2">
              <div className="flex items-center gap-4 mb-2">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => clickLikes(post._id)}
                >
                  {post.like.includes(user?.data?._id!) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                  <span className="text-sm">{post.like.length}</span>
                </div>

                <MessageCircle
                  className="cursor-pointer"
                  onClick={() => router.push(`comment/${post._id}`)}
                />
              </div>
              <div className="text-[14px] leading-snug">
                <span className="font-semibold mr-2">
                  {post?.user?.username}
                </span>
                {post?.caption}
              </div>

              <div
                className="text-gray-500 text-[13px] mt-1 cursor-pointer"
                onClick={() => router.push(`comment/${post._id}`)}
              >
                View all comments
              </div>

              <div className="text-gray-400 text-[11px] uppercase mt-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Buttom />
    </div>
  );
};

export default Page;
