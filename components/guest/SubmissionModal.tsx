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
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import {
  FaGrinTongueWink,
  FaGrimace,
  FaGuitar,
  FaPizzaSlice,
  FaBus,
  FaCar,
  FaHeartBroken,
  FaHeart,
  FaBaby,
} from "react-icons/fa";
import IConfirmedGuest from "../../types/IConfirmedGuest";
type Props = {
  confirmedGuest: IConfirmedGuest;
};

const SubmissionModal = ({ confirmedGuest }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>submit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {confirmedGuest.invitedToItaly && confirmedGuest.confirmedItaly && (
                <ListItem>
                  <ListIcon as={FaGrinTongueWink} />
                  yes, see you in italy
                </ListItem>
              )}
              {confirmedGuest.invitedToItaly && !confirmedGuest.confirmedItaly && (
                <ListItem>
                  <ListIcon as={FaGrimace} />
                  no, sorry, no italy for me
                </ListItem>
              )}
              {confirmedGuest.confirmedItaly && confirmedGuest.italyPlusOne && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaHeart} />
                    with my partner {confirmedGuest.plusOneFirstName}
                  </ListItem>
                </List>
              )}
              {confirmedGuest.confirmedItaly && !confirmedGuest.italyPlusOne && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaHeartBroken} />
                    without my partner {confirmedGuest.plusOneFirstName}
                  </ListItem>
                </List>
              )}
              {confirmedGuest.confirmedItaly && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaBaby} />
                    with {confirmedGuest.italyKids?.toString() || "0"} bastard
                    kids
                  </ListItem>
                </List>
              )}
              {confirmedGuest.invitedToItaly &&
                confirmedGuest.confirmedItaly &&
                confirmedGuest.italyBus && (
                  <List spacing={3} ml={10}>
                    <ListItem>
                      <ListIcon as={FaBus} />
                      and riding the party bus
                    </ListItem>
                  </List>
                )}
              {confirmedGuest.invitedToItaly &&
                confirmedGuest.confirmedItaly &&
                !confirmedGuest.italyBus && (
                  <List spacing={3} ml={10}>
                    <ListItem>
                      <ListIcon as={FaCar} />
                      and driving myself
                    </ListItem>
                  </List>
                )}
              {confirmedGuest.invitedToUSA && confirmedGuest.confirmedUsa && (
                <ListItem>
                  <ListIcon as={FaGrinTongueWink} />
                  yes, see you in usa
                </ListItem>
              )}
              {confirmedGuest.invitedToUSA && !confirmedGuest.confirmedUsa && (
                <ListItem>
                  <ListIcon as={FaGrimace} />
                  no, sorry, no usa for me
                </ListItem>
              )}
              {confirmedGuest.confirmedUsa && confirmedGuest.usaPlusOne && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaHeart} />
                    with my partner {confirmedGuest.plusOneFirstName}
                  </ListItem>
                </List>
              )}
              {confirmedGuest.confirmedUsa && !confirmedGuest.usaPlusOne && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaHeartBroken} />
                    without my partner {confirmedGuest.plusOneFirstName}
                  </ListItem>
                </List>
              )}
              {confirmedGuest.confirmedUsa && (
                <List spacing={3} ml={10}>
                  <ListItem>
                    <ListIcon as={FaBaby} />
                    with {confirmedGuest.usaKids?.toString() || "0"} bastard
                    kids
                  </ListItem>
                </List>
              )}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              go back
            </Button>
            <Button variant="ghost">save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmissionModal;
