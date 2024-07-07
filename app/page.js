"use client";

import Image from "next/image";
import { useState, useEffect, createContext, useContext } from "react";

import { useRouter } from "next/navigation";

// Images
import HomeListBgImage from "/public/kart3.jpg";

// functions
import { formatedDate, getSchedule } from "./_functions";

// Components
import NoList from "./_components/NoList";
import Loader from "./_components/Loader";

const HomeListContext = createContext();

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getList = localStorage.getItem("listify");
      setShoppingList(JSON.parse(getList));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {getSchedule(shoppingList) && <p className="px-2 text-lg mt-2">Today</p>}
      <div className="grid grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2 mx-[12rem] md:mx-4 sm:mx-2 my-10 md:my-4 sm:my-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {shoppingList?.length > 0 ? (
              <>
                {shoppingList
                  ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((list, i) => (
                    <HomeListContext.Provider key={i} value={{ list }}>
                      <List />
                    </HomeListContext.Provider>
                  ))}{" "}
              </>
            ) : (
              <NoList />
            )}
          </>
        )}
      </div>
    </>
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
      className="border-2 border-green-300 rounded p-2 aspect-square relative cursor-pointer"
    >
      <div className="flex justify-between items-center z-20 gap-1">
        <p className="font-bold bg-green-200 rounded-xl px-2 whitespace-nowrap overflow-hidden">
          {list.shoppingCenter}
        </p>
        <p className="bg-green-200 text-sm rounded-xl px-2">
          {formatedDate(list.date)}
        </p>
      </div>
      <Image
        className="-z-10"
        priority
        placeholder="blur"
        sizes="100"
        src={HomeListBgImage}
        fill
        alt="List"
      />
    </div>
  );
}
