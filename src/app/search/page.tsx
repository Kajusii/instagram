"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "../_components/buttom";
import { useUser } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  _id: string;
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePicture: string | null;
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
  };
};
const Page = () => {
  const { token } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const getAllUser = async () => {
    const res = await fetch(`http://localhost:5555/allusers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await res.json();
    setUsers(response);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    if (token) {
      getAllUser();
    }
  }, [token]);

  const filterred = users.filter((user) => {
    return user.username.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="search-container p-4 bg-white rounded-lg shadow-md">
      <input
        placeholder="Search username"
        onChange={(e) => handleValue(e)}
        className="search-input p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="search-results mt-4">
        {filterred.map((user) => {
          return (
            <div className="result-item flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <img
                src={
                  user.profilePicture ??
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX6+vqPj4////+Li4u5ubn8/PyIiIiFhYWJiYnk5OShoaGnp6fT09Pn5+eRkZHu7u7Z2dn19fXCwsKamprHx8exsbHOzs7X19eurq6/v7+jo6Pe3t6WlpZaNtXmAAAE3UlEQVR4nO2d25aqOhBFsUIRbgqI4AX//zsP0fa0vUfbBoKm4ljzpfvROapIIGSFKAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEWamG+P/vn/Owhi5Juu3XZHnp6Lblutm1PT9q5aDKRriVulEqZVBqUSr9pjxh0gyrWOlr273KL05Vh/gyDTkv+jdJIsscEemrNUP9K7oU0W+f6UD1Bz+9rs4xuEOrFSrR/15T7rJwiwjU/y8gF9l3IWoyHxKLAVHxS68AYej1qZDbyRFaIocbaYIjhNHHlajTqygIS2CUqRiquDYqHFAinS0H2S+0WUwijzYThP/KFahjDY8vUWvtIEUkeK5hkkYMz9X83rUoJsQ+pTy2YIrFcJ4ytn8EoZRRCocBEMoostVeFH0LfAUOs4dSK8kpfQ2pbOT4Gp1Et6mvHZr0vEOXPhYQ7vU0TCphRueHAXFj6bsKij95pSrOY9N/xQxktymPLgbJqKfobh3HWhGw0GyIW3d5vuLoeg5f/6j4TdpL9qwczdUoh+DYWhDuhPdpY5PFhdD2dfhboGxdC/ZkMsFZvxMtOH64+9pGnfDjWTBBR7xxT/ku08XqejpcGzTvWub6rXsLnW/EIVfhu7LGNIXMdxnRC16NjRw5FZD2as0F9xuTWU//l7hxmVNeCO/hKaI89dqdAAljBxe4wdxFRp4P7dPpc/2/zNnv5AhFT8X3uBonuE5FMG57/IT4e/VfkDldEU9hFPCyCx+T1XU+6AEzaw4TVH3gQmaZbcpisFV0DDlWkzD3K1Pa8ud0EnbBClotut3NmXUx9B2sd9B2fmZo86DjgVFTOXmr4d+fa4DLuAV4rJ9EF5TOg/fz2ACiBud/rRUiT5vPyF+eIWJ1v3hnGidGMY/566sPione00CR1U21HU9rCs2YWffP+kV8A3fPwQAAIAP7k/1WApJkwpTM/THeFmOfRYJuelhGgo13nYuTaJX3VqCI1W5awDhIUof/K+hzlkZneKY+F7Bmb4uOhXPq3DUv1rQ85t916CaHcrjtegSF51gePDWp1y/o4Q+X5y+p4RjETtPRVxiq6UlnmrovkvPFl9tusS2dTt87SNaInpgh68IBh3eJLhSWxjCcK7h265DX4afP9IsEDa0w1cUaomQkx2+olBLhJwsDT09IrqfEGFt6CkKxY17cNsOb3ujqX2Tobfj+N41mCbeUqVzT56bis+T6t4i6HN/+3va1Gde7z3zhdfd0e4H7jzHb5rN7fg5OzwfUjc3WmGPOvp9NeOW47Iy9P16jXavvf3W/o/+ovyVfeptufsO19Do34IiwmxLnO/1EP8vuQ30sttTJeWIjFcpihE0W/Jf0KhqI0fQbDmZeIz+c9JWxjV4g7lYtlN1LGGz0A+of/jBnOkoJTGMSM1iZdSdzNMhmYbzEiOObkVsZ/sVpv7PDJCdn+wcDfH+UQbIhiByQkzZQc8qpEqSWG5/3sMUlYVOJn5nRieHOpxPzfEoWXcbW0uT8oqHcPS+GH9wVXZ33wT81c18JzCP96F+DfGS5lrvt4d8oy65tTS9bJZOr/k1dc67XV1Foae8Lrv4uamqoS77frfd7nZ9X9ZZ1TQsbEe+E1+Zte+gARJsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJP/AAFSQ7wNy+LTAAAAAElFTkSuQmCC"
                }
                className="rounded-full w-[45px] h-[45px] object-cover"
              />
              <div className="user-info flex flex-col">
                <div
                  className="username text-[16px] font-semibold"
                  onClick={() => {
                    router.push(`profile/${user._id}`);
                  }}
                >
                  {user.username}
                </div>
                <div className="name text-[14px] text-gray-500">
                  {user.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Button className="mt-4 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600" />
    </div>
  );
};
export default Page;
