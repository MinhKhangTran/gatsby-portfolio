import React from "react";

import Hero from "../components/Hero";
import Seo from "../components/Seo";

const HomePage = () => {
  console.log("๐ฉ๐ชHallo");
  console.log("๐ด๓ ง๓ ข๓ ฅ๓ ฎ๓ ง๓ ฟ/๐บ๐ธ Hello");
  console.log("๐ฐ๐ท์์ํ์ธ์");
  return (
    <>
      <Seo title="รber mich" />
      <Hero />
    </>
  );
};
export default HomePage;
