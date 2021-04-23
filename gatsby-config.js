require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Mein Portfolio`,
    description: `Mein Portfolio gemacht mit Gatsby. Als UI-Framework habe ich ChakraUI benutzt. Meine Daten habe ich über den headless CMS Contentful erstellt`,
    titleTemplate: `%s | MKT Portfolio`,
    url: `https://temp-strapi-portfolio.netlify.app`,
    image: `/mainImg.png`,
  },
  plugins: [
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `87yt579h45h5`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
