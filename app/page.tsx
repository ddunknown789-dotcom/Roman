import Preloader from "@/components/Preloader";
import StageMount from "@/components/three/StageMount";
import Scrim from "@/components/Scrim";
import Nav from "@/components/site/Nav";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Books from "@/components/sections/Books";
import MaskChapter from "@/components/sections/MaskChapter";
import Humanity from "@/components/sections/Humanity";
import Recognition from "@/components/sections/Recognition";
import Quote from "@/components/sections/Quote";
import Contact from "@/components/sections/Contact";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <StageMount />
      <Scrim />
      <Nav />

      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <Story />
        <Marquee
          items={[
            "Behind the Mask",
            "The Needle & The Damage Done",
            "Aesthetic Medicine",
            "Humanitarian",
          ]}
        />
        <Books />
        <MaskChapter />
        <Humanity />
        <Recognition />
        <Quote />
        <Contact />
      </main>
    </>
  );
}
