import axios from "axios";

export async function adminAPI(url, options = {}) {
  const token = "admin-token";

  try {
    const dataToSend = options.body; 

    const response = await axios({
      url,
      method: options.method || "GET",
      data: dataToSend,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      },
    });

    return response;
  } catch (error) {
    

    throw new Error(error?.response?.data?.message || "Network error");
  }
}

export async function clientAPI(url, options = {}) {
  try {
    const dataToSend = options.body;

    const response = await axios({
      url,
      method: options.method || "GET",
      data: dataToSend,
      headers: {
        ...(options.headers || {}),
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `API request failed with status ${error.response.status}`
      );
    }
    throw new Error(error.message || "Network error");
  }
}
