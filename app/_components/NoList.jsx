import Image from "next/image";

import { useRouter } from "next/navigation";

// Images
import listImage from "@/public/list2.png";

// React Icons
import { FaCirclePlus } from "../_reactIcons";

// Components
import Button from "./Button";

export default function NoList() {
  const navigate = useRouter();

  return (
    <div className=" absolute left-[50%] translate-x-[-50%] text-center w-[85%] mx-auto top-[20%]">
      <Image
        src={listImage}
        alt="list"
        placeholder="blur" 
        className="w-[10rem] aspect-square mx-auto"
      />
      <p className="text-center mt-4 uppercase font-semibold">No lists found</p>
      <p className="mt-4">
        You have not created any list yet, tap on the button to create one now.
      </p>
      <Button
        onClick={() => navigate.push("/createList")}
        customStyle="mt-4 bg-blue-200 rounded py-2 px-4 text-slate-700 font-semibold flex items-center mx-auto"
      >
        <FaCirclePlus className="mr-2 text-lg" />
        Create a list
      </Button>
    </div>
  );
}
