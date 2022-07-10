import bcrypt from "bcrypt";
import config from "../config";

export default (password: string) => {
  const salt = parseInt(config.salt as string);
  const hashedPassword = bcrypt.hashSync(`${password}${config.hash}`, salt);
  return hashedPassword;
};
