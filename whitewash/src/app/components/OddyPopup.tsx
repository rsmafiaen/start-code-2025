"use client";

import Image, { type StaticImageData } from "next/image";
import oddy from "../assets/images/oddy.png";
import frog from "../assets/images/frog.png";
import styles from "./Oddy.module.css";
import { useEffect, useState } from "react";

export const OddyPopup = ({
  message = "Hei! Jeg er Oddy, kan jeg hjelpe deg med noe?",
  isRight = false,
}: {
  message?: string;
  isRight?: boolean;
}) => {
  const [isFrog, setIsFrog] = useState(false);
  const [avatar, setAvatar] = useState<StaticImageData>(oddy);
  const [name, setName] = useState<"Froggy" | "Oddy">("Oddy");

  useEffect(() => {
    const shouldBeFrog = Math.random() < 1 / 20;
    setIsFrog(shouldBeFrog);
    if (shouldBeFrog) {
      setAvatar(frog);
      setName("Froggy");
    }
  }, []);

  const bubbleTail = isRight
    ? "absolute -left-2 bottom-3 w-0 h-0 border-solid border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200"
    : "absolute -right-2 bottom-3 w-0 h-0 border-solid border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-200";

  return (
    <div
      className={`flex items-end gap-3 ${!isRight ? "flex-row-reverse" : ""}`}
    >
      <Image
        src={avatar}
        alt={`${name} avatar`}
        width={80}
        height={80}
        className={`rounded-full ${isFrog ? styles.spinSlow : ""}`}
      />
      <div className="relative bg-gray-200 px-4 py-3 rounded-lg text-gray-900 shadow">
        {isFrog ? message.replace(/\bOddy\b/g, "Froggy") : message}
        <div className={bubbleTail} />
      </div>
    </div>
  );
};
