type PlusOne = {
  confirmed: boolean;
  dietaryRestrictions?: string;
};

type Italy = {
  confirmed: boolean;
  dietaryRestrictions?: string;
  kids: number;
  bus: boolean;
  plusOne?: PlusOne;
};

type Usa = {
  confirmed: boolean;
  dietaryRestrictions?: string;
  kids: number;
  plusOne?: PlusOne;
};
type ConfirmedGuest = {
  invitedToItaly: boolean;
  invitedToUSA: boolean;
  confirmed?: {
    italy?: Italy;
    usa?: Usa;
  };
};

export default ConfirmedGuest;
