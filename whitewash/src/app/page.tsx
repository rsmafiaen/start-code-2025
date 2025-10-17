import { Header } from "./components/header";
import { OddyPopup } from "./components/OddyPopup";

export default function Home() {
  return (
    <div>
      <Header />
      <OddyPopup message="Chat med meg" isRight={false} />
    </div>
  );
}
