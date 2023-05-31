import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import getWorkoutById from "../services/getWorkoutById";
import Icon from "react-native-vector-icons/FontAwesome";
import updateWorkout from "../services/updateWorkout";
import { useNavigation } from "@react-navigation/native";

const EditWorkoutPage = () => {
  const [workoutData, setWorkoutData] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const route = useRoute();
  const { workoutId } = route.params;
  const navigation = useNavigation();

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

    // check if all exercises are completed
    if (updatedCompletedExercises.length === workoutData.exercises.length) {
      Alert.alert(
        "Workout done 🥳",
        "You've completed all exercises for this workout",
        [
          {
            text: "OK",
            onPress: () => {
              updateWorkout(workoutData, workoutData._id);
              navigation.goBack(); // Navigate back to previous page
            },
          },
        ]
      );
    }
  };

  const isExerciseCompleted = (exerciseIndex) => {
    return completedExercises.includes(exerciseIndex);
  };

  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < workoutData.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{workoutData?.workout_name}</Text>
      {workoutData ? (
        <>
          {isExerciseCompleted(currentExerciseIndex) ? (
            <View style={styles.exerciseContainerCheckmark}>
              <Icon name="check" size={50} color="#FFF" />
              <Text style={styles.exerciseName}>
                {workoutData.exercises[currentExerciseIndex].name}
              </Text>
            </View>
          ) : (
            <View style={styles.exerciseContainer}>
              <ScrollView style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableHeader, styles.tableHeaderCenter]}>
                    Set
                  </Text>
                  <Text style={[styles.tableHeader, styles.tableHeaderCenter]}>
                    Reps
                  </Text>
                  <Text style={[styles.tableHeader, styles.tableHeaderCenter]}>
                    Weight
                  </Text>
                </View>
                {workoutData.exercises[currentExerciseIndex].sets.map(
                  (set, setIndex) => (
                    <View key={set._id} style={styles.tableRow}>
                      <Text style={[styles.tableData, styles.tableDataCenter]}>
                        {setIndex + 1}
                      </Text>
                      <TextInput
                        style={styles.textInput}
                        keyboardType="numbers-and-punctuation"
                        value={set.repetitions.toString()}
                        onChangeText={(reps) =>
                          handleRepsChange(currentExerciseIndex, setIndex, reps)
                        }
                      />
                      <TextInput
                        style={styles.textInput}
                        keyboardType="numbers-and-punctuation"
                        value={set.weight_lifted.toString()}
                        onChangeText={(weight) =>
                          handleWeightChange(
                            currentExerciseIndex,
                            setIndex,
                            weight
                          )
                        }
                      />
                    </View>
                  )
                )}
              </ScrollView>
              <Text style={styles.exerciseName}>
                {workoutData.exercises[currentExerciseIndex].name}
              </Text>
              <Image
                source={{
                  uri: workoutData.exercises[currentExerciseIndex].gifUrl,
                }}
                style={styles.gifImage}
              />

              {!isExerciseCompleted(currentExerciseIndex) && (
                <TouchableOpacity
                  style={styles.finishedButton}
                  onPress={() => handleFinishedExercise(currentExerciseIndex)}
                >
                  <Text style={styles.finishedButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navigationButton,
                { opacity: currentExerciseIndex === 0 ? 0.5 : 1 },
              ]}
              onPress={goToPreviousExercise}
              disabled={currentExerciseIndex === 0}
            >
              <Icon name="chevron-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.navigationButton,
                {
                  opacity:
                    currentExerciseIndex === workoutData.exercises.length - 1
                      ? 0.5
                      : 1,
                },
              ]}
              onPress={goToNextExercise}
              disabled={
                currentExerciseIndex === workoutData.exercises.length - 1
              }
            >
              <Icon name="chevron-right" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#36363c",
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#FF8A00",
    textAlign: "center",
    marginTop: 50,
  },
  exerciseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  exerciseContainerCheckmark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
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
    maxHeight: 250,
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2C2C33",
    paddingVertical: 8,
    borderRadius: 8,
  },
  tableHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  tableHeaderCenter: {
    alignItems: "center",
  },
  tableData: {
    flex: 1,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  tableDataCenter: {
    alignItems: "center",
    marginLeft: 18,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    marginLeft: 25,
    textAlign: "center",
    color: "white",
  },
  finishedButton: {
    marginTop: 16,
    backgroundColor: "#FF8A00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  finishedButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  navigationButton: {
    backgroundColor: "#FF8A00",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  navigationButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default EditWorkoutPage;
