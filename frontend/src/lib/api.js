import { axiosInstance } from "./axios";

export const loginUser = async (data) => {
  try {
    const res = await axiosInstance.post('/auth/login', {
      email: data.email,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    let errorMessage = "An unexpected error occurred. Please try again.";

    if (err.response) {
      const status = err.response.status;

      if (status === 401) {
        errorMessage = "Incorrect password. Please try again.";
      } else if (status === 404) {
        errorMessage = "User does not exist. Please register.";
      } else {
        errorMessage = "An unexpected error occurred. Please try again.";
      }
    } else {
      errorMessage = "Unable to connect to the server. Please try again later.";
    }

    throw new Error(errorMessage);
  }
};
