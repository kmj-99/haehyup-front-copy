// import axios from "axios";
import { theme } from "../dummy.json";

/**
 * 테마 리스트 조회
 * @returns {Promise}
 * { data: { themes: [{ _id, themeName, description, imageUrl, createdAt, updatedAt }] } 
 * @throws {Error}
 * @example
 * import { getThemeList } from "./apis/studyRoom/theme";
 * getThemeList().then((response) => console.log(response));
 */

export const getThemeList = () => {
  return theme.map((theme) => theme);
}
// export const getThemeList = async () => {
//   try {
//     const response = await axios.get("/themes");
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

