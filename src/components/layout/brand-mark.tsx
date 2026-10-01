import logoBlack from "@/assests/logoblack.png";
import logoWhite from "@/assests/logowhite.png";
import { useTheme } from "./layout-context";

export function BrandMark({
  size = 36,
}: {
  size?: number;
}) {
  const { dark } = useTheme();
  const logo = dark ? logoWhite : logoBlack;

  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      className="block select-none object-contain"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
