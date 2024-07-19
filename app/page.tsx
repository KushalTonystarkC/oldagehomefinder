'use client'
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import CenterInfoCard from "@/components/home/CenterInfo";
import Contact from "@/components/home/Contact";
import SearchMain from "@/components/home/MainSearch";

export default function Home() {
  return (
    <main>
      <SearchMain/>
      <Contact/>
      <CenterInfoCard />
    </main>
  );
}
