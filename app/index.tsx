
"use client";
import React, { useCallback, useState } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsMessenger, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiImageAlt, BiMoney, BiUser } from "react-icons/bi";
import Image from "next/image";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import {GoogleLogin, CredentialResponse} from "@react-oauth/google"
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import {useQueryClient} from "@tanstack/react-query"
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

interface TwitterSidebarBtn {
  title: string;
  icon: React.ReactNode;
}



const sidebarMenu: TwitterSidebarBtn[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />
  },
  {
    title: "Explore",
    icon: <BiHash />
  },
  {
    title: "Notifications",
    icon: <BsBell />
  },
  {
    title: "Messages",
    icon: <BsEnvelope />
  },
  {
    title: "BookMarks",
    icon: <BsBookmark />
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />
  },
  {
    title: "Profile",
    icon: <BiUser />
  },
  {
    title: "More",
    icon: <SlOptions />
  }
];

export default function Home() {

  const {user} = useCurrentUser();
  const {tweets = []} = useGetAllTweets();
  const {mutate} = useCreateTweet();
  const [content, setContent] = useState("");
  const queryCl = useQueryClient()


  const HandleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if(!googleToken) return toast.error("google token not found")
    const {verifyGoogleToken} = await graphqlClient.request(verifyUserGoogleTokenQuery, {token: googleToken});
    toast.success('verified successfully');
    if (verifyGoogleToken) {
      window.localStorage.setItem('__twitter_token',verifyGoogleToken);
    }

    await queryCl.invalidateQueries({ queryKey: ["curent-user"] })
  }, [queryCl])

  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click();
  },[])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  },[content, mutate])

  return (
    
    <div>

      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-1 ml-19 relative">
          <div className="text-[20px] h-fit w-fit hover:bg-gray-800 rounded-full p-2 mt-2 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="pr-4">
            <ul>
              {sidebarMenu.map((item, id) => (
                <li key={id} className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-[5px] w-fit cursor-pointer mt-1">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-5">
              <button className="bg-[#1d9bf0] px-4 py-1 rounded-full w-full mt-2 text-lg font-semibold">Tweet</button>
            </div>
            {user && 
             ( <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 w-[250px] rounded-full">
              {user && user.profileImageUrl && (<Image 
              className="rounded-full"
              src={user.profileImageUrl} alt="user image" height={50} width={50}/>)}
              <div>
              <h3 className="text-xl">{user.firstName}</h3>
              <h3 className="text-xl">{user.lastName}</h3>
              </div>
              
            </div>
            )
            }
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-y-auto no-scrollbar">
        <div>
        <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3 flex">
        <div className="col-span-1">
            {(user?.profileImageUrl) && <Image
              className="rounded-full"
              src={user?.profileImageUrl}
              alt="user-image"
              height={50}
              width={50}
            />}
        </div>
        <div className="col-span-11">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className=" bg-transparent border-b border-slate-700 px-3 text-xl w-full" placeholder="What's happening?" rows={3}></textarea>
          <div className="mt-2 flex justify-between items-center">
            <BiImageAlt onClick={handleSelectImage}  className="text-xl"/>
            <div>
              <button className="bg-[#1d9bf0] px-4 py-1 rounded-full text-sm font-semibold" onClick={handleCreateTweet}>Tweet</button>
            </div>
          </div>
        </div>
        </div>
        
        
        </div>
        </div>
              {
                tweets?.map((tweet) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
              }
        </div>
        <div className="col-span-3">
          {(!user) && <div className="p-4 m-3 bg-slate-700 rounded-lg w-full">
            <h1 className="my-2 text-[20px]">New to Twitter?</h1>
            <GoogleLogin
              onSuccess={HandleLoginWithGoogle}/>
          </div>}
        </div>
      </div>
    </div>
  );
}