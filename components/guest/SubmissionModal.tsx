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
  FaGrimace,
  FaPizzaSlice,
  FaBus,
  FaCar,
  FaBaby,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { IGuestInputContent } from "../../resource/guestInputContent";
import saveConfirmedGuest from "../../services/submitData/submitRsvp";
import IConfirmedGuest from "../../types/IConfirmedGuest";

type Props = {
  confirmedGuest: IConfirmedGuest;
  language: number;
  guestInputContent: IGuestInputContent;
};

const SubmissionModal = ({ confirmedGuest, language, guestInputContent }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isClickedSave, setIsClickedSave] = useState(false);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState(false);
  const [isSaveError, setIsSaveError] = useState(false);
  useEffect(() => {
    if (isClickedSave) {
      saveConfirmedGuest(confirmedGuest, setIsSaveSuccessful, setIsSaveError);
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
                submission saved <Icon as={FaCheck} />
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
                <Icon as={FaTimes} />
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
                        <ListIcon as={FaCheck} />
                        {language === 1
                          ? guestInputContent.confirmYesItalyItalian
                          : guestInputContent.confirmYesItalyEnglish}{" "}
                      </ListItem>
                    )}
                  {confirmedGuest.invitedToItaly &&
                    !confirmedGuest.confirmedItaly && (
                      <ListItem>
                        <ListIcon as={FaTimes} />
                        {language === 1
                          ? guestInputContent.confirmNoItalyItalian
                          : guestInputContent.confirmNoItalyEnglish}{" "}
                      </ListItem>
                    )}
                  {confirmedGuest.confirmedItaly &&
                    confirmedGuest.italyPlusOne && (
                      <List spacing={3} ml={10}>
                        <ListItem>
                          <ListIcon as={FaCheck} />
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
                          <ListIcon as={FaTimes} />
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
                      <ListIcon as={FaCheck} />
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
                        <ListIcon as={FaCheck} />
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
                        <ListIcon as={FaTimes} />
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
