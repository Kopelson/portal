import axios from "axios";

export default {
  createUser: function (obj) {
    return axios.post("/api/users", obj);
  },
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  updateUser: function (id, obj) {
    return axios.put("api/users/" + id, obj);
  },
};