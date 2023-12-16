"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import AccountContent from "./components/AccountContent";

interface AccountProps {
  className?: string; 
}

const Account: React.FC<AccountProps> = ({
  className,
}) => {

  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if(error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out!');
    }

  }

  return ( 
  <>
    <link rel="stylesheet" href="Index.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;1,400&display=swap"
      rel="stylesheet"
    />
  
    <div className="top-box">
      <div className="sidebar">
        <a className="home">
          <button onClick={() => router.push('/')}>
            Home
            </button>
            </a>
        <p className="features">Features</p>
        <p className="plans">Plans</p>
        <p className="why-us">Why Us?</p>
      </div>
    </div>

    {user ? (
    <div className = "flex gap-x-4 items-center"> 
      <button
        onClick={handleLogout}
        className="
        fixed
        top-[40px]
        right-[310px]
        bg-white 
        text-black 
        font-bold 
        px-9 
        py-4
        border-none
        rounded-lg
        "
      >
        Logout
      </button>
      <button
        onClick={() => router.push('/account')}
        className="
        bg-white
        fixed
        top-[40px]
        right-[450px]
        text-black  
        px-5 
        py-5
        border-none
        rounded-full"
      >

        <FaUserAlt />
      </button>
    </div>
    ):  ( 

    <div className="login-buttons">
      
      <button 

      onClick={authModal.onOpen} 
      
      className="sign-up"
      
      >Sign Up</button>

      <button 

      onClick={authModal.onOpen} 

      className="login"

      >Login</button>

    </div>
    )}  

      <div className = "mb-2 flex flex-col gap-y-6 mt-20 px-60">
        <h1 className="text-white text-3xl font-semibold px-1">
          Account Settings
        </h1>
      </div>
    <AccountContent />
  </>
  );
};


export default Account;
