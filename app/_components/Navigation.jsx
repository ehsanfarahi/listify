"use client";

import { createContext, useContext } from "react";

// React Icons
import { MdClose } from "../_reactIcons";

// Constants
import { menuData } from "../_constants";

// Context API
const MenuLinkContext = createContext();
import { HeaderContext } from "./Header";

// Components
import MenuLink from "./MenuLink";

function Navigation() {
  // Consume Context API
  const { showMenu, dispatch } = useContext(HeaderContext);

  return (
    <div
      className={`flex flex-col bg-green-100 shadow fixed ${
        showMenu ? "right-0" : "right-[-3rem]"
      } transition-all duration-700 ease-in-out top-0 bottom-0 w-[3rem] z-30`}
    >
      <MdClose
        onClick={() => dispatch({ type: "showMenu", payload: false })}
        className="text-[1.7rem] cursor-pointer absolute left-[50%] translate-x-[-50%] top-2"
      />
      <MenuLinks />
    </div>
  );
}

function MenuLinks() {
  const { dispatch } = useContext(HeaderContext);

  return (
    <div className="mt-[5rem] rotate-[90deg] whitespace-nowrap text-lg flex gap-5">
      <MenuLinkContext.Provider value={{ dispatch }}>
        {menuData.map((menu) => (
          <MenuLink key={menu.menuList} url={menu.menuNavigation}>
            {menu.menuList}
          </MenuLink>
        ))}
      </MenuLinkContext.Provider>
      <p onClick={()=>dispatch({type: "showBarcode", payload: {showM: false, showB: true}})} className="cursor-pointer">Share App</p>
    </div>
  );
}

export { Navigation, MenuLinkContext };
