import Image from "next/image";
import oddy from "../assets/images/oddy.png";

export const Oddy = ({
  message = "Hei! Jeg er Odd Reitan, kan jeg hjelpe deg med noe?",
}: {
  message?: string;
}) => {
  return (
    <div className="flex items-end space-x-3">
      <Image
        src={oddy}
        alt="Oddy avatar"
        width={80}
        height={80}
        className="rounded-full"
      />
      <div className="relative bg-gray-200 px-4 py-3 rounded-lg text-gray-900 shadow">
        {message}
        <div className="absolute -left-2 bottom-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200" />
      </div>
    </div>
  );
};
