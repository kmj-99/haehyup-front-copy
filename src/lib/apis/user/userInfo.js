// import axios from "axios";
import { user } from "../dummy.json";

/**
 * 프로필 위한 유저 조회
 * @returns {Promise}
 * { data: { user: [{ _id, email, password, name, profileImageUrl, createdAt, updatedAt }] } 
 * @throws {Error}
 * @example
 * import { getUser } from "./apis/user/userInfo";
 * getUser().then((response) => console.log(response));
 */
export const getUserById = (userId) => {
  return user.find((user) => user._id === userId);
}
// export const getUserById = async (userId) => {
//   const resp = axios.get(`/api/user/${userId}`);
//   return (await resp).data;
// }
