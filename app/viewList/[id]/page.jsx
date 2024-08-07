"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// React Icons
import { MdKeyboardBackspace } from "../../_reactIcons";

// Components
import Loader from "@/app/_components/Loader";

// Constants
// import { getListify } from "@/app/_constants";

export default function Page({ params }) {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useRouter();

  const { id } = params;

  useEffect(() => {
    try {
      const getList =
        typeof window !== "undefined" && localStorage.getItem("listify");

      const list = JSON.parse(getList).filter((list) => list.id === Number(id));
      setListData(list.at(0));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <div className="p-4 mb-12 fixed top-0 right-0 bottom-0 left-0 bg-white overflow-y-auto">
      <div
        onClick={() => navigate.back()}
        className="cursor-pointer flex items-center"
      >
        <MdKeyboardBackspace className="text-[1.7rem]" />
        <p className="pl-2 text-sm">Go back</p>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="border-b-2 border-dashed border-green-300 text-center pb-2 font-bold text-lg mt-2">
            {listData?.shoppingCenter}
          </div>
          <div className="mt-4">
            {listData?.list?.map((item, i) => (
              <ItemDisplay key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ItemDisplay({ item }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center relative w-fit">
      <input type="checkbox" id="item" onClick={() => setChecked((i) => !i)} />
      <p
        className={`pl-3 ${
          checked &&
          " after:w-full after:h-[.1rem] after:content-[''] after:bg-gray-500 text-gray-500 after:absolute after:top-[50%] after:left-4"
        }`}
      >
        {item}
      </p>
    </div>
  );
}
