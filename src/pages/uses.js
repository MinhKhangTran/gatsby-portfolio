import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { graphql } from "gatsby";

const UsesPage = ({ data: { allContentfulUses } }) => {
  const software = allContentfulUses.nodes[0].software;
  console.log(software);
  return (
    <Box>
      {software.map((item) => {
        return (
          <Box key={item.id}>
            <Text>{item.name}</Text>
            <Text>{item.desc.desc}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export const query = graphql`
  {
    allContentfulUses {
      nodes {
        software {
          id
          name
          desc {
            desc
          }
        }
      }
    }
  }
`;
export default UsesPage;
