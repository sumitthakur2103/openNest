import Navbar from "../components/Navbar.jsx";
import Aurora from "../components/Aurora.jsx";
import HomeImg1 from "../components/HomeImg1.jsx";
import FeatureSection from "../components/FeatureSection.jsx";
export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar></Navbar>
      <Aurora
        // colorStops={["#541b27", "#ff6b81", "#f9d29d"]}
        // colorStops={["#541b27", "#3e1e68", "#0f3460"]}
        // colorStops={["#541b27", "#8e44ad", "#ffd700"]}
        // colorStops={["#541b27", "#00c2cb", "#ffffff"]}
        colorStops={["#541b27", "#ff914d", "#ffe484"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.8}
      >
        {" "}
      </Aurora>
      <HomeImg1 />
      <FeatureSection />
    </div>
  );
}
