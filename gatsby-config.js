require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Mein Portfolio`,
    description: `Mein Portfolio gemacht mit Gatsby. Als UI-Framework habe ich ChakraUI benutzt. Meine Daten habe ich über den headless CMS Contentful erstellt`,
    titleTemplate: `%s | MKT Portfolio`,
    url: `https://portfolio-mkt-gatsby.netlify.app`,
    image: `/mainImg.png`,
  },
  plugins: [
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `blue`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mdx`,
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
