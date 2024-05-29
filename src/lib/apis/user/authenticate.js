import axios from "axios";

const BASE_URL = "http://localhost:3000/users";
const service = axios.create({
  baseURL: BASE_URL,
});
export async function serverLogin({ email, password }) {
  const resp = await service.post("/login", {
    email: email,
    password: password,
  });
  return;
}
