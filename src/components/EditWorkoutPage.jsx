import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import getWorkoutById from "../services/getWorkoutById";
import Swiper from "react-native-swiper";

const EditWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const route = useRoute();
  const { workoutId } = route.params;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getWorkoutById(workoutId);
    setWorkoutData(data);
  };

  const handleRepsChange = (exerciseIndex, setIndex, reps) => {
    const updatedWorkoutData = { ...workoutData };
    updatedWorkoutData.exercises[exerciseIndex].sets[setIndex].repetitions =
      reps;
    setWorkoutData(updatedWorkoutData);
  };

  const handleWeightChange = (exerciseIndex, setIndex, weight) => {
    const updatedWorkoutData = { ...workoutData };
    updatedWorkoutData.exercises[exerciseIndex].sets[setIndex].weight_lifted =
      weight;
    setWorkoutData(updatedWorkoutData);
  };

  const handleFinishedExercise = (exerciseIndex) => {
    Alert.alert(
      "Confirm Completion",
      "Are you done with this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Done",
          style: "destructive",
          onPress: () => handleExerciseCompletion(exerciseIndex),
        },
      ],
      { cancelable: false }
    );
  };

  const handleExerciseCompletion = (exerciseIndex) => {
    const updatedCompletedExercises = [...completedExercises];
    updatedCompletedExercises.push(exerciseIndex);
    setCompletedExercises(updatedCompletedExercises);
  };

  const isExerciseCompleted = (exerciseIndex) => {
    return completedExercises.includes(exerciseIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Edit Workout</Text>
      {workoutData ? (
        <Swiper
          style={styles.swiperContainer}
          dotColor="#C4C4C4"
          activeDotColor="#FF5E5E"
          paginationStyle={styles.paginationStyle}
        >
          {workoutData.exercises.map((exercise, exerciseIndex) => (
            <View
              key={exercise._id}
              style={[
                styles.exerciseContainer,
                isExerciseCompleted(exerciseIndex) && styles.completedExercise,
              ]}
            >
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Image
                source={{ uri: exercise.gifUrl }}
                style={styles.gifImage}
              />
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Set</Text>
                  <Text style={styles.tableHeader}>Reps</Text>
                  <Text style={styles.tableHeader}>Weight</Text>
                </View>
                {exercise.sets.map((set, setIndex) => (
                  <View key={set._id} style={styles.tableRow}>
                    <Text style={styles.tableData}>{setIndex + 1}</Text>
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={set.repetitions.toString()}
                      onChangeText={(reps) =>
                        handleRepsChange(exerciseIndex, setIndex, reps)
                      }
                    />
                    <TextInput
                      style={styles.textInput}
                      keyboardType="numeric"
                      value={set.weight_lifted.toString()}
                      onChangeText={(weight) =>
                        handleWeightChange(exerciseIndex, setIndex, weight)
                      }
                    />
                  </View>
                ))}
              </View>
              {!isExerciseCompleted(exerciseIndex) && (
                <TouchableOpacity
                  style={styles.finishedButton}
                  onPress={() => handleFinishedExercise(exerciseIndex)}
                >
                  <Text style={styles.finishedButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </Swiper>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  swiperContainer: {
    flex: 1,
  },
  paginationStyle: {
    bottom: 16,
  },
  exerciseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  completedExercise: {
    backgroundColor: "#DFF0D8",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  gifImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  tableContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  tableData: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    textAlign: "center",
  },
  finishedButton: {
    marginTop: 16,
    backgroundColor: "#FF5E5E",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  finishedButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditWorkoutPage;
