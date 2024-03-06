
import React, { useCallback } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsMessenger, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";

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

  // const HandleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
  //   const googleToken = cred.credential
  //   if(!googleToken) return toast.error("google token not found")
  //   const {verifyGoogleToken} = await graphQLClient.request(verifyUserGoogleToken, {token: googleToken});

  //   toast.success('verified successfully');
  //   if (verifyGoogleToken) {
  //     window.localStorage.setItem('__twitter_token',verifyGoogleToken);
  //   }
  // }, [])

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-1 ml-19">
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
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-y-auto no-scrollbar">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">
          <div className="p-4 m-3 bg-slate-700 rounded-lg w-full">
            <h1 className="my-2 text-[20px]">New to Twitter?</h1>
            {/* <GoogleLogin
              onSuccess={HandleLoginWithGoogle}/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
