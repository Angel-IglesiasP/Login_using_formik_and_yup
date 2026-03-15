import { UserAuth } from "@/src/auth/user-auth";
import { FormErrorNote } from "@/src/error-note";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

type LoginValues = {
  email: string;
  password: string;
};

const LoginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required"),
});
const cloudIcon = [
  { top: 60, left: -25 },
  { top: 150, left: 10 },
  { top: 15, left: 80 },
  { top: 85, left: 190 },
  { top: 155, left: 270 },
  { top: 40, left: 320 },
];

export default function LoginForm() {
  const router = useRouter();
  const initivalValues: LoginValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initivalValues}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setStatus }) => {
        setStatus(undefined);
        try {
          await UserAuth(values);
          router.navigate("/employee-form");
        } catch (err) {
          setStatus("Either email or password is wrong");
        }
      }}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        status,
      }) => (
        <View style={styles.screen}>
          {cloudIcon.map((pos, index) => (
            <Image
              key={index}
              source={require("../../assets/images/cloud-icon.png")}
              style={[styles.logo, pos]}
              resizeMode="contain"
            />
          ))}

          <Text style={styles.title}>Welcome to login</Text>

          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.textImput}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.textImput}
            value={values.password}
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
          />
          <FormErrorNote
            message={touched.password ? errors.password : undefined}
          />

          <Pressable
            onPress={() => handleSubmit()}
            disabled={isSubmitting || !isValid}
            style={[styles.button, !isValid && styles.disabled]}
          >
            {isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </Pressable>

          {status && <FormErrorNote message={status} />}
          <Image
            source={require("../../assets/images/ground-con.png")}
            style={styles.ground}
            resizeMode="stretch"
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#b4c6db",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    margin: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
  textImput: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    width: 200,
    backgroundColor: "#d8d3d3",
    marginTop: 10,
    padding: 5,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#006eff",
    borderRadius: 5,
    padding: 10,
    maxWidth: 250,
    borderColor: "#252222",
    borderWidth: 1,
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },

  disabled: { opacity: 0.6 },
  ground: {
    width: "200%",
    height: "25%",
    position: "absolute",
    bottom: 0,
  },
});
