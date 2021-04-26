import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MyH2, MyH4 } from "./src/components/mdx-components/Heading";
import { MyP } from "./src/components/mdx-components/Prosa";
import { MyBlockquote } from "./src/components/mdx-components/Blockquote";
import { MyHr } from "./src/components/mdx-components/HorizontalLine";

const components = {
  //p
  p: MyP,

  // Heading h2 und h4
  h2: MyH2,
  h4: MyH4,
  //blockquote
  blockquote: MyBlockquote,
  //unordered List
  //video
  //divider
  hr: MyHr,
};
export const wrapMDX = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
