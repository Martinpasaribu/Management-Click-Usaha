// components/Footer.tsx
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white text-sm font-balham ">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col hp4:flex-row justify-between items-center gap-8">
       
        {/* Logo dan Label */}
        <div className="flex flex-col items-center md:items-start pt-5">
          <Image
            src="/assets/Icon/Main/logo_name.png"
            alt="MyApp Logo"
            width={182}
            height={202}
          />
        </div>

        {/* Sitemaps */}
        {/* <div>
          <h3 className="font-semibold mb-4">Sitemaps</h3>
          <ul className=" text-gray-400 text-light flex flex-row md:flex-col w-full justify-around md:justify-start md:items-start items-center">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/unit" className="hover:underline">The Unit</a></li>
            <li><a href="/promo" className="hover:underline">Promo</a></li>
          </ul>
        </div> */}

        {/* Contact */}
        <div className="mt-5 w-full max-w-[30rem]">
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <p className="mb-2 text-gray-400">Jl. Pembangunan Bar. No.25, RT.4/RW.10, Bintaro, Kec. Pesanggrahan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12330</p>
          <p className="text-gray-400 mb-3">0811-9000-0777</p>
          
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/6281190000777"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-center gap-5 w-full max-w-[13rem] bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-2 rounded-md transition"
          >
            Contact via WhatsApp <span><FaWhatsapp /></span>
          </a>
        </div>

      </div>

      <div className="border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs mb-3 md:mb-0">&copy; 2025 Savoy Residence Official Website.</p>
          <div className="flex space-x-4 text-lg">
            <a href="https://www.facebook.com/people/Savoy-Residences/61551103118837/?_rdr" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/savoyresidences" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/6281190000777" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
