import http from "../http-common";

const get = (id) => {
    return http.get(`/user/${id}`);
};

const create = (data) => {
    return http.post("/user", data);
};

const update = (id, data) => {
    return http.put(`/user/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/user/${id}`);
};

const getAll = () => {
    return http.get("/user");
};
  
const removeAll = () => {
    return http.delete(`/user`);
};

const UserService = {
    getAll, get, create, update, remove, removeAll
};

export default UserService;
