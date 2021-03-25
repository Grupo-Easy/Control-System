"use strict";

const axios = require("axios").default;

(async () => {
  try {
    const data = await axios.get("https://jsonplaceholder.typicode.com/users");
    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      const response = await axios.post(`http://localhost:3333/api/v1/signup`, {
        name: element.name,
        username: element.username,
        email: element.email,
        role: "User",
        password: "123456789",
        key: "ftLcczIsN1HLMwnyBrKhO0HT65jAli4E",
      });
    }
  } catch (err) {
    console.log(err);
  }
})();
