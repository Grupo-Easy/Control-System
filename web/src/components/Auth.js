import api from "../services/api";

async function Verify(localstorage, history) {
  const jwt = await localstorage.getItem("jwt");
  if (!jwt) {
    return history.push("/");
  }
  try {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (response.status !== 200) {
      return history.push("/");
    }
    return response.data;
  } catch (err) {
    console.log(err);

    return history.push("/");
  }
}

async function Process(role, array) {
  const data = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i].Permissions;
    if (element.indexOf(role) !== -1) {
      data.push(array[i]);
    }
  }

  return data;
}

const functions = { Verify, Process };
export default functions;
