import 'bootstrap/dist/css/bootstrap.min.css';
import CenterInfoCard from "@/components/home/CenterInfo";
import SearchMain from "@/components/home/MainSearch";
import ContactForm from "@/components/home/Contact";

export default function Home() {
  return (
    <main>
      <SearchMain/>
      <ContactForm/>
      <CenterInfoCard />
    </main>
  );
}
