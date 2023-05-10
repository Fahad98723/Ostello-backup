import axios from "axios";
import { host } from "../../utils/constant";

export default async function handler(req, res) {
  const data = req.query;
  const response = await axios.post(`${host}/payments/link/confirm`,data)
}