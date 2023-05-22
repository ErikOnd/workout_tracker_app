import React, { useEffect, useState } from "react";
import getWorkoutNames from "../services/getWorkoutNames";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WorkoutPage = () => {
  const [workoutNames, setWorkoutNames] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const names = await getWorkoutNames();
    setWorkoutNames(names);
  };

  const handleWorkoutClick = (workoutId) => {
    navigation.navigate("EditWorkoutPage", { workoutId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Workouts</Text>
      {workoutNames ? (
        workoutNames.map((workout) => (
          <TouchableOpacity
            key={workout._id}
            onPress={() => handleWorkoutClick(workout._id)}
            style={styles.workoutContainer}
          >
            <Text style={styles.workoutName}>{workout.workout_name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36363c",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
    color: "#FF8A00",
    fontWeight: "800",
    marginTop: 50,
  },
  workoutContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  workoutName: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  loadingText: {
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

export default WorkoutPage;
