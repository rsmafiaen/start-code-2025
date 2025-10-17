import Image from "next/image";
import Oddy from "./components/oddy";

export default function Home() {
  return (
    <div>
      <Image src="/images/frog.png" width={200} height={200} alt="frog." />
      <Oddy/>
    </div>
  );
}
