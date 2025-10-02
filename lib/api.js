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

    if (response.data?.success === false) {
      throw new Error(response.data.message || "API request failed");
    }

    return response;
  } catch (error) {
    console.log(error);

    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `API request failed with status ${error.response.status}`
      );
    }

    throw new Error(error.message || "Network error");
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
