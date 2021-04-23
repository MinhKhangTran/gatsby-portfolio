import {
  Flex,
  Spacer,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "gatsby";
import DarkModeSwitch from "./DarkModeSwitch";
import { useStaticQuery, graphql } from "gatsby";

// const links = [
//   { id: 1, text: "Über mich", url: "/" },
//   { id: 2, text: "Projekte", url: "/projects" },
//   { id: 3, text: "Uses", url: "/uses" },
// ];

const Navbar = () => {
  const textColor = useColorModeValue("blau.900", "blau.300");
  const data = useStaticQuery(graphql`
    {
      allContentfulNavbar(sort: { fields: createdAt, order: ASC }) {
        nodes {
          url
          text
          id
        }
      }
    }
  `);
  const links = data.allContentfulNavbar.nodes;
  return (
    <Flex
      align="center"
      py={6}
      w={{ base: "90%", md: "75%" }}
      mx="auto"
      as="nav"
    >
      <DarkModeSwitch />
      <Spacer />
      <Flex>
        {links.map((link) => {
          return (
            <Link key={link.id} to={link.url} activeClassName="active">
              <Text casing="capitalize" ml={4} _hover={{ color: textColor }}>
                {link.text}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default Navbar;
