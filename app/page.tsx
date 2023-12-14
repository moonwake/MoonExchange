// Use if statement with "return authModal.onOpen()" for login verification on a button
// Use if statement with "return subscribeModal.onOpen()" for subscription verification on a button

"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { SupabaseClient, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";

interface HomeProps {
  children: React.ReactNode;
  className?: string; 
}

const Home: React.FC<HomeProps> = ({
  children,
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

{
  return ( <>
  <link rel="stylesheet" href="Index.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;1,400&display=swap"
    rel="stylesheet"
  />

  <div className="top-box">
    <div className="sidebar">
      <a className="home">Home</a>
      <p className="features">Features</p>
      <p className="plans">Plans</p>
      <p className="why-us">Why Us?</p>
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
  </div>
  <div className="welcome-panel">
    <div className="home-text-button">
      <div className="title-text">Fast and Reliable Crypto Trading</div>
      <div className="title-sub-text">
        We provide the tools to buy and sell more currencies than any other
        marketplace.
      </div>
      <div>
        <button className="start-trading"
        
        >Start Trading</button>
      </div>
      <div className="logos">
        <div className="eth-logo"></div>
        <div className="btc-logo"></div>
        <div className="usdt-logo"></div>
      </div>
    </div>
    
    <div className="home-image"></div>

  </div>
</>
  )
}
}

export default Home;
