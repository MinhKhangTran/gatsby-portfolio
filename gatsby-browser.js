const React = require("react");
const Layout = require("./src/components/Layout").default;
const { ChakraProvider } = require("@chakra-ui/react");
const { theme } = require("./src/assets/styles/theme");

exports.wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout {...props}>{element}</Layout>
    </ChakraProvider>
  );
};
