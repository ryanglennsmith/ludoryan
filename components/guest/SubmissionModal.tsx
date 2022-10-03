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
} from "react-icons/fa";
import ConfirmedGuest from "../../types/ConfirmedGuest";
type Props = {
  confirmedGuest: ConfirmedGuest;
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
              {confirmedGuest.invitedToItaly &&
                confirmedGuest.confirmedItaly &&
                confirmedGuest.location?.italy?.bus && (
                  <ListItem>
                    <ListIcon as={FaBus} />
                    and riding the party bus
                  </ListItem>
                )}
              {confirmedGuest.invitedToItaly &&
                confirmedGuest.confirmedItaly &&
                !confirmedGuest.location?.italy?.bus && (
                  <ListItem>
                    <ListIcon as={FaCar} />
                    and driving myself
                  </ListItem>
                )}
              {confirmedGuest.invitedToItaly && !confirmedGuest.confirmedItaly && (
                <ListItem>
                  <ListIcon as={FaGrimace} />
                  no, sorry, no italy for me
                </ListItem>
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
