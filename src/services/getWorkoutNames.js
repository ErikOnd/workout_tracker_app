import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "@env";
const accessToken = "";
const getWorkoutsNames = async () => {
  try {
    const res = await fetch(`${REACT_APP_API_URL}/workouts/me/names`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const workoutNames = await res.json();
      return workoutNames;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWorkoutsNames;
