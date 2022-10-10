interface IConfirmedGuest {
  dietaryRestrictions?: string;
  plusOneDietaryRestrictions?: string;
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
  italyPlusOneDiet?: string;
  usaKids?: number;
  usaBus?: boolean;
  usaPlusOne?: boolean;
  usaPlusOneDiet?: string;
}

export default IConfirmedGuest;
