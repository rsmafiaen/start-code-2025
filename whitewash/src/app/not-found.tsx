import Image from "next/image";
import frawg from "@/assets/images/frog.png";

import { Header } from "@/components/header/Header";
import Link from "next/link";

export default function HeaderPage() {
  return (
    <div className="min-h-screen bg-[#fff] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="text-black">Ikke noe å se her.</span>
        <Link href="/">
          <Image src={frawg} alt="frog" height="300" />
        </Link>
      </div>
    </div>
  );
}
