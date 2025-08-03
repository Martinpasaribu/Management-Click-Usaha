import Image from "next/image";

interface IconProps {
  iconName: string;
  size: string; // Misalnya "w-6 h-6" atau "w-8 h-8" (dalam kelas Tailwind)
}

const Images: React.FC<IconProps> = ({ iconName, size }) => {
  return (
    <Image
      src={`/assets/Image/${iconName}.png`}
      alt={iconName}
      width={1000}
      height={1000}
      className={size} // Ukuran diatur lewat Tailwind class
    />
  );
};

export default Images;
