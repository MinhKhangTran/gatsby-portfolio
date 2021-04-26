const React = require("react");
const Layout = require("./src/components/Layout").default;
const { ChakraProvider } = require("@chakra-ui/react");
const { theme } = require("./src/assets/styles/theme");
const { wrapMDX } = require("./root-mdx");

exports.wrapRootElement = wrapMDX;

exports.wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout {...props}>{element}</Layout>
    </ChakraProvider>
  );
};
