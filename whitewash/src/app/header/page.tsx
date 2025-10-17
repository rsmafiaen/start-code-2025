import Image from "next/image";
import frawg from "../../../frog.png";

import { Header } from "../../components/header";


export default function HeaderPage() {
  return (
    <div className="min-h-screen bg-[#fff] flex flex-col">
        <Header></Header>
        <div className="flex-1 flex flex-col justify-center items-center">
            <span className="text-black">
            Ikke noe å se her.
            </span>
            <Image src={frawg} alt="frog" height='300'/>
        </div>
    </div>
  );
}
