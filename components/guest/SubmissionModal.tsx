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
  Icon,
} from "@chakra-ui/react";
import router from "next/router";
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
import guestInputContent from "../../resource/guestInputContent";
import IConfirmedGuest from "../../types/IConfirmedGuest";
type Props = {
  confirmedGuest: IConfirmedGuest;
  language: number;
};

const SubmissionModal = ({ confirmedGuest, language }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClickedSave, setIsClickedSave] = useState(false);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [isSaveError, setIsSaveError] = useState(false);
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
            confirmedItaly: confirmedGuest.confirmedItaly || null,
            confirmedUsa: confirmedGuest.confirmedUsa || null,
            italyKids: confirmedGuest.italyKids || null,
            italyBus: confirmedGuest.italyBus || null,
            italyPlusOne: confirmedGuest.italyPlusOne || null,
            usaKids: confirmedGuest.usaKids || null,
            usaPlusOne: confirmedGuest.usaPlusOne || null,
            invitedToItaly: confirmedGuest.invitedToItaly,
            invitedToUsa: confirmedGuest.invitedToUSA,
          },
        }),
      }).then((response) => {
        if (response.status === 200) {
          setIsSaveSuccessful(true);
        } else {
          setIsSaveError(true);
        }
      });
    };
    if (isClickedSave) {
      saveConfirmedGuest();
      setIsClickedSave(false);
    }
  }, [isClickedSave, confirmedGuest]);
  return (
    <>
      <Button onClick={onOpen}>
        {language === 1
          ? guestInputContent.submitItalian
          : guestInputContent.submitEnglish}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {language === 1
              ? guestInputContent.reviewItalian
              : guestInputContent.reviewEnglish}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isSaveSuccessful && (
              <>
                submission saved <Icon as={FaGrinTongueWink} />
                <ModalFooter>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSaveSuccessful(false);
                      router.reload();
                      onClose();
                    }}
                  >
                    {language === 1
                      ? guestInputContent.goBackItalian
                      : guestInputContent.goBackEnglish}
                  </Button>{" "}
                  <Button variant="ghost" onClick={() => router.push("/")}>
                    home
                  </Button>
                </ModalFooter>
              </>
            )}
            {/* should never see this error 🤞 */}
            {isSaveError && (
              <>
                submission not saved -- something went wrong{" "}
                <Icon as={FaGrimace} />
                <ModalFooter>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsSaveError(false);
                      router.reload();
                      onClose();
                    }}
                  >
                    {language === 1
                      ? guestInputContent.goBackItalian
                      : guestInputContent.goBackEnglish}
                  </Button>
                  <Button variant="ghost" onClick={() => router.push("/")}>
                    home
                  </Button>
                </ModalFooter>
              </>
            )}
            {!isSaveSuccessful && (
              <>
                <List spacing={3}>
                  {confirmedGuest.invitedToItaly &&
                    confirmedGuest.confirmedItaly && (
                      <ListItem>
                        <ListIcon as={FaGrinTongueWink} />
                        {language === 1
                          ? guestInputContent.confirmYesItalyItalian
                          : guestInputContent.confirmYesItalyEnglish}{" "}
                      </ListItem>
                    )}
                  {confirmedGuest.invitedToItaly &&
                    !confirmedGuest.confirmedItaly && (
                      <ListItem>
                        <ListIcon as={FaGrimace} />
                        {language === 1
                          ? guestInputContent.confirmNoItalyItalian
                          : guestInputContent.confirmNoItalyEnglish}{" "}
                      </ListItem>
                    )}
                  {confirmedGuest.confirmedItaly &&
                    confirmedGuest.italyPlusOne && (
                      <List spacing={3} ml={10}>
                        <ListItem>
                          <ListIcon as={FaHeart} />
                          {language === 1
                            ? `${guestInputContent.withItalian} ${guestInputContent.myPartnerItalian} `
                            : `${guestInputContent.withEnglish} ${guestInputContent.myPartnerEnglish} `}
                          {confirmedGuest.plusOneFirstName}
                        </ListItem>
                      </List>
                    )}
                  {confirmedGuest.confirmedItaly &&
                    !confirmedGuest.italyPlusOne && (
                      <List spacing={3} ml={10}>
                        <ListItem>
                          <ListIcon as={FaHeartBroken} />
                          {language === 1
                            ? `${guestInputContent.withoutItalian} ${guestInputContent.myPartnerItalian} `
                            : `${guestInputContent.withoutEnglish} ${guestInputContent.myPartnerEnglish} `}{" "}
                          {confirmedGuest.plusOneFirstName}
                        </ListItem>
                      </List>
                    )}
                  {confirmedGuest.confirmedItaly && (
                    <List spacing={3} ml={10}>
                      <ListItem>
                        <ListIcon as={FaBaby} />
                        {language === 1
                          ? guestInputContent.withKidsItalian
                          : guestInputContent.withKidsEnglish}
                        {": "}
                        {confirmedGuest.italyKids?.toString() || "0"}
                      </ListItem>
                    </List>
                  )}
                  {confirmedGuest.invitedToItaly &&
                    confirmedGuest.confirmedItaly &&
                    confirmedGuest.italyBus && (
                      <List spacing={3} ml={10}>
                        <ListItem>
                          <ListIcon as={FaBus} />
                          {language === 1
                            ? guestInputContent.rideTheBusItalian
                            : guestInputContent.rideTheBusEnglish}
                        </ListItem>
                      </List>
                    )}
                  {confirmedGuest.invitedToItaly &&
                    confirmedGuest.confirmedItaly &&
                    !confirmedGuest.italyBus && (
                      <List spacing={3} ml={10}>
                        <ListItem>
                          <ListIcon as={FaCar} />
                          {language === 1
                            ? guestInputContent.notRideTheBusItalian
                            : guestInputContent.notRideTheBusEnglish}{" "}
                        </ListItem>
                      </List>
                    )}

                  {confirmedGuest.invitedToUSA && confirmedGuest.confirmedUsa && (
                    <ListItem>
                      <ListIcon as={FaGrinTongueWink} />
                      {language === 1
                        ? guestInputContent.confirmYesUsaItalian
                        : guestInputContent.confirmYesUsaEnglish}{" "}
                    </ListItem>
                  )}
                  {confirmedGuest.invitedToUSA && !confirmedGuest.confirmedUsa && (
                    <ListItem>
                      <ListIcon as={FaGrimace} />
                      {language === 1
                        ? guestInputContent.confirmNoUsaItalian
                        : guestInputContent.confirmNoUsaEnglish}{" "}
                    </ListItem>
                  )}
                  {confirmedGuest.confirmedUsa && confirmedGuest.usaPlusOne && (
                    <List spacing={3} ml={10}>
                      <ListItem>
                        <ListIcon as={FaHeart} />
                        {language === 1
                          ? `${guestInputContent.withItalian} ${guestInputContent.myPartnerItalian} `
                          : `${guestInputContent.withEnglish} ${guestInputContent.myPartnerEnglish} `}{" "}
                        {confirmedGuest.plusOneFirstName}
                      </ListItem>
                    </List>
                  )}
                  {confirmedGuest.confirmedUsa && !confirmedGuest.usaPlusOne && (
                    <List spacing={3} ml={10}>
                      <ListItem>
                        <ListIcon as={FaHeartBroken} />
                        {language === 1
                          ? `${guestInputContent.withoutItalian} ${guestInputContent.myPartnerItalian} `
                          : `${guestInputContent.withoutEnglish} ${guestInputContent.myPartnerEnglish} `}{" "}
                        {confirmedGuest.plusOneFirstName}
                      </ListItem>
                    </List>
                  )}
                  {confirmedGuest.confirmedUsa && (
                    <List spacing={3} ml={10}>
                      <ListItem>
                        <ListIcon as={FaBaby} />
                        {language === 1
                          ? guestInputContent.withKidsItalian
                          : guestInputContent.withKidsEnglish}
                        {": "}
                        {confirmedGuest.usaKids || "0"}
                      </ListItem>
                    </List>
                  )}
                  {(confirmedGuest.confirmedItaly ||
                    confirmedGuest.confirmedUsa) &&
                    confirmedGuest.dietaryRestrictions && (
                      <List spacing={3}>
                        <ListItem>
                          <ListIcon as={FaPizzaSlice} />
                          {confirmedGuest.firstName}{" "}
                          {language === 1
                            ? guestInputContent.hasDietaryRequirementsItalian
                            : guestInputContent.hasDietaryRequirementsEnglish}
                          {": "}
                          {confirmedGuest.dietaryRestrictions.toString()}
                        </ListItem>
                      </List>
                    )}
                  {(confirmedGuest.confirmedItaly ||
                    confirmedGuest.confirmedUsa) &&
                    confirmedGuest.plusOneDietaryRestrictions && (
                      <List spacing={3}>
                        <ListItem>
                          <ListIcon as={FaPizzaSlice} />
                          {confirmedGuest.plusOneFirstName}{" "}
                          {language === 1
                            ? guestInputContent.hasDietaryRequirementsItalian
                            : guestInputContent.hasDietaryRequirementsEnglish}
                          {": "}
                          {confirmedGuest.plusOneDietaryRestrictions.toString()}
                        </ListItem>
                      </List>
                    )}
                </List>
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>
                    {language === 1
                      ? guestInputContent.goBackItalian
                      : guestInputContent.goBackEnglish}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsClickedSave(true)}
                  >
                    {language === 1
                      ? guestInputContent.submitItalian
                      : guestInputContent.submitEnglish}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmissionModal;
