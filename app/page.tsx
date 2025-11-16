import Footer from "@/src/component/footer";
import Header from "@/src/component/header";
import MainComponent from "@/src/component/main";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <MainComponent />
      </main>
      <Footer />
    </div>
  );
}
