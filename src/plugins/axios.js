import axios from "axios";

axios.defaults.baseURL = "https://etcmf.keannu1.duckdns.org/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;

// import axios from "axios";

// axios.defaults.baseURL = "https://jaydemike.pythonanywhere.com/api/v1/";
// axios.defaults.headers.post["Content-Type"] = "application/json";

// export default axios;
