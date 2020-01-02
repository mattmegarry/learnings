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
