import Image from "next/image";

// Loading Icon
import LoadingIcon from "../../public/spinner.svg";

export default function Loader() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0">
      <div className="bg-black opacity-20 absolute top-0 right-0 bottom-0 left-0" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Image src={LoadingIcon} className="w-[5rem]" alt="Loading..." />
      </div>
    </div>
  );
}
