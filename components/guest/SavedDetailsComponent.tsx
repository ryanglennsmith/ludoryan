/* eslint-disable react/no-unescaped-entities */
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import IConfirmedGuest from "../../types/IConfirmedGuest";
import { IGuestInputContent } from "../../resource/guestInputContent";
type Props = {
  confirmedGuest: IConfirmedGuest;
  savedConfirmation: any;
  language: number;
  guestInputContent: IGuestInputContent
};
const SavedDetailsComponent = ({
  confirmedGuest,
  savedConfirmation,
  language,
  guestInputContent
}: Props) => {
  const [showSavedDetails, setShowSavedDetails] = useState(false);
  return (
    <>
      <Button
        size="sm"
        m={3}
        onClick={() => setShowSavedDetails(!showSavedDetails)}
      >
        {showSavedDetails && <Text as="span">{language ===0 ? guestInputContent.hideSavedDetailsEnglish : guestInputContent.hideSavedDetailsItalian}</Text>}
        {!showSavedDetails && <Text as="span">{language===0 ? guestInputContent.showSavedDetailsEnglish : guestInputContent.showSavedDetailsItalian}</Text>}
      </Button>
      {showSavedDetails && (
        <Flex alignItems="left" direction="column" mb={5}>
          <Heading size="sm" my={3}>
            saved details
          </Heading>
          <ul>first name: {savedConfirmation?.firstName || "none"}</ul>
          <ul>last name: {savedConfirmation?.lastName || "none"}</ul>
          <ul>
            partner's first name:{" "}
            {savedConfirmation?.plusOneFirstName || "none"}
          </ul>
          <ul>
            partner's last name: {savedConfirmation?.plusOneLastName || "none"}
          </ul>
          <ul>
            {confirmedGuest.invitedToItaly && (
              <>
                rsvp to italy:{" "}
                {savedConfirmation?.confirmedItaly ? "yes" : "no"}
              </>
            )}
          </ul>
          <ul>
            {confirmedGuest.invitedToUSA && (
              <>rsvp to usa: {savedConfirmation?.confirmedUsa ? "yes" : "no"}</>
            )}
          </ul>
          <ul>
            {confirmedGuest.invitedToItaly &&
              savedConfirmation?.confirmedItaly && (
                <>
                  bringing children to italy:{" "}
                  {savedConfirmation?.italyKids?.toString() || "0"}
                </>
              )}
          </ul>
          <ul>
            {confirmedGuest.invitedToUSA && savedConfirmation?.confirmedUsa && (
              <>
                bringing children to usa:{" "}
                {savedConfirmation?.usaKids?.toString() || "0"}
              </>
            )}
          </ul>
          <ul>
            {confirmedGuest.invitedToItaly &&
              savedConfirmation?.confirmedItaly && (
                <>
                  transport to venue in milan:{" "}
                  {savedConfirmation?.italyBus
                    ? "riding the bus"
                    : "driving myself"}
                </>
              )}
          </ul>
          {/* <ul>
            {(savedConfirmation?.confirmedItaly ||
              savedConfirmation?.confirmedUsa) && (
              <>
                dietary restrictions:{" "}
                {savedConfirmation.dietaryRestrictions || "none"}
              </>
            )}
          </ul>
          <ul>
            {(savedConfirmation?.confirmedItaly ||
              savedConfirmation?.confirmedUsa) && (
              <>
                my partner's dietary restrictions:{" "}
                {savedConfirmation.plusOneDietaryRestrictions || "none"}
              </>
            )}
          </ul> */}
          <ul>
            {(savedConfirmation?.confirmedItaly ||
              savedConfirmation?.confirmedUsa) &&
              savedConfirmation?.additionalInformation && (
                <>
                  additional information:{" "}
                  {savedConfirmation.additionalInformation}
                </>
              )}
          </ul>
        </Flex>
      )}
    </>
  );
};

export default SavedDetailsComponent;
