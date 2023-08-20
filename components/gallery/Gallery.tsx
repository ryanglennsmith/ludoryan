import React from "react";
import { NextPage } from "next";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Image,
  Container,
  chakra,
  useColorModeValue,
  Heading,
  Link,
} from "@chakra-ui/react";
import ExpandedImage from "./ExpandedImage";

type Props = {
  images: string[];
  location: string;
};
const Gallery: NextPage<Props> = ({ images, location }: Props) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      direction="column"
      px={3}
      pb={{ base: "6rem", md: "4.5rem" }}
      mt={2}
    >
      <Heading mt={2}>{location}</Heading>
      <Link href="/gallery" mt={2}>
        go back
      </Link>
      <chakra.div
        className="masonry-container"
        gridTemplateColumns={{
          base: "repeat(auto-fill, minmax(200px, 1fr))",
          md: "",
        }}
        m={2}
        p={2}
      >
        <ExpandedImage images={images} locale={location} />
      </chakra.div>
    </Flex>
  );
};

export default Gallery;
