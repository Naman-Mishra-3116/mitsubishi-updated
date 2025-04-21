import Image from "next/image";
import { ICONS } from "@/assets/icons";
import { CSSProperties, memo } from "react";
import { IMAGES } from "@/assets/images";
export type TImages = keyof typeof IMAGES;
export type TIcons = keyof typeof ICONS;

interface IProps {
  name?: TImages | TIcons;
  url?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  style?: CSSProperties;
}

const MImage = ({
  name,
  alt,
  className,
  width,
  height,
  url,
  onClick,
  style,
}: IProps) => {
  return (
    <Image
      src={url ?? IMAGES[name as TImages] ?? ICONS[name as TIcons]}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      placeholder="empty"
      onClick={onClick}
      quality={100}
      style={style}
    />
  );
};

export default memo(MImage);
