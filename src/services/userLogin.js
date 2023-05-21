import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "@env";

const userLogin = async (data) => {
  try {
    console.log("apiUrl:", `${REACT_APP_API_URL}/users/login`);
    const res = await fetch(`${REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const accessToken = await res.json();
      console.log("accessToken", accessToken);
      if (accessToken && accessToken.accessToken) {
        await AsyncStorage.setItem("accessToken", accessToken.accessToken);
      }
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      if (storedAccessToken) {
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default userLogin;
