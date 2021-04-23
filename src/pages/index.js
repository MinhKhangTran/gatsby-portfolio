import React from "react";

import Hero from "../components/Hero";
import Seo from "../components/Seo";

const HomePage = () => {
  console.log("🇩🇪Hallo");
  console.log("🏴󠁧󠁢󠁥󠁮󠁧󠁿/🇺🇸 Hello");
  console.log("🇰🇷안영하세요");
  return (
    <>
      <Seo title="Über mich" />
      <Hero />
    </>
  );
};
export default HomePage;
