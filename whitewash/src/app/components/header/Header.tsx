"use client";

import Image from "next/image";
import logo from "@public/header-icons/logo-slogan.svg";
import dinner from "@public/header-icons/dinner.svg";
import sale from "@public/header-icons/sale.svg";
import gps from "@public/header-icons/gps.svg";
import globe from "@public/header-icons/globe.svg";
import { HeaderItem } from "./HeaderItem";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCartModal } from "./ShoppingCartModal";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-[100px] bg-[#023ea5] flex flex-row items-center justify-evenly px-5 text-white gap-5">
      <Link href="/">
        <Image src={logo} alt={"REMA 1000"} />
      </Link>

      <div className="flex-3 flex flex-row items-center justify-evenly text-white">
        <HeaderItem img={dinner} link="oppskrifter" title="Oppskrifter" />
        <HeaderItem img={sale} link="tilbud" title="Tilbud og kampanjer" />
        <HeaderItem img={gps} link="butikker" title="Butikker" />
        <HeaderItem img={globe} link="ansvar" title="Vårt ansvar" />
      </div>

      <div className="flex-3 max-w-[350px]">
        <input
          name="search"
          className="bg-white w-full rounded text-black p-3 placeholder-gray-600"
          placeholder="Søk på rema.no"
        />
      </div>
      <div>
        <span onClick={() => setOpen(!open)} className="cursor-pointer">Handleliste</span>
      </div>
      {open && <ShoppingCartModal />}
    </div>
  );
};
