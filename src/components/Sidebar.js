import React from "react";
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = ({ links }) => {
  const textColor = useColorModeValue("blau.900", "blau.300");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //   console.log(links);
  return (
    <Box display={{ base: "block", md: "none" }}>
      <IconButton
        aria-label="Burger"
        colorScheme="blau"
        variant="ghost"
        fontSize="20px"
        ref={btnRef}
        onClick={onOpen}
        icon={<GiHamburgerMenu />}
      />
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerBody
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {links.map((link) => {
                return (
                  <Link key={link.id} to={link.url} activeClassName="active">
                    <Text
                      casing="capitalize"
                      my={8}
                      _hover={{ color: textColor }}
                      onClick={onClose}
                      fontSize="3xl"
                    >
                      {link.text}
                    </Text>
                  </Link>
                );
              })}
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
