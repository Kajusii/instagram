/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { useUser } from "@/provider/AuthProvider";
import Buttom from "../_components/buttom";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Instagram from "../_components/header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import API_BASE_URL from "../api/config";
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
};
const Page = () => {
  const [like, setLike] = useState(0);
  const [post, setData] = useState<Post[]>([]);
  const { token, user } = useUser();
  const router = useRouter();
  const [inputValues, setInputValues] = useState({
    caption: "",
    image: "",
  });
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
    getUserPost();
  };
  console.log(like);
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
  const clickFollow = async (id: string) => {
    await fetch(`https://ig-backend-6yzx.onrender.com/follow-toggle/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getUserPost();
  };

  const deletePost = async (postId: string) => {
    await fetch(`https://ig-backend-6yzx.onrender.com/post/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getUserPost();
  };

  const handleValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "caption") {
      setInputValues({ ...inputValues, caption: value });
    }
    if (name === "image") {
      setInputValues({ ...inputValues, image: value });
    }
  };
  const editPost = async (postId: string) => {
    await fetch(`http://localhost:5555/post/edit/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        caption: inputValues.caption,
        image: inputValues.image,
      }),
    });
  };
  console.log(inputValues);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token) {
      getUserPost();
    }
  }, [token]);
  console.log(post);
  return (
    <div className="max-w-[600px] mx-auto mt-14 mb-10">
      <Instagram />

      <div className="flex flex-col gap-8">
        {post?.map((posts, index) => (
          <div key={index} className="bg-white border rounded-md shadow-sm">
            {/* Post Header */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={
                    user?.data?.profilePicture ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX6+vqPj4////+Li4u5ubn8/PyIiIiFhYWJiYnk5OShoaGnp6fT09Pn5+eRkZHu7u7Z2dn19fXCwsKamprHx8exsbHOzs7X19eurq6/v7+jo6Pe3t6WlpZaNtXmAAAE3UlEQVR4nO2d25aqOhBFsUIRbgqI4AX//zsP0fa0vUfbBoKm4ljzpfvROapIIGSFKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEWamG+P/vn/Owhi5Juu3XZHnp6Lblutm1PT9q5aDKRriVulEqZVBqUSr9pjxh0gyrWOlr273KL05Vh/gyDTkv+jdJIsscEemrNUP9K7oU0W+f6UD1Bz+9rs4xuEOrFSrR/15T7rJwiwjU/y8gF9l3IWoyHxKLAVHxS68AYej1qZDbyRFaIocbaYIjhNHHlajTqygIS2CUqRiquDYqHFAinS0H2S+0WUwijzYThP/KFahjDY8vUWvtIEUkeK5hkkYMz9X83rUoJsQ+pTy2YIrFcJ4ytn8EoZRRCocBEMoostVeFH0LfAUOs4dSK8kpfQ2pbOT4Gp1Et6mvHZr0vEOXPhYQ7vU0TCphRueHAXFj6bsKij95pSrOY9N/xQxktymPLgbJqKfobh3HWhGw0GyIW3d5vuLoeg5f/6j4TdpL9qwczdUoh+DYWhDuhPdpY5PFhdD2dfhboGxdC/ZkMsFZvxMtOH64+9pGnfDjWTBBR7xxT/ku08XqejpcGzTvWub6rXsLnW/EIVfhu7LGNIXMdxnRC16NjRw5FZD2as0F9xuTWU//l7hxmVNeCO/hKaI89dqdAAljBxe4wdxFRp4P7dPpc/2/zNnv5AhFT8X3uBonuE5FMG57/IT4e/VfkDldEU9hFPCyCx+T1XU+6AEzaw4TVH3gQmaZbcpisFV0DDlWkzD3K1Pa8ud0EnbBClotut3NmXUx9B2sd9B2fmZo86DjgVFTOXmr4d+fa4DLuAV4rJ9EF5TOg/fz2ACiBud/rRUiT5vPyF+eIWJ1v3hnGidGMY/566sPione00CR1U21HU9rCs2YWffP+kV8A3fPwQAAIAP7k/1WApJkwpTM/THeFmOfRYJuelhGgo13nYuTaJX3VqCI1W5awDhIUof/K+hzlkZneKY+F7Bmb4uOhXPq3DUv1rQ85t916CaHcrjtegSF51gePDWp1y/o4Q+X5y+p4RjETtPRVxiq6UlnmrovkvPFl9tusS2dTt87SNaInpgh68IBh3eJLhSWxjCcK7h265DX4afP9IsEDa0w1cUaomQkx2+olBLhJwsDT09IrqfEGFt6CkKxY17cNsOb3ujqX2Tobfj+N41mCbeUqVzT56bis+T6t4i6HN/+3va1Gde7z3zhdfd0e4H7jzHb5rN7fg5OzwfUjc3WmGPOvp9NeOW47Iy9P16jXavvf3W/o/+ovyVfeptufsO19Do34IiwmxLnO/1EP8vuQ30sttTJeWIjFcpihE0W/Jf0KhqI0fQbDmZeIz+c9JWxjV4g7lYtlN1LGGz0A+of/jBnOkoJTGMSM1iZdSdzNMhmYbzEiOObkVsZ/sVpv7PDJCdn+wcDfH+UQbIhiByQkzZQc8qpEqSWG5/3sMUlYVOJn5nRieHOpxPzfEoWXcbW0uT8oqHcPS+GH9wVXZ33wT81c18JzCP96F+DfGS5lrvt4d8oy65tTS9bJZOr/k1dc67XV1Foae8Lrv4uamqoS77frfd7nZ9X9ZZ1TQsbEe+E1+Zte+gARJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJP/AAFSQ7wNy+LTAAAAAElFTkSuQmCC"
                  }
                  alt="profile"
                />
                <span
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => router.push(`profile/${posts?.user._id}`)}
                >
                  {user?.data?.username}
                </span>
              </div>

              <Dialog>
                <DialogTrigger>
                  <Ellipsis className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-col gap-2">
                    <Button
                      className="text-red-500"
                      onClick={() => deletePost(posts._id)}
                    >
                      Delete
                    </Button>
                    <Dialog>
                      <DialogTrigger>Edit</DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit your post</DialogTitle>
                          <DialogDescription>
                            Update caption or image URL
                          </DialogDescription>
                          <Input
                            placeholder="Caption"
                            onChange={handleValues}
                            name="caption"
                            className="mb-2"
                          />
                          <Input
                            placeholder="Image URL"
                            onChange={handleValues}
                            name="image"
                          />
                        </DialogHeader>
                        <DialogFooter className="flex justify-between">
                          <Button onClick={() => editPost(posts._id)}>
                            Save
                          </Button>
                          <DialogClose>Cancel</DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <DialogClose>Cancel</DialogClose>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {/* Post Image */}
            <img
              className="w-full object-cover max-h-[523px]"
              src={posts?.images[0]}
              alt="post"
            />

            {/* Post Actions */}
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => clickLikes(posts._id)}
                >
                  {posts.like.includes(user?.data?._id!) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                  <span className="text-sm">{posts.like.length}</span>
                </div>
                <MessageCircle
                  className="cursor-pointer"
                  onClick={() => router.push(`/comment/${posts._id}`)}
                />
              </div>
              <Button
                className="text-sm"
                onClick={() => clickFollow(posts?.user?._id)}
              >
                {posts?.user?.followers.includes(user?.data?._id!)
                  ? "Unfollow"
                  : "Follow"}
              </Button>
            </div>

            {/* Post Caption */}
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
