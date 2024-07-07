import { useContext } from "react";

import Image from "next/image";

// Context API
import { HeaderContext } from "./Header";

// React Icons
import { MdClose } from "../_reactIcons";

// barcode
import Barcode from "../../public/barcode.gif";

export default function ShareApp() {
  const { showBarcode, dispatch } = useContext(HeaderContext);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0 ${
        showBarcode ? "z-30" : "z-[-1]"
      }`}
    >
      {showBarcode && (
        <div
          onClick={() =>
            dispatch({ type: "showBarcode", payload: { showB: false } })
          }
          className="bg-black opacity-35 absolute top-0 left-0 right-0 bottom-0"
        />
      )}
      <div
        className={`bg-white rounded-tl-lg rounded-tr-lg absolute ${
          showBarcode
            ? "bottom-0 transition-all duration-700 ease-in-out"
            : "bottom-[-100%]"
        } left-0 right-0`}
      >
        <div className="relative">
          <div className="w-[70%] mx-auto text-sm text-center pt-[2rem]">
            <p>
              Share the App with your loved ones by scanning the QR code below!
            </p>
          </div>
          <MdClose
            onClick={() =>
              dispatch({ type: "showBarcode", payload: { showB: false } })
            }
            className="absolute right-2 top-2 text-3xl"
          />
        </div>

        <div className="w-full">
          <Image
            className="mx-auto mb-[4rem] mt-[1rem] w-[50%] border-[.4rem] border-black p-[.4rem]"
            src={Barcode}
            alt="barcode"
            priority
          />
        </div>
      </div>
    </div>
  );
}
