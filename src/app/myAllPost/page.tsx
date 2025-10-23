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
    const res = await fetch(`http://localhost:5555/post/likes/${postId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    setLike(response);
    getUserPost();
  };
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
  const clickFollow = async (id: string) => {
    const res = await fetch(`http://localhost:5555/follow-toggle/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    getUserPost();
  };
  console.log(post);
  const deletePost = async (postId: string) => {
    await fetch(`http://localhost:5555/post/delete/${postId}`, {
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
    <div className="mb-[41px] mt-[55px]">
      <Instagram />
      <div className="flex flex-col gap-[30px]">
        {post?.map((posts, index) => {
          return (
            <div key={index}>
              <div className="flex gap-[10px] text-center">
                <img
                  className="rounded-full w-[42px] h-[42px]"
                  src={
                    user?.data?.profilePicture ??
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX6+vqPj4////+Li4u5ubn8/PyIiIiFhYWJiYnk5OShoaGnp6fT09Pn5+eRkZHu7u7Z2dn19fXCwsKamprHx8exsbHOzs7X19eurq6/v7+jo6Pe3t6WlpZaNtXmAAAE3UlEQVR4nO2d25aqOhBFsUIRbgqI4AX//zsP0fa0vUfbBoKm4ljzpfvROapIIGSFKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEWamG+P/vn/Owhi5Juu3XZHnp6Lblutm1PT9q5aDKRriVulEqZVBqUSr9pjxh0gyrWOlr273KL05Vh/gyDTkv+jdJIsscEemrNUP9K7oU0W+f6UD1Bz+9rs4xuEOrFSrR/15T7rJwiwjU/y8gF9l3IWoyHxKLAVHxS68AYej1qZDbyRFaIocbaYIjhNHHlajTqygIS2CUqRiquDYqHFAinS0H2S+0WUwijzYThP/KFahjDY8vUWvtIEUkeK5hkkYMz9X83rUoJsQ+pTy2YIrFcJ4ytn8EoZRRCocBEMoostVeFH0LfAUOs4dSK8kpfQ2pbOT4Gp1Et6mvHZr0vEOXPhYQ7vU0TCphRueHAXFj6bsKij95pSrOY9N/xQxktymPLgbJqKfobh3HWhGw0GyIW3d5vuLoeg5f/6j4TdpL9qwczdUoh+DYWhDuhPdpY5PFhdD2dfhboGxdC/ZkMsFZvxMtOH64+9pGnfDjWTBBR7xxT/ku08XqejpcGzTvWub6rXsLnW/EIVfhu7LGNIXMdxnRC16NjRw5FZD2as0F9xuTWU//l7hxmVNeCO/hKaI89dqdAAljBxe4wdxFRp4P7dPpc/2/zNnv5AhFT8X3uBonuE5FMG57/IT4e/VfkDldEU9hFPCyCx+T1XU+6AEzaw4TVH3gQmaZbcpisFV0DDlWkzD3K1Pa8ud0EnbBClotut3NmXUx9B2sd9B2fmZo86DjgVFTOXmr4d+fa4DLuAV4rJ9EF5TOg/fz2ACiBud/rRUiT5vPyF+eIWJ1v3hnGidGMY/566sPione00CR1U21HU9rCs2YWffP+kV8A3fPwQAAIAP7k/1WApJkwpTM/THeFmOfRYJuelhGgo13nYuTaJX3VqCI1W5awDhIUof/K+hzlkZneKY+F7Bmb4uOhXPq3DUv1rQ85t916CaHcrjtegSF51gePDWp1y/o4Q+X5y+p4RjETtPRVxiq6UlnmrovkvPFl9tusS2dTt87SNaInpgh68IBh3eJLhSWxjCcK7h265DX4afP9IsEDa0w1cUaomQkx2+olBLhJwsDT09IrqfEGFt6CkKxY17cNsOb3ujqX2Tobfj+N41mCbeUqVzT56bis+T6t4i6HN/+3va1Gde7z3zhdfd0e4H7jzHb5rN7fg5OzwfUjc3WmGPOvp9NeOW47Iy9P16jXavvf3W/o/+ovyVfeptufsO19Do34IiwmxLnO/1EP8vuQ30sttTJeWIjFcpihE0W/Jf0KhqI0fQbDmZeIz+c9JWxjV4g7lYtlN1LGGz0A+of/jBnOkoJTGMSM1iZdSdzNMhmYbzEiOObkVsZ/sVpv7PDJCdn+wcDfH+UQbIhiByQkzZQc8qpEqSWG5/3sMUlYVOJn5nRieHOpxPzfEoWXcbW0uT8oqHcPS+GH9wVXZ33wT81c18JzCP96F+DfGS5lrvt4d8oy65tTS9bJZOr/k1dc67XV1Foae8Lrv4uamqoS77frfd7nZ9X9ZZ1TQsbEe+E1+Zte+gARJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJP/AAFSQ7wNy+LTAAAAAElFTkSuQmCC"
                  }
                  alt="profile"
                ></img>
                <span
                  className="text-[16px]"
                  onClick={() => {
                    router.push(`profile/${posts?.user._id}`);
                  }}
                >
                  {user?.data?.username}
                </span>

                <Dialog>
                  <DialogTrigger>
                    <Ellipsis />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <Button
                        onClick={() => {
                          deletePost(posts._id);
                        }}
                      >
                        delete
                      </Button>
                      <Dialog>
                        <DialogTrigger>edit</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit your post</DialogTitle>
                            <DialogDescription>
                              You can edit your post
                            </DialogDescription>
                            <Input
                              placeholder="caption"
                              onChange={(e) => {
                                handleValues(e);
                              }}
                              name="caption"
                            />
                            <Input
                              placeholder="image-url"
                              onChange={(e) => {
                                handleValues(e);
                              }}
                              name="image"
                            />
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                editPost(posts._id);
                              }}
                            >
                              Edit your Post
                            </Button>
                            <DialogClose>Cancel</DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DialogClose>Cancel</DialogClose>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <span>
                  <Button
                    onClick={() => {
                      clickFollow(posts?.user?._id);
                    }}
                  >
                    {posts?.user?.followers.includes(user?.data?._id!) ? (
                      <div>unfollow</div>
                    ) : (
                      <div>follow</div>
                    )}
                  </Button>
                </span>
              </div>

              <img className="w-[430] h-[523px]" src={posts?.images[0]} />
              <div className="gap-[10px] flex mt-[10px]">
                <div
                  className="flex gap-[8px]"
                  onClick={() => {
                    clickLikes(posts._id);
                  }}
                >
                  {posts.like.includes(user?.data?._id!) ? (
                    <Heart fill="red" color="red" />
                  ) : (
                    <Heart />
                  )}
                  <div>{posts.like.length}</div>
                </div>
                <div>
                  <MessageCircle
                    onClick={() => {
                      router.push(`/comment/${posts._id}`);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="flex gap-[5px] mt-[10px]">
                  <div className="font-weight: bold">
                    {posts?.user?.username}
                  </div>
                  <span>{posts?.caption}</span>
                </div>
                <div className="border w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
      <Buttom />
    </div>
  );
};
export default Page;
