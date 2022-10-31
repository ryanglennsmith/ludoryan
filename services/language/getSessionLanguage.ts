const getSessionLanguage = (): number => {
  if (sessionStorage.getItem("language") !== undefined) {
    return Number(sessionStorage.getItem("language"));
  } else {
    return 0;
  }
};
export default getSessionLanguage;
