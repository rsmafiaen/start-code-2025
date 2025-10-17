import Image from "next/image";
import oddy from "../assets/images/oddy.png";
import frog from "../assets/images/frog.png";
import styles from "./Oddy.module.css";

export const Oddy = ({
  message = "Hei! Jeg er Oddy, kan jeg hjelpe deg med noe?",
}: {
  message?: string;
}) => {
  const isFrog = Math.random() < 1 / 20;
  const avatar = isFrog ? frog : oddy;
  const name = isFrog ? "Froggy" : "Oddy";
  if (isFrog) {
    message = message.replaceAll("Oddy", "Froggy");
  }

  return (
    <div className="flex items-end space-x-3">
      <Image
        src={avatar}
        alt={`${name} avatar`}
        width={80}
        height={80}
        className={`rounded-full ${isFrog ? styles.spinSlow : ""}`}
      />
      <div className="relative bg-gray-200 px-4 py-3 rounded-lg text-gray-900 shadow">
        {message}
        <div className="absolute -left-2 bottom-3 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200" />
      </div>
    </div>
  );
};
