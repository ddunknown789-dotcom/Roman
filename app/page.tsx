import Preloader from "@/components/Preloader";
import StageMount from "@/components/three/StageMount";
import Scrim from "@/components/Scrim";
import Nav from "@/components/site/Nav";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import GlobalRecognition from "@/components/sections/GlobalRecognition";
import Qualifications from "@/components/sections/Qualifications";
import Research from "@/components/sections/Research";
import PlusTechnique from "@/components/sections/PlusTechnique";
import Safety from "@/components/sections/Safety";
import Books from "@/components/sections/Books";
import MaskChapter from "@/components/sections/MaskChapter";
import Humanity from "@/components/sections/Humanity";
import Publications from "@/components/sections/Publications";
import Lectures from "@/components/sections/Lectures";
import Conferences from "@/components/sections/Conferences";
import Awards from "@/components/sections/Awards";
import Endorsements from "@/components/sections/Endorsements";
import MediaSocial from "@/components/sections/MediaSocial";
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
            "Regenerative Medicine",
            "Patient Safety",
            "The PLUS Technique™",
            "Humanitarian",
            "40+ Years",
          ]}
        />
        <GlobalRecognition />
        <Qualifications />
        <Research />
        <PlusTechnique />
        <Safety />
        <MaskChapter />
        <Humanity />
        <Books />
        <Publications />
        <Lectures />
        <Conferences />
        <Awards />
        <Endorsements />
        <MediaSocial />
        <Contact />
      </main>
    </>
  );
}
