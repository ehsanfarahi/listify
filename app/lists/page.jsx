"use client";

import { useEffect, useState, createContext, useContext } from "react";

import { useRouter } from "next/navigation";

// Components
import Button from "../_components/Button";
import NoList from "../_components/NoList";

// Constants
import { getListify } from "../_constants";

// Context API
const ListsContext = createContext();
const DeleteMessageContext = createContext();

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const getListif =
      typeof window !== "undefined" && localStorage.getItem("listify");

    setShoppingList(JSON.parse(getListif));
  }, []);

  return (
    <div className="my-4">
      {shoppingList.length > 0 ? <>
        {shoppingList
        ?.filter((s) => s !== "")
        ?.map((list, i) => (
          <ListsContext.Provider key={i} value={{ data: list }}>
            <Lists />
          </ListsContext.Provider>
        ))}
      </> : <NoList />}
    </div>
  );
}

function Lists() {
  const { data } = useContext(ListsContext);
  const [displayDeleteMessage, setDisplayDeleteMessage] = useState(false);

  const navigate = useRouter();

  function editList() {
    navigate.push(`editList/${data.id}`);
  }

  return (
    <DeleteMessageContext.Provider
      value={{ displayDeleteMessage, setDisplayDeleteMessage }}
    >
      <div className="overflow-x-scroll">
        <div className=" rounded flex justify-between mb-2 w-fit">
          <div onClick={editList}>
            <div className="flex justify-between items-center w-screen p-3 bg-green-50">
              <p className="font-bold">{data?.shoppingCenter}</p>
              <p>{data?.date}</p>
            </div>
          </div>
          <div
            onClick={() => setDisplayDeleteMessage(true)}
            className=" w-[5rem] bg-red-500"
          >
            <DeleteList />
          </div>
        </div>
        {displayDeleteMessage && <DeleteMessage id={data?.id} />}
      </div>
    </DeleteMessageContext.Provider>
  );
}

function DeleteList() {
  const {setDisplayDeleteMessage} = useContext(DeleteMessageContext);
  function deleteListData() {
    setDisplayDeleteMessage(true);
  }
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Button customStyle="font-semibold px-2" onClick={deleteListData}>Delete</Button>
    </div>
  );
}

function DeleteMessage({ id }) {
  const {setDisplayDeleteMessage} = useContext(DeleteMessageContext);

  function deleteList() {

    const filteredList = JSON.parse(getListify).filter((list) => list.id !== id);

    localStorage.setItem("listify", JSON.stringify(filteredList));

    cancelDelete();

  }

  function cancelDelete() {
    setDisplayDeleteMessage(false);
  }

  return <div className="fixed top-0 left-0 bottom-0 right-0">
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-35" />
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[60%] rounded p-4 bg-white">
      <p className="font-semibold text-sm">Are you sure, you want to delete this list?</p>
      <div className="flex justify-between gap-2 items-center mt-6">
      <Button onClick={cancelDelete} customStyle="bg-orange-300 font-semibold rounded p-1 w-full">Cancel</Button>
        <Button onClick={deleteList} customStyle="bg-green-300 font-semibold rounded p-1 w-full">Yes</Button>
      </div>
    </div>
  </div>
}

