import Image from "next/image";

type Props = {
  name: string;
  v:string;
  isActive: boolean;
  onClick: () => void;
};

const ControlButton = ({ name,v, isActive, onClick }: Props) => {
  const iconSrc = `image/icons/${name}-${isActive ? "on" : "off"}.svg`;

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs p-2 rounded-full transition `}
    >
      {/* <Image src={iconSrc} alt={name} width={32} height={32} /> */}
      <Image src={iconSrc} alt={name} width={32} height={32} />
      { !v && <span className="mt-1 capitalize">{name.replace("-", " ")}</span>}
    </button>
  );
};

export default ControlButton;
