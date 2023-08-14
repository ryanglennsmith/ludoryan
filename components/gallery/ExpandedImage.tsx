import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  chakra,
  useColorModeValue,
  Image,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaAngleRight, FaAngleLeft, FaDownload } from "react-icons/fa";
type Props = {
  images: string[];
  locale: string;
};
const ExpandedImage = ({ images, locale }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState(images[0]);
  const handleClick = (i: number): void => {
    setCurrentImage(images[i]);
    onOpen();
  };
  const handleDownload = (image: string): void => {
    console.log(`download ${image}`);
    try {
      const element = document.createElement("a");
      element.href = `/.images/${image}`;
      element.download = image;
      console.log(element);
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } catch (e) {
      console.log(e);
    }
  };
  const findIndexOfCurrentImage = (image: string): number => {
    return images.indexOf(image);
  };
  const cycleImage = (direction: string): void => {
    const currentIndex = findIndexOfCurrentImage(currentImage);
    if (direction === "left") {
      if (currentIndex === 0) {
        setCurrentImage(images[images.length - 1]);
      } else {
        setCurrentImage(images[currentIndex - 1]);
      }
    } else if (direction === "right") {
      if (currentIndex === images.length - 1) {
        setCurrentImage(images[0]);
      } else {
        setCurrentImage(images[currentIndex + 1]);
      }
    }
  };
  return (
    <>
      {images.map((image, index) => (
        <chakra.div
          className="masonry-item"
          key={image}
          p={2}
          m={2}
          w="100%"
          boxShadow="dark-lg"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          backgroundColor={useColorModeValue("gray.300", "gray.700")}
          onClick={() => handleClick(index)}
        >
          <Image
            src={`/.images/${image}`}
            alt={image}
            display="block"
            w="100%"
            borderRadius="8px"
          />
        </chakra.div>
      ))}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xl", md: "4xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentImage}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="row"
              justifyContent="center"
              alignItems="center"
              pos="relative"
            >
              <Button
                isActive={false}
                pos="absolute"
                left="2"
                top="50%"
                variant="outline"
                color="white"
                onClick={() => {
                  cycleImage("left");
                }}
              >
                <Icon as={FaAngleLeft} />
              </Button>
              <Image
                src={`/.images/${currentImage}`}
                alt={currentImage + "alt"}
              />
              <Button
                isActive={false}
                pos="absolute"
                right="2"
                top="50%"
                color="white"
                variant="outline"
                onClick={() => {
                  cycleImage("right");
                }}
              >
                <Icon as={FaAngleRight} />
              </Button>
            </Flex>
          </ModalBody>
          <ModalFooter alignSelf="center">
            <Button
              variant="ghost"
              onClick={() => handleDownload(currentImage)}
            >
              <Icon as={FaDownload} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExpandedImage;
