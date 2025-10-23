"use client";
import Buttom from "@/app/_components/buttom";
import { useUser } from "@/provider/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
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
bio:string
  email: string;
  followers: [];
  following: [];
  password: string;
  username: string;
  _id: number;
  profilePicture: string;
};
const Page = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId;
  const { token } = useUser();
  const [post, setPost] = useState<Post[]>([]);
  const [data, setData] = useState<Post>();
  const getOtherPost = async () => {
    const data = await fetch(`http://localhost:5555/post/profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userPost = await data.json();
    setPost(userPost);
  };
  const getOtherData = async () => {
    const data = await fetch(`http://localhost:5555/profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userPost = await data.json();
    setData(userPost);
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token) {
      getOtherPost();
      getOtherData();
    }
  }, [token]);

  console.log(data, "mini data");
  return (
    <div>
      <div>
        <div className="h-[48px]">
          <div className="flex justify-center p-4">{data?.username}</div>
          <div className="border w-full"></div>
        </div>
        <div className="flex gap-[24px] p-6">
          <img
            src={data?.profilePicture}
            className="h-[77px] w-[77px] rounded-[50px]"
          />
          <div className="flex flex-col gap-[16px]">
            <div>{data?.username}</div>
          </div>
        </div>
        <div className="font-bold">{data?.bio}</div>
        <Buttom />
        <div className="border w-full"></div>
        <div className="flex gap-[64px] pt-[12px] pb-[12px] justify-between px-8">
          <div className="flex flex-col">
            <div>{post?.length}</div>
            <div>posts</div>
          </div>
          <div className="flex flex-col">
            <div>{data?.followers.length}</div>
            <div>followers</div>
          </div>
          <div className="flex flex-col">
            <div>{data?.following.length}</div>
            <div>following</div>
          </div>
        </div>
        <div className="border w-full"></div>
        <div
          className="flex flex-wrap w-[450px] gap-[4px]"
          onClick={() => {
            router.push(`/AllPost/${userId}`);
          }}
        >
          {post.map((item) => {
            return (
              <div>
                <img src={item?.images[0]} className="w-[140px] h-[188px]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Page;
