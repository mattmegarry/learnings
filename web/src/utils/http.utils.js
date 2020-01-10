import { deleteUserLocalStorage } from "./localStorage.utils";

export const openRequest = (path, method, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  return fetch("http://localhost:4001" + path, options)
    .then(async res => {
      console.log("DEVELOPMENT! Response is...");
      console.log(res);
      const result = {};
      result.status = res.status;
      result.data = await res.json();
      console.log("DEVELOPMENT! Data is...");
      console.log(result.data);
      return result;
    })
    .catch(err => console.log("Error:", err));
};

export const authRequest = (path, method, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    },
    credentials: "include",
    body: JSON.stringify(body)
  };

  return fetch("http://localhost:4001" + path, options)
    .then(async res => {
      console.log("DEVELOPMENT! Response is...");
      console.log(res);
      // TO DO: 500
      if (res.status === 401) {
        deleteUserLocalStorage();
        return { status: 401 };
      }
      const result = {};
      result.status = res.status;
      result.data = await res.json();
      console.log("DEVELOPMENT! Response is...");
      console.log(res);

      return result;
    })
    .catch(err => console.log("Error:", err));
};
