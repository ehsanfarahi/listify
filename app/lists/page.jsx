"use client";

import { useEffect, useState, createContext, useContext } from "react";

// Components
import Button from "../_components/Button";

// Context API
const ListsContext = createContext();

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);
  

  useEffect(() => {
    const getList = localStorage.getItem("listify");
    setShoppingList(JSON.parse(getList));
  }, []);

  return (
    <div className="my-4">
      {shoppingList?.filter(s => s !== "")?.map((list, i) => (
        <ListsContext.Provider key={i} value={{data: list}}>
          <Lists />
        </ListsContext.Provider>
      ))}
    </div>
  );
}


function Lists() {
  const {data} = useContext(ListsContext);
  return (
    <div className="overflow-x-scroll">
      <div className=" rounded flex justify-between  w-fit">
      <div className="border-t-[0.2rem] border-green-200">
      <div className="flex justify-between items-center w-screen p-3 bg-green-50 border-b-[0.2rem] border-green-200">
        <p className="font-bold">{data?.shoppingCenter}</p>
        <p>{data?.date}</p>
      </div>
      </div>
      <div className=" w-[5rem] bg-red-500"><DeleteList id={data?.id} /></div>
    </div>
    </div>
  );
}

function DeleteList({ id }) {
  function deleteListData() {
    const getList =
      typeof window !== "undefined" && localStorage.getItem("listify");

    const filteredList = JSON.parse(getList).filter((list) => list.id !== id);

    localStorage.setItem("listify", JSON.stringify(filteredList));

  }
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Button customStyle="font-semibold px-2" onClick={deleteListData}>Delete</Button>
    </div>
  );
}


