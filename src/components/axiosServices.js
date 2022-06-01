import axios from "axios";

const axiosService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
}
export default axiosService;