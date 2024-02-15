import axios from "axios";

export const BASE_URL = "https://explore-ri-backend-b8b2d1c6dd79.herokuapp.com/"

const Client = axios.create({baseURL: BASE_URL})

export default Client