import Link from "next/link";
import { useContext } from "react";
import { usePathname } from "next/navigation";

// Context API
import { MenuLinkContext } from "./Navigation";

export default function MenuLink({ children, url }) {
  const pathName = usePathname();

  const { dispatch } = useContext(MenuLinkContext);

  return (
    <Link
      onClick={() => dispatch({ type: "showMenu", payload: false })}
      href={url}
      className={`cursor-pointer rounded px-2 ${
        pathName === url && "bg-green-300"
      }`}
    >
      {children}
    </Link>
  );
}
