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

const links = [
  { id: 1, text: "Über mich", url: "/" },
  { id: 2, text: "Projekte", url: "/projects" },
  { id: 3, text: "Uses", url: "/uses" },
];

const Navbar = () => {
  const textColor = useColorModeValue("blau.900", "blau.300");
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
              <Text ml={4} _hover={{ color: textColor }}>
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
