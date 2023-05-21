import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "@env";
const getWorkoutById = async (workoutId) => {
  try {
    const res = await fetch(`${REACT_APP_API_URL}/workouts/${workoutId}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
      },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    } else {
      const workoutData = await res.json();
      return workoutData;
    }
  } catch (error) {
    console.log(error);
  }
};

export default getWorkoutById;
