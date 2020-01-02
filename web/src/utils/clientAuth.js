export const tokenFoundInLocalStorage = () => {
  if (localStorage.getItem("token") === null) {
    return false;
  } else {
    return true;
  }
};

export const hydrateUserFromLocalStorage = () => {
  const user = {
    username: localStorage.getItem("username"),
    id: localStorage.getItem("userId")
  };
  return user;
};
