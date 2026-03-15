import { AccountSetupAuth } from "@/src/auth/account-auth";
import { FormErrorNote } from "@/src/error-note";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";

type SignUpValues = {
  name: string;
  email: string;
  pass: string;
  passConfirm: string;
};

const SignUpSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  pass: yup.string().min(6, "Min 6 characters").required("pass is required"),
  passConfirm: yup
    .string()
    .min(6, "Min 6 characters")
    .required("Must confirm password")
    .oneOf([yup.ref("pass"), ""], "both passwords must mtach"),
});

export default function SignUpForm() {
  const initialValues: SignUpValues = {
    name: "",
    email: "",
    pass: "",
    passConfirm: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={async () => {
        await AccountSetupAuth();
        console.log("Account Created");
        router.navigate("/success-page");
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }) => (
        <View style={styles.screen}>
          <Text style={styles.title}>Sign Up</Text>

          <Text style={styles.textInputTitle}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Ex. Jefferson Jimmy"
          />
          <FormErrorNote message={touched.name ? errors.name : undefined} />

          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="jefferson@gmail.com"
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text style={styles.textInputTitle}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={values.pass}
            onChangeText={handleChange("pass")}
            onBlur={handleBlur("pass")}
            placeholder="Password123"
          />
          <FormErrorNote message={touched.pass ? errors.pass : undefined} />

          <Text style={styles.textInputTitle}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            value={values.passConfirm}
            onChangeText={handleChange("passConfirm")}
            onBlur={handleBlur("passConfirm")}
            placeholder="Password123"
          />
          <FormErrorNote
            message={touched.passConfirm ? errors.passConfirm : undefined}
          />

          <Pressable
            style={[styles.button, !isValid && styles.disabled]}
            onPress={() => handleSubmit()}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </Pressable>
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

  title: {
    fontSize: 30,
    fontWeight: "700",
    margin: 10,
  },

  textInput: {
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
  textInputTitle: {
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

  disabled: { opacity: 0.4 },
});
