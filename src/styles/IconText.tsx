import Image from "next/image";

interface IconListItemProps {
  iconName: string;
  text: string;
}

const IconListItem: React.FC<IconListItemProps> = ({ iconName, text }) => {
  return (
    <li className="flex items-center gap-2">
      <Image
        src={`/assets/Icon/${iconName}.png`}
        alt={text}
        width={20}
        height={20}
      />
      <span>{text}</span>
    </li>
  );
};

export default IconListItem;
