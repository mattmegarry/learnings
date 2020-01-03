export const tokenFoundInLocalStorage = () => {
  if (localStorage.getItem("token") === null) {
    return false;
  } else {
    return true;
  }
};

export const hydrateUserFromLocalStorage = () => {
  let user = null;
  if (localStorage.getItem("userId")) {
    user = {
      username: localStorage.getItem("username"),
      id: localStorage.getItem("userId")
    };
  }
  return user;
};

export const deleteUserLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");

  return true;
};
