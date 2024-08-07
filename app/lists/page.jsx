"use client";

import { useEffect, useState, createContext, useContext } from "react";

import { useRouter } from "next/navigation";

// Components
import Button from "../_components/Button";
import NoList from "../_components/NoList";
import Loader from "../_components/Loader";

// Constants
import { getListify } from "../_constants";

// Functions
import { formatedDate } from "../_functions";

// Context API
const ListsContext = createContext();
const DeleteMessageContext = createContext();

export default function Page() {
  const [shoppingList, setShoppingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const getListif =
        typeof window !== "undefined" && localStorage.getItem("listify");

      setShoppingList(JSON.parse(getListif));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="my-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {shoppingList?.length > 0 ? (
            <>
              {shoppingList
                ?.filter((s) => s !== "")
                ?.sort((a, b) => new Date(b.date) - new Date(a.date)).map((list, i) => (
                  <ListsContext.Provider key={i} value={{ data: list, setShoppingList }}>
                    <Lists />
                  </ListsContext.Provider>
                ))}
            </>
          ) : (
            <NoList />
          )}
        </>
      )}
    </div>
  );
}

function Lists() {
  const { data, setShoppingList } = useContext(ListsContext);
  const [displayDeleteMessage, setDisplayDeleteMessage] = useState(false);

  const navigate = useRouter();

  function editList() {
    navigate.push(`editList/${data.id}`);
  }

  return (
    <DeleteMessageContext.Provider
      value={{ displayDeleteMessage, setDisplayDeleteMessage, setShoppingList }}
    >
      <div className="overflow-x-scroll mx-[12rem] md:mx-4 sm:mx-0">
        <div className="rounded flex justify-between mb-2 w-fit">
          <div onClick={editList}>
            <div className="flex justify-between items-center w-screen p-3 bg-green-50">
              <p className="font-bold">{data?.shoppingCenter}</p>
              <p>{formatedDate(data?.date)}</p>
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
  const {setDisplayDeleteMessage, setShoppingList} = useContext(DeleteMessageContext);

  function deleteList() {

    const filteredList = JSON.parse(getListify).filter((list) => list.id !== id);

    localStorage.setItem("listify", JSON.stringify(filteredList));

    const getListif =
        typeof window !== "undefined" && localStorage.getItem("listify");

      setShoppingList(JSON.parse(getListif)); 

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

