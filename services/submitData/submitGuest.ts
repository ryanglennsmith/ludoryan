import InvitedGuest from "../../types/InvitedGuest";

export const saveUser = async (
  invitedGuest: InvitedGuest,
  isEditingMode: boolean,
  setServerResponse: Function
) => {
  if (
    invitedGuest.name.length < 1 ||
    invitedGuest.email.length < 1 ||
    invitedGuest.password === undefined
  ) {
    alert("incomplete data");
  } else {
    const response = await fetch("/api/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          email: invitedGuest.email,
          password: invitedGuest.password,
          name: invitedGuest.name,
          plusOneName:
            invitedGuest.plusOne !== undefined ? invitedGuest.plusOne : null,
          isInvitedToItaly: invitedGuest.italy,
          isInvitedToUSA: invitedGuest.usa,
          editingMode: isEditingMode,
        },
      }),
    }).then((response) => response.json());
    setServerResponse({
      name: response.createdUser.name,
      email: response.createdUser.email,
      plusOne: response.createdUser.plusOneName || null,
      italy: response.createdUser.isInvitedToItaly,
      usa: response.createdUser.isInvitedToUSA,
      id: response.createdUser.id,
    });
  }
};

export const getUser = async (
  editGuestField: string,
  resetState: Function,
  setIsEditingMode: Function,
  setIsEnterGuestInfo: Function,
  setInvitedGuest: Function,
  invitedGuest: InvitedGuest
) => {
  if (editGuestField.length < 1) {
    alert("incomplete data");
  } else {
    const response = await fetch("/api/admin/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: editGuestField,
      }),
    }).then((response) => response.json());
    resetState();
    setIsEditingMode(true);
    setIsEnterGuestInfo(true);
    setInvitedGuest({
      ...invitedGuest,
      name: response.createdUser.name,
      email: response.createdUser.email,
      plusOne: response.createdUser.plusOneName || null,
      italy: response.createdUser.isInvitedToItaly,
      usa: response.createdUser.isInvitedToUSA,
    });
  }
};
