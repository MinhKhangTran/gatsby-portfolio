import { Heading, Tbody, Table, Tr, Td, Text } from "@chakra-ui/react";
import React from "react";

const TableComponent = ({ title, array, color = "blau" }) => {
  return (
    <>
      <Heading mt={4} as="h3" fontSize="xl">
        {title}
      </Heading>
      <Table colorScheme={color} mt={2} variant="striped">
        <Tbody>
          {array.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>
                  <Text
                    // color={`${color}.600`}
                    fontWeight="bold"
                    casing="capitalize"
                  >
                    {item.name}
                  </Text>
                </Td>
                <Td>{item.desc.desc}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default TableComponent;
