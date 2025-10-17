import Image from "next/image";
import frawg from "../../frog.png";

export default function Home() {
  return (
    <div>
      <Image src={frawg} alt="frog." />
    </div>
  );
}
