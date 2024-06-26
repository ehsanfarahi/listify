"use client";

import { useEffect, useState } from "react";

// Components
import Button from "../_components/Button";

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);
  const [deleteList, setDeleteList] = useState(false);

  useEffect(() => {
    const getList = localStorage.getItem("listify");
    setShoppingList(JSON.parse(getList));
  }, []);

  return (
    <div className="">
      {shoppingList?.filter(s => s !== "")?.map((list, i) => (
        <Lists key={i} data={list} deleteList={deleteList} setDeleteList={setDeleteList} />
      ))}
    </div>
  );
}

function Lists({ data, deleteList, setDeleteList }) {
  return (
    <div className="border-[0.2rem] border-green-200 bg-green-50 m-4 rounded px-2 py-3">
      <div className="flex justify-between items-center">
        <p className="font-bold">{data?.shoppingCenter}</p>
        <DeleteList id={data?.id} deleteList={deleteList} setDeleteList={setDeleteList} />
        <p>{data?.date}</p>
      </div>
    </div>
  );
}

function DeleteList({ id, deleteList, setDeleteList }) {
  function deleteListData() {
    const getList =
      typeof window !== "undefined" && localStorage.getItem("listify");

    const filteredList = JSON.parse(getList).filter((list) => list.id !== id);

    localStorage.setItem("listify", JSON.stringify(filteredList));

    setDeleteList(true);
  }
  return (
    <div>
      <Button onClick={deleteListData}>Delete</Button>
    </div>
  );
}

// function List({ data }) {
//   return (
//     <div className="border-2 border-green-300 m-4 rounded p-2 aspect-square">
//       <div className="flex justify-between items-center">
//       <p className="font-bold">{data.at(0).shoppingCenter}</p>
//       <p>{data.at(0).date}</p>
//       </div>
//     </div>
//   );
// }
