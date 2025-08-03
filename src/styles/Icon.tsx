import Image from "next/image";

interface IconProps {
  iconName: string;
  size: string; // Misalnya "w-6 h-6" atau "w-8 h-8" (dalam kelas Tailwind)
}

const Icon: React.FC<IconProps> = ({ iconName, size }) => {
  return (
    <Image
      src={`/assets/Icon/${iconName}.png`}
      alt={iconName}
      width={20}
      height={20}
      className={size} // Ukuran diatur lewat Tailwind class
    />
  );
};

export default Icon;
