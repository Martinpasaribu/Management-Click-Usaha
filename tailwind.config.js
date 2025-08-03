/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // untuk dark mode
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {


    screens: {
      
      'mini': '200px',
      // Layar Hp ukuran minimum       (Potrait)
      'hp': '370px',
      
      // Layar Hp ukuran Umum          (Potrait)
      'hp1': '388px',
      
      // Layar Hp ukuran maximum       (Potrait)
      'hp2': '425px',

      'hp3': '500px',
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      
      // Layar Hp ukuran Minumum       (Landscape)
      'hp4': '740px',

      'hpDesktop': '980px',

      // Layar Tablet ukuran Minumum   (Potrait)
      'md': '768px',

      'md1': '870px',
      // Layar Tablet ukuran Umum      (Landscape)
      'md2': '1160px',

      // Layar Tablet ukuran maximum   (Landscape)
      'md3': '1441px',


      // Layar Laptop ukuran Minumum
      'xl': '1024px',
      
      
      'xl2': '1356px',

      // Layar Laptop ukuran Maximum
      'xl3': '1536px',

      
      // Layar PC ukuran Minumum
      'pc': '1706px',

      // Layar Tablet ukuran Medium
      'pc1': '1920px',


      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '3xl': '1536px',
      // => @media (min-width: 1536px) { ... }


      // Tinggi layar minimum (Potrait)
      'h-hp': { raw: '(min-height: 350px)' }, 
      'h-hp1': { raw: '(min-height: 370px)' }, 
      'h-hp2': { raw: '(min-height: 390px)' }, 
      'h-hp4': { raw: '(min-height: 410px)' }, 
      'h-hp5': { raw: '(min-height: 430px)' }, 
      'h-hp6': { raw: '(min-height: 450px)' }, 
      'h-hp7': { raw: '(min-height: 470px)' }, 

      'h-sm': { raw: '(min-height: 600px)' }, 
      'h-sm1': { raw: '(min-height: 640px)' }, 

      'h-md': { raw: '(min-height: 758px)' },
      'h-md1': { raw: '(min-height: 798px)' },
      'h-md2': { raw: '(min-height: 820px)' },

      'h-lg': { raw: '(min-height: 900px)' },
      'h-xl': { raw: '(min-height: 1080px)' },



      // Tinggi layar maksimum
      'h-max-sm': { raw: '(max-height: 600px)' },
      'h-max-md': { raw: '(max-height: 768px)' },
      'h-max-md': { raw: '(max-height: 840px)' },
      'h-max-lg': { raw: '(max-height: 900px)' },
      'h-max-xl': { raw: '(max-height: 1080px)' },

      'h-max-hp': { raw: '(max-height: 350px)' }, 
      'h-max-hp1': { raw: '(max-height: 370px)' }, 
      'h-max-hp2': { raw: '(max-height: 390px)' }, 
      'h-max-hp4': { raw: '(max-height: 410px)' }, 
      'h-max-hp5': { raw: '(max-height: 430px)' }, 
      'h-max-hp6': { raw: '(max-height: 450px)' }, 


      // Breakpoint untuk global css
      'max-sm': { raw: '(max-width: 640px)' },
      'max-md': { raw: '(max-width: 768px)' },
      'max-md': { raw: '(max-width: 768px)' },
      'max-md': { raw: '(max-width: 768px)' },
    },
    
    extend: {
          
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
        great: ["Great Vibes", "cursive"],
        luxurious: ['Luxurious Script', 'cursive'],
        balham: ['Balham', 'sans-serif'],
      },
          
      boxShadow: {
        'main-glow': '0 1px 18px #A9C6EBFF ', 
        'sub-glow': '0 1px 2px #BCCFE7FF ', 
      },

      backgroundImage: {
        
        'home1': "url(/assets/Background/home/Page1.jpeg)",
        'home3': "url(/assets/Background/home/Page3.png)",
        'about': "url(/assets/Background/about/about.jpg)",
        'about2': "url(/assets/Background/about/1.jpg)",
        'home2': "url(/assets/Background/home/Page2.jpeg)",
        'pattern': "url(/assets/Ornamen/Savoy-Pattern.png)",
        'living_room': "url(/assets/Image/home/living_room.jpeg)",
        'discover': "url(/assets/Image/home/discover.jpg)",
        
      },

      keyframes: {
        fadeSlideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bawah: {
          '0%': { transform: 'translateY(100%)' }, /* Mulai dari di luar layar sebelah kanan */
          '100%': { transform: 'translateY(0%)' }, /* Akhir di luar layar sebelah kiri */
        },
      },

      animation: {
        fadeSlideDown: 'fadeSlideDown 0.4s ease-out forwards',
        bawah: 'bawah 1.5s ease-in-out ',
      },

    },
  },
  plugins: [],
};
