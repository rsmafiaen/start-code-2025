import Image from "next/image";
import { Oddy } from "./components/oddy";
import frog from "./assets/images/frog.png";

export default function Home() {
  return (
    <div>
      <Image src={frog} width={200} height={200} alt="frog." />
      <Oddy />
    </div>
  );
}
