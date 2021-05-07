import React from "react";
import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import TableComponent from "../components/TableComponent";
import Seo from "../components/Seo";

const UsesPage = ({ data: { allContentfulUses } }) => {
  const software = allContentfulUses.nodes[0].software;
  const hardware = allContentfulUses.nodes[0].hardware;
  const equip = allContentfulUses.nodes[0].equip;
  // console.log(allContentfulUses);
  // console.log(software);
  // console.log(hardware);
  // console.log(equip);
  return (
    <>
      <Seo title="/Uses" />
      <Box>
        <Heading as="h1" fontSize="3xl" mb={6}>
          /Uses
        </Heading>
        <GatsbyImage
          image={getImage(allContentfulUses.nodes[0].image)}
          alt={allContentfulUses.nodes[0].image.title}
        />
        <Text
          casing="capitalize"
          textAlign="center"
          mb={4}
          color="blau.300"
          fontSize="lg"
        >
          {allContentfulUses.nodes[0].image.title}
        </Text>
        <Text>{allContentfulUses.nodes[0].usesDesc.usesDesc}</Text>
        {/* SOFTWARE TABLE */}
        <TableComponent title="Software" array={software} />
        {/* HARDWARE TABLE */}
        <TableComponent title="Hardware" array={hardware} />
        <Divider colorScheme="blau" orientation="horizontal" />
        {/* GYM */}
        <Heading as="h2" fontSize="3xl" mt={8} mb={6}>
          /Gym-Uses
        </Heading>
        <GatsbyImage
          image={getImage(allContentfulUses.nodes[0].gymImage)}
          alt={allContentfulUses.nodes[0].gymImage.title}
        />
        <Text
          casing="capitalize"
          textAlign="center"
          mb={4}
          color="blau.300"
          fontSize="lg"
        >
          {allContentfulUses.nodes[0].gymImage.title}
        </Text>
        <Text>{allContentfulUses.nodes[0].gymDesc.gymDesc}</Text>
        {/* EQUIP TABLE */}
        <TableComponent title="Equipment" array={equip} color="blue" />
      </Box>
    </>
  );
};

export const query = graphql`
  {
    allContentfulUses {
      nodes {
        image {
          gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
          title
        }
        usesDesc {
          usesDesc
        }
        software {
          id
          name
          desc {
            desc
          }
        }
        hardware {
          id
          name
          desc {
            desc
          }
        }
        gymImage {
          title
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
        gymDesc {
          gymDesc
        }
        equip {
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
