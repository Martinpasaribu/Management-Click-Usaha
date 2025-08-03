"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/lib/slice/themeSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import ContactModal from "@/components/Global/contact"; // ✅ Import komponen global
import { useEffect } from "react"; // sudah implicit, tapi pastikan ada


export default function Navbar() {
  
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [isOpen, setIsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // ✅ modal state

  const toggleMenu = () => setIsOpen(!isOpen);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);



  return (
    <>

        <nav
          className={`hidden md:block fixed top-0 left-0 w-full z-50 px-20 transition-colors duration-300 ${
            scrolled
              ? "bg-[#fffefbcc]/10 shadow-sm dark:bg-[rgb(238,238,238)] backdrop-blur text-[#a48f6c]"
              : "bg-[#fffefbcc]/10 dark:bg-[rgb(16_24_32)/0.3] text-[#fff] "
          } p-2`}
        >
      
        <div className="flex justify-between items-center max-w-8xl mx-auto">
          <Link href="/" className="font-bold text-lg">
            <Image
              src="/assets/Icon/Main/logo_name.png"
              alt="MyApp Logo"
              width={112}
              height={132}
            />
          </Link>

          <div className="flex gap-4 items-center text-[11px] font-semibold ">
            {/* <Link href="/">HOME</Link>
            <Link href="/about">ABOUT US</Link>
            <Link href="/unit">THE UNIT</Link>
            <Link href="/location">LOCATION</Link> */}
            <a href="#unit">UNIT</a>
            <a href="#location">LOCATION</a>
            <a href="#about">ABOUT</a>
            {/* <a href="#promo">PROMO</a> */}
            <button onClick={() => setIsContactOpen(true)}>CONTACT US</button> {/* ✅ */}
           
            <button className="relative inline-block w-[2.5rem] h-8 flex-center">
              <a href="#promo">PROMO</a>

              <span className="absolute -top-1 -right-5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                New
              </span>
            </button>

            
            {/* <Link href="/partner">NEWS AND UPDATE</Link> */}
           
            {/* <Link href="/promo" className="relative inline-block w-[2.5rem] h-8 flex-center">
              Ikon lonceng
              <h1>PROMO</h1>

              Badge PROMO
              <span className="absolute -top-1 -right-5 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                New
              </span>
            </Link> */}

            <button
              onClick={() => dispatch(toggleTheme())}
              className="bg-[#b7965d] hidden text-white dark:bg-gray-700 dark:text-white px-2 py-1 mx-2 rounded"
            >
              {mode === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>

        </div>

      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-[999]  bg-white/30 dark:bg-[rgb(16_24_32)/0.3] text-white p-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            <Image
              src="/assets/Icon/Main/logo_name.png"
              alt="MyApp Logo"
              width={48}
              height={48}
            />
          </Link>

          <button onClick={toggleMenu}>
            {isOpen ? (
              <X className="w-6 h-6 text-slate-800" />
            ) : (
              <Menu className="w-6 h-6 text-slate-800" />
            )}
          </button>
        </div>

        {/* Drawer Mobile */}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-[#a07c40] text-white z-[999] transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-600">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={toggleMenu}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-4 font-semibold">

            {/* 
              <Link href="/" onClick={toggleMenu}>Home</Link>
              <Link href="/about" onClick={toggleMenu}>About</Link>
              <Link href="/unit" onClick={toggleMenu}>The Unit</Link>
              <Link href="/promo" onClick={toggleMenu}>Promo</Link>
              <Link href="/location" onClick={toggleMenu}>Location</Link> 
            */}
            
            <a href="#unit">UNIT</a>
            <a href="#location">LOCATION</a>
            <a href="#about">ABOUT</a>
            <a href="#promo">PROMO</a>
            <button className="bg-white text-slate-700 rounded-md p-1"
              onClick={() => { setIsContactOpen(true);  toggleMenu(); }}
            >
              Contact
            </button>
            <button
              onClick={() => {
                dispatch(toggleTheme());
                toggleMenu();
              }}
              className="bg-white hidden text-black dark:bg-gray-700 dark:text-white px-2 py-1 rounded"
            >
              {mode === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

      </nav>

      {/* Spacer */}
      {/* <div className="h-[80px] md:h-[80px]" /> */}

      {/* ✅ Reusable Contact Modal */}
      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} value={true}  />
    </>
  );
}
