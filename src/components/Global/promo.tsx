"use client";

import { useEffect, useState } from "react";
// import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import { CardType } from "@/models/promo_models";


export default function PromoPopup() {
  const [show, setShow] = useState(false);
  const [promo, setPromo] = useState<CardType[]>([])

useEffect(() => {
  const fetchDataAndCheckPopup = async () => {
    try {
      const res = await fetch('/api/promo'); // ⬅️ ambil data dari API internal
      const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapped = data.map((item: any) => ({
        price: item.price || '$0',
        title: item.title || 'No Title',
        title2: item.title2 || 'No Title2',
        desc: item.desc || 'No Description',
        image: item.image || [],
        list: item.list || [],
        image_bg: item.image_bg || '',
      }));

      setPromo(mapped);

      // ⏱️ Cek waktu kadaluarsa promo di localStorage
      const storedTime = localStorage.getItem("hasSeenPromo");
      const now = new Date().getTime();

      if (!storedTime || now > parseInt(storedTime)) {
        // Belum pernah lihat atau sudah expired
        setTimeout(() => {
          setShow(true);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };

  fetchDataAndCheckPopup();
}, []);


const handleClose = () => {
  const expiresAt = new Date().getTime() + 30 * 60 * 1000; // 30 menit dari sekarang
  localStorage.setItem("hasSeenPromo", expiresAt.toString());
  setShow(false);
};

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
     

      <div className="flex-center rounded-lg shadow-lg max-w-md w-full relative p-6 md:flex">


              <div
                className="w-full max-w-[20rem] md:max-w-[40rem] h-[250px] md:h-[300px] flex  flex-col justify-between items-center  bg-gradient-to-br from-white to-gray-50 text-black rounded-3xl p-4 pt-8 md:pt-2 md:p-8 shadow-2xl text-center relative overflow-hidden"
              >
                {/* Badge Promo */}
                <span className="absolute top-4 left-4 bg-slate-900 text-white text-[7px]  md:text-[9px] font-bold px-3 py-1 rounded-full shadow-md">
                  PROMO
                </span>

                        {/* Close Button */}
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={handleClose}
                >
                  <X />
                </button>

                <div className='flex flex-col justify-between items-center mt-1  md:mt-8'>
                    {/* Harga */}
                    {/* <p className="text-3xl font-extrabold text-[#a07c40] mb-3">{card.title}</p> */}

                    {/* Judul */}
                    <h3 className="text-[13px] md:text-sm font-semibold uppercase tracking-wide mb-2">
                      {promo[0].title2}
                    </h3>

                    {/* Deskripsi */}
                    <p className="text-gray-600 text-[9px] md:text-xs px-4 mb-8">{promo[0].desc}</p>

                    <div className=''>

                      <section>
                        

                        { promo[0].list.map((item, index) => (


                          <div key={index} className=' flex gap-5'>
                            
                            
                            <div className="w-full max-w-[6rem] md:max-w-[8rem] ">
                              <Image
                                src={promo[0].image[index].image}
                                alt="savoy icon"
                                width={180}
                                height={180}
                                className='rounded-lg'
                              />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-[10px] md:text-sm font-sans font-extrabold'>{ item.head }</h2>
                                {/* <h2 className='text-[10px] md:text-sm  font-light'>{ item.paragraph }</h2> */}
                                {/* <h2 className="text-[10px] md:text-sm ">{ item.value }</h2> */}
                            </div>
                          
                          </div>
                          
                        ))}

                      </section>

                    </div>


                </div>

                {/* Tombol */}
                {/* <Link href="/promo" className="z-50 bg-[#a07c40] hover:bg-[#a07a38] transition-colors duration-200 text-white font-bold px-3 md:px-4 py-2 text-[10px] md:text-[12px] rounded-full shadow-md mt-2 md:mt-5">
                    View
                </Link> */}
                <a href="#promo" onClick={handleClose} className="z-50 bg-[#a07c40] hover:bg-[#a07a38] transition-colors duration-200 text-white font-bold px-3 md:px-4 py-2 text-[10px] md:text-[12px] rounded-full shadow-md mt-2 md:mt-5">
                    View
                </a>

                {/* Background Shape */}
                <div className="absolute bottom-[-3rem] right-[-3rem] w-[120px] h-[120px] bg-[#907a54] rounded-full  z-0" />
                <div className="absolute bottom-[-3rem] right-[2rem] w-[120px] h-[120px] bg-[#a07c40] rounded-full opacity-30 z-0" />
                <div className="absolute bottom-[1rem] right-[-3rem] w-[120px] h-[120px] bg-[#a07c40] rounded-full opacity-30 z-0" />
              
              </div>


      </div>

    </div>
  );
}
