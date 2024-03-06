import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import icon from "./chatboticon.jpg"


const FeedCard: React.FC = () => {

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
            <Image
              className="rounded-full"
              src={icon}
              alt="user-image"
              height={50}
              width={50}
            />
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`/`}>
              Shweta Mandal
            </Link>
          </h5>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum maiores nobis voluptate ducimus. Quisquam repellat labore tempore nisi, reiciendis quidem ratione laboriosam hic, modi porro enim voluptate, recusandae laborum reprehenderit?</p>
            <Image src={icon} alt="image" width={400} height={400} />
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;