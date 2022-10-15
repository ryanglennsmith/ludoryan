type user = {
  email: string;
  name: string;
  plusOne?: string;
  isInvitedToItaly?: boolean;
  isInvitedToUSA?: boolean;
};
export const sortList = (field: string, list: any[], asc: boolean) => {
  if (asc) {
    return list.sort((a, b) => {
      let fa = a[field as keyof user].toLowerCase();
      let fb = b[field as keyof user].toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fb > fa) {
        return 1;
      }
      return 0;
    });
  } else {
    return list.sort((a, b) => {
      let fa = a[field as keyof user].toLowerCase();
      let fb = b[field as keyof user].toLowerCase();
      if (fa > fb) {
        return -1;
      }
      if (fb < fa) {
        return 1;
      }
      return 0;
    });
  }
};
