import Link from "next/link";
import { Header } from "./components/header";
import { OddyPopup } from "./components/OddyPopup";

export default function Home() {
  return (
    <div>
      <Header />
      <Link href="/dmOddy" className="fixed bottom-6 right-6 z-50 block">
        <OddyPopup message="DM meg" isRight={false} />
      </Link>
    </div>
  );
}
