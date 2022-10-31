import IConfirmedGuest from "../../types/IConfirmedGuest";
import sendLog from "../logging/logger";

const saveConfirmedGuest = async (
  confirmedGuest: IConfirmedGuest,
  setIsSaveSuccessful: Function,
  setIsSaveError: Function
) => {
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
        additionalInformation: confirmedGuest.additionalInformation || null,
        invitedToItaly: confirmedGuest.invitedToItaly,
        invitedToUsa: confirmedGuest.invitedToUSA,
      },
    }),
  });
  const result = await response.json();
  if (response.status === 200) {
    sendLog({
      event: `guest RSVP submission`,
      successMessage: `user ${confirmedGuest.firstName} submitted details`,
      userId: confirmedGuest.id,
    });
    setIsSaveSuccessful(true);
  } else {
    sendLog({
      event: `guest RSVP submission`,
      errorMessage: `user ${confirmedGuest.firstName} had error in RSVP submission`,
      userId: confirmedGuest.id,
    });
    setIsSaveError(true);
  }
};
export default saveConfirmedGuest;
