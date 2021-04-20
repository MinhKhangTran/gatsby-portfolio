const React = require("react");
const Layout = require("./src/components/Layout").default;
const { ChakraProvider } = require("@chakra-ui/react");

exports.wrapPageElement = ({ element, props }) => {
  return (
    <ChakraProvider>
      <Layout {...props}>{element}</Layout>
    </ChakraProvider>
  );
};
