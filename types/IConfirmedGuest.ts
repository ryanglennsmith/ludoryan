interface IConfirmedGuest {
  firstName: string;
  lastName?: string;
  plusOneFirstName?: string;
  plusOneLastName?: string;
  id: string;
  invitedToItaly: boolean;
  invitedToUSA: boolean;
  confirmedItaly?: boolean;
  confirmedUsa?: boolean;
  italyKids?: number;
  italyBus?: boolean;
  italyPlusOne?: boolean;
  usaKids?: number;
  usaPlusOne?: boolean;
  dietaryRestrictions?: string;
  plusOneDietaryRestrictions?: string;
}

export default IConfirmedGuest;
