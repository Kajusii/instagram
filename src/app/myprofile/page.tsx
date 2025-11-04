"use client";
import { useUser } from "@/provider/AuthProvider";
import Buttom from "../_components/buttom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../api/config";

type Post = {
  _id: string;
  caption: string;
  images: string[];
  like: string[];
  comment: string[];
  updatedAt: Date;
  createdAt: Date;
  bio: string;
  data: {
    createdAt: Date;
    email: string;
    followers: string[];
    following: string[];
    password: string;
    updatedAt: Date;
    username: string;
    _id: string;
    profilePicture: string;
    bio: string;
  };
};
const Page = () => {
  const [post, setData] = useState<Post[]>([]);
  const { token, user } = useUser();
  const router = useRouter();

  const getUserPost = async () => {
    const data = await fetch(
      `https://ig-backend-6yzx.onrender.com/post/userpost`,
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
  console.log(post);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
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
          src={
            user?.data?.profilePicture ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          className="h-[77px] w-[77px] rounded-[50px]"
          alt="profile"
        />
        <div className="flex flex-col gap-[16px]">
          <div>{user?.data?.username}</div>
          <div>
            <button
              onClick={() => {
                router.push("/editprofile");
              }}
              className="px-3 py-1 border rounded-md hover:bg-gray-100 transition"
            >
              Edit profile
            </button>
          </div>
          <button className="text-[20px] text-[#FF0000]" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {user?.data?.bio && (
        <div className="font-bold px-6">{user?.data?.bio}</div>
      )}

      <Buttom />

      <div className="border w-full my-4"></div>

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

      <div
        className="flex gap-[4px] flex-wrap cursor-pointer"
        onClick={() => router.push(`/myAllPost`)}
      >
        {post.map((p, index) => (
          <div key={index}>
            <img
              src={p?.images[0]}
              className="w-[140px] h-[188px] object-cover"
              alt={`post-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
