import Image from "next/image";
import frawg from "../../frog.png";
import { Header } from "../components/header";
import { Oddy } from "./components/oddy";

export default function Home() {
  return (
    <div>
      <Header />
      <Oddy />
    </div>
  );
}
