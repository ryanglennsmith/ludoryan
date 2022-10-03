type PlusOne = {
  confirmed: boolean;
  dietaryRestrictions?: string;
};

type Italy = {
  kids: number;
  bus: boolean;
  plusOne?: PlusOne;
};

type Usa = {
  kids: number;
  plusOne?: PlusOne;
};

type ConfirmedGuest = {
  dietaryRestrictions?: string;
  plusOneDietaryRestrictions?: string;
  firstName: string;
  lastName?: string;
  id: string;
  invitedToItaly: boolean;
  invitedToUSA: boolean;
  confirmedItaly?: boolean;
  confirmedUsa?: boolean;
  location?: {
    italy?: Italy;
    usa?: Usa;
  };
};

export default ConfirmedGuest;
