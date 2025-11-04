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
    <div className="max-w-[935px] mx-auto mt-[40px]">
      <div className="border-b border-gray-300 pb-4">
        <div className="flex justify-center text-[18px] font-semibold">
          {user?.data?.username}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-[40px] p-8">
        <img
          src={
            user?.data?.profilePicture ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          className="h-[150px] w-[150px] rounded-full object-cover"
          alt="profile"
        />

        <div className="flex flex-col gap-[16px] text-center sm:text-left w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-[20px] font-semibold">
              {user?.data?.username}
            </span>
            <button
              onClick={() => router.push("/editprofile")}
              className="px-4 py-1 text-[14px] border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Edit profile
            </button>
          </div>

          <div className="flex justify-center sm:justify-start gap-[30px] text-[15px]">
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-semibold">{post?.length || 0}</span>
              <span className="text-gray-600 text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-semibold">
                {user?.data?.followers?.length || 0}
              </span>
              <span className="text-gray-600 text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-semibold">
                {user?.data?.following?.length || 0}
              </span>
              <span className="text-gray-600 text-sm">Following</span>
            </div>
          </div>

          {user?.data?.bio && (
            <div className="text-[14px] text-gray-800 mt-2">
              {user?.data?.bio}
            </div>
          )}

          <button
            onClick={logout}
            className="text-[14px] text-red-500 hover:text-red-600 font-medium"
          >
            Log out
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-6 mb-4"></div>

      <div
        className="grid grid-cols-3 gap-[3px] cursor-pointer"
        onClick={() => router.push(`/myAllPost`)}
      >
        {post.map((p, index) => (
          <div key={index} className="relative group">
            <img
              src={p?.images?.[0]}
              alt="post"
              className="w-full h-[188px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition"></div>
          </div>
        ))}
      </div>

      <Buttom />
    </div>
  );
};
