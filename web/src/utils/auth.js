export const tokenFoundInLocalStorage = () => {
  if (localStorage.getItem("token") === null) {
    return false;
  } else {
    return true;
  }
};
