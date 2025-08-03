


import PromoPopup from "@/components/Global/promo";
import Image from "next/image";



export default function Home() {
  

  return (

    <div>

      <PromoPopup/>

      <div className="relative flex justify-start items-start  w-full h-screen bg-home1 bg-no-repeat bg-cover bg-top font-balham ">

        <div className="flex flex-center px-2 md:px-4 py-4 md:py-8 mt-[3rem]">
   



        </div>

      </div>

      <div className="relative flex flex-col-reverse md:flex-row justify-around items-center  w-full h-screen">

        <div className="absolute w-[5rem] md:w-[6.8rem] bottom-0 -right-[3px] rotate-90">
          <Image
            src="/assets/Ornamen/ornamen_corner.png"
            alt="savoy image"
            width={122}
            height={132}
          />
        </div>

        <div className="flex flex-col justify-center items-center md1:items-start py-4 px-3 hp1:px-8  md:px-5 md:py-5 w-full md:w-[45rem] h-full gap-5">


            <h1 className="text-[16px] md:text-[24px] leading-tight text-center hp1:text-left text-[#9f8355] max-w-[20rem] font-balham">
              Discover a world of comfort
              and elegance
            </h1>

            <p className="text-[11px] hp1:text-[15px] font-light w-full md:max-w-[42rem] text-justify text-slate-500 dark:text-gray-300  ">
              Indulge in the epitome of luxury living with classic modern townhouses at Savoy Residences in Bintaro, 
              South Jakarta. Each residence is thoughtfully designed to provide unparalleled comfort and elegance, 
              with high-end finishes that create a serene atmosphere. Whether you`re unwinding in your living room or hosting 
              gatherings, you`ll relish the meticulous attention to detail. 
              Experience sophisticated living at Savoy Residences, a 3-storey home thoughtfully designed with a private pool for your daily escape.
            </p>


        </div>

        <div className="w-full hidden mini:flex justify-center items-center max-w-[20rem] hp4:max-w-[25rem] md:max-w-[33rem] pt-[4rem] p-2 md:p-5">
          <Image
            src="/assets/Image/home/discover.jpg"
            alt="MyApp Logo"
            width={580}
            height={580}
          />
        </div>    

      </div>


    </div>
  );
}
