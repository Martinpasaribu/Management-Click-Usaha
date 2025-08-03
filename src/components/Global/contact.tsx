"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from '@/lib/hooks/hooks'
import { ContactModels } from "@/models/contact_models";
import { addContact } from "@/lib/slice/contactSlice";
import toast from 'react-hot-toast';


interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  value: boolean;
}

export default function ContactModal({ open, onClose, value }: ContactModalProps) {

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [contact, setContact] = useState<ContactModels>({
    name: '',
    email: '',
    phone: 0,
    message: '',
  });

  // const { isLoading, isError } = useAppSelector((state) => state.contact)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        if (contact.message === '') {
          toast.error('Pesan tidak boleh kosong!');
          return;
        }
    
        setIsLoading(true);

        try {

            e.preventDefault();
            await dispatch(addContact(contact)).unwrap();

            toast.success('Pesan berhasil dikirim!');
            onClose(); // Tutup modal
            
            setContact({ name: '', email: '', phone: 0,  message: '' });
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err:any) {

            // tampilkan error dari backend jika ada
            const errorMessage = err || 'Gagal mengirim pesan. Silakan coba lagi.';
            toast.error(errorMessage);

        } finally {
          setIsLoading(false);
        }
        
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Validasi angka (hanya izinkan digit)
        if (name === 'phone' && !/^\d*$/.test(value)) {
            return; // Abaikan input jika tidak valid
        }

        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
      };


    useEffect(() => {
      if (!open) return;
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [open, onClose]);

    if (!open) return null;

  return (
    <div
      // className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50"
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-b from-black/30 to-black/80 "
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Contact Us
          {value === false && <span className="text-purple-500 text-[11px] bg-purple-50 border-[1px] border-purple-300 rounded-md p-1 ml-4"> With Promo</span>}
        </h2>
        
        <form
          onSubmit={handleSubmit} className="text-sm"
        >
          <input
            type="text" 
            name="name" 
            id="name" 
            value={contact.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full mb-3 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:border-[#a38b61]"
          />

          <input
            type="email" 
            name="email" 
            id="email" 
            value={contact.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full mb-3 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:border-[#a38b61]"
          />

          <input
            type="tel" 
            pattern="\d{10,15}" 
            name="phone" id="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full mb-3 px-4 py-2 border rounded text-slate-400 dark:bg-gray-400 dark:text-white focus:border-[#a38b61]"
          />
          <textarea
            id="message" 
            name="message" 
            rows={4} 
            placeholder="Write your thoughts here..."
            required
            value={contact.message}
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2 border rounded dark:bg-gray-700 dark:text-white focus:border-[#a38b61]"
            
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#a38b61] text-white py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#aa8b55]'}`}
          >
            {isLoading ? 'Mengirim...' : 'Send'}
          </button>

        </form>
      </div>
    </div>
  );
}
