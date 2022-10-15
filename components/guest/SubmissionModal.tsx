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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FaGrinTongueWink,
  FaGrimace,
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
  const [isClickedSave, setIsClickedSave] = useState(false);
  useEffect(() => {
    const saveConfirmedGuest = async () => {
      const response = await fetch("/api/confirmedguest/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmedGuest: {
            dietaryRestrictions: confirmedGuest.dietaryRestrictions || null,
            plusOneDietaryRestrictions:
              confirmedGuest.plusOneDietaryRestrictions || null,
            firstName: confirmedGuest.firstName,
            lastName: confirmedGuest.lastName || null,
            plusOneFirstName: confirmedGuest.plusOneFirstName || null,
            plusOneLastName: confirmedGuest.plusOneLastName || null,
            id: confirmedGuest.id,
            invitedToItaly: confirmedGuest.invitedToItaly,
            invitedToUsa: confirmedGuest.invitedToUSA,
            confirmedItaly: confirmedGuest.confirmedItaly || null,
            confirmedUsa: confirmedGuest.confirmedUsa || null,
            italyKids: confirmedGuest.italyKids || null,
            italyBus: confirmedGuest.italyBus || null,
            italyPlusOne: confirmedGuest.italyPlusOne || null,
            usaKids: confirmedGuest.usaKids || null,
            usaPlusOne: confirmedGuest.usaPlusOne || null,
          },
        }),
      }).then((response) => response.json());
    };
    if (isClickedSave) {
      saveConfirmedGuest();
      setIsClickedSave(false);
      onClose();
    }
  }, [isClickedSave, confirmedGuest]);
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
                    with {confirmedGuest.usaKids || "0"} bastard kids
                  </ListItem>
                </List>
              )}
              {(confirmedGuest.confirmedItaly || confirmedGuest.confirmedUsa) &&
                confirmedGuest.dietaryRestrictions && (
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FaPizzaSlice} />
                      and i don&apos;t fucking eat{" "}
                      {confirmedGuest.dietaryRestrictions.toString()}
                    </ListItem>
                  </List>
                )}
              {(confirmedGuest.confirmedItaly || confirmedGuest.confirmedUsa) &&
                confirmedGuest.plusOneDietaryRestrictions && (
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FaPizzaSlice} />
                      and my partner don&apos;t fucking eat{" "}
                      {confirmedGuest.plusOneDietaryRestrictions.toString()}
                    </ListItem>
                  </List>
                )}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              go back
            </Button>
            <Button variant="ghost" onClick={() => setIsClickedSave(true)}>
              save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmissionModal;
