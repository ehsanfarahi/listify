"use client";

import Image from "next/image";
import { useState, useEffect, createContext, useContext } from "react";

import { useRouter } from "next/navigation";

// Images
import HomeListBgImage from "/public/kart3.jpg";

// Components
import NoList from "./_components/NoList";

const HomeListContext = createContext();

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const getList = localStorage.getItem("listify");
    setShoppingList(JSON.parse(getList));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 mx-2 my-4">
      {shoppingList.length > 0 ? (
        <>
          {shoppingList?.map((list, i) => (
            <HomeListContext.Provider key={i} value={{ list }}>
              <List />
            </HomeListContext.Provider>
          ))}{" "}
        </>
      ) : (
        <NoList />
      )}
    </div>
  );
}

function List() {
  const { list } = useContext(HomeListContext);

  const navigate = useRouter();

  function viewList() {
    navigate.push(`viewList/${list.id}`);
  }

  return (
    <div
      onClick={viewList}
      className="border-2 border-green-300 rounded p-2 aspect-square relative "
    >
      <div className="flex justify-between items-center z-20">
        <p className="font-bold bg-green-200 rounded-xl px-2 whitespace-nowrap overflow-hidden">
          {list.shoppingCenter}
        </p>
        <p className="bg-green-200 text-sm rounded-xl px-2">{list.date}</p>
      </div>
      <Image
        className="-z-10"
        priority
        sizes="100"
        src={HomeListBgImage}
        fill
        alt="List"
      />
    </div>
  );
}
