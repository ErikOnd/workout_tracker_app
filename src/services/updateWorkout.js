import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "@env";

const updateWorkout = async (data, workout_id) => {
  try {
    console.log("here updateWorkout", workout_id);
    const res = await fetch(`${REACT_APP_API_URL}/workouts/${workout_id}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      return false;
    } else {
      console.log("update worked");

      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateWorkout;
