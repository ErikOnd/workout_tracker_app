import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import googleBtn from "../../assets/google-signin.png";
import logo from "../../assets/logo.png";
import userLogin from "../services/userLogin";
import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const path = await userLogin(formData);
    if (path) {
      navigation.navigate("WorkoutPage");
    } else {
      setErrorMessage(true);
    }
  };

  const handleLoginWithGoogle = () => {
    // Handle login with Google logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo}></Image>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />

        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {errorMessage && (
          <Text style={styles.errorMessage}>Email or Password incorrect</Text>
        )}

        <View style={styles.imageContainer}>
          <Image
            source={googleBtn}
            style={styles.googleButton}
            onPress={handleLoginWithGoogle}
          />
        </View>

        {/* Other components and logic */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#36363c",
  },
  heading: {
    fontSize: 24,
    marginBottom: 150,
    marginTop: 100,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  googleButton: {
    width: 200,
    resizeMode: "contain",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
    marginTop: 50,
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: "#FF8A00",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default LoginPage;
