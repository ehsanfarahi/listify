"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// React Icons
import { MdKeyboardBackspace, MdDelete } from "../../_reactIcons";

// Constants
import { getListify } from "@/app/_constants";
import Button from "@/app/_components/Button";

// Components
import Loader from "@/app/_components/Loader";

export default function Page({ params }) {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useRouter();

  const { id } = params;

  useEffect(() => {
    try {
      const list = JSON.parse(getListify).filter(
        (list) => list.id === Number(id)
      );
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
  return (
    <div className="flex items-center relative w-full mb-1 justify-between">
      <p className={`pl-3`}>{item}</p>
      <div>
        <Button customStyle="text-slate-700 text-2xl">
          <MdDelete />
        </Button>
      </div>
    </div>
  );
}
