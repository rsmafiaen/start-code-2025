import Image from "next/image";
import frawg from "../../frog.png";
import { Header } from "../components/header";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Image src={frawg} alt="frog." />
    </div>
  );
}
