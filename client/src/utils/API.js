import axios from "axios";
import fire from "./firebase";

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
}

const API =  {
  createUser: async function (obj) {
    const header = await createToken();

    const payload = {
      obj
    }
    try {
      const res = await axios.post("/api/users", payload, header);
      return res.data;

    } catch (e) {
      console.error(e);
    }
  },
  getUser: async function (id) {
    const header = await createToken();

    try {
      const res = await axios.get("/api/users/" + id, header);
      return res;
    } catch (e) {
      console.error(e);
    }
  },
  updateUser: async function (id, obj) {
    const header = await createToken();

    try {
      const res = await axios.put("api/users/" + id, obj, header);
      return res.data;
    } catch (e) {
      console.error(e);
    }  
  },
};

export default API;

