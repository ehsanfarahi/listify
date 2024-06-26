"use client"

import { useReducer, createContext, useContext } from "react";
import Link from "next/link";

// React Icons
import {FcTodoList, BiMenuAltRight} from "../_reactIcons"

// Constants
import { appName } from "../_constants";

// Components
import {Navigation} from "./Navigation";

// useReducer
const initialState = {
  showMenu: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "showMenu":
      return {
        ...state,
        showMenu: action.payload,
      };
    default:
      throw new Error("Action unknown");
  }
}

// Context API
const HeaderContext = createContext();

function Header() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {showMenu} = state;

  return (
    <HeaderContext.Provider value={{showMenu, dispatch}}>
      <HeaderContent />
      <Navigation /> 
    </HeaderContext.Provider>
  );
}

function HeaderContent() {
    const {dispatch} = useContext(HeaderContext);

  return (
    <div className="flex justify-between items-center bg-blue-50 p-2 shadow z-20">
      <Link href="/">
        <FcTodoList className="text-3xl" />
      </Link>
      <Link href="/">
        <p className="text-green-500 font-semibold text-xl">{appName}</p>
      </Link>
      <BiMenuAltRight onClick={() => dispatch({ type: "showMenu", payload: true })} className="text-3xl text-blue-500 cursor-pointer" />
    </div>
  );
}

export {Header, HeaderContext};
