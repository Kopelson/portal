import axios from "axios";

const API =  {
  createUser: function (obj) {
    console.log(obj);
    return axios.post("/api/users", obj);
  },
  getUser: function (id) {
    console.log(id);
    return axios.get("/api/users/" + id);
  },
  updateUser: function (id, obj) {
    return axios.put("api/users/" + id, obj);
  },
};

export default API;

