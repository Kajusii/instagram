"use client";
import { useUser } from "@/provider/AuthProvider";
import Buttom from "../_components/buttom";
import { useEffect, useState } from "react";

type Post = {
  caption: string;
  images: [string];
  like: [number];
  comment: [number];
  updatedAt: Date;
  createdAt: Date;
  user: {
    createdAt: Date;
    email: string;
    followers: [];
    following: [];
    password: string;
    updatedAt: Date;
    username: string;
    _id: number;
    profilePicture: string;
  };
};
const Page = () => {
  const [post, setData] = useState<Post[]>([]);
  const { token, user } = useUser();

  const getUserPost = async () => {
    const data = await fetch(`http://localhost:5555/post/userpost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userPost = await data.json();
    setData(userPost);
  };
  console.log(post);
  useEffect(() => {
    if (token) {
      getUserPost();
    }
  }, [token]);
  console.log(user);
  return (
    <div>
      <div className="h-[48px]">
        <div className="flex justify-center p-4">{user?.data?.username}</div>
        <div className="border w-full"></div>
      </div>
      <div className="flex gap-[24px] p-6">
        <img
          src={user?.data?.profilePicture}
          className="h-[77px] w-[77px] rounded-[50px]"
        />
        <div className="flex flex-col gap-[16px]">
          <div>{user?.data?.username}</div>
          <div>
            <button>Edit profile</button>
          </div>
        </div>
      </div>
      <div className="font-bold">{user?.data?.username}</div>
      <Buttom />
      <div className="border w-full"></div>
      <div className="flex gap-[64px] pt-[12px] pb-[12px] justify-between px-8">
        <div className="flex flex-col">
          <div>{post.length}</div>
          <div>posts</div>
        </div>
        <div className="flex flex-col">
          <div>{user?.data?.followers.length}</div>
          <div>followers</div>
        </div>
        <div className="flex flex-col">
          <div>{user?.data?.following.length}</div>
          <div>following</div>
        </div>
      </div>
      <div className="border w-full"></div>
      <div className="flex">
        {post.map((post, index) => {
          return (
            <div key={index}>
              <img src={post?.images} className="w-[140px] h-[188px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Page;
