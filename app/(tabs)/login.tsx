import { UserAuth } from "@/src/auth/user-auth";
import { FormErrorNote } from "@/src/error-note";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
    ActivityIndicator,
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

export default function LoginForm() {
  const initivalValues: LoginValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initivalValues}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setStatus }) => {
        setStatus(undefined);
        try {
          await UserAuth(values);
          console.log("Logged In");
          router.navigate("/success-page");
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
          <Text style={styles.pageTitle}>Welcome to login</Text>

          <Text style={styles.textInputTitle}>Email</Text>
          <TextInput
            style={styles.textInput}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="example@gmail.com"
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text style={styles.textInputTitle}>Password</Text>
          <TextInput
            style={styles.textInput}
            value={values.password}
            secureTextEntry
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="Password123"
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
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  screen: { alignItems: "flex-start", gap: 10 },

  pageTitle: {
    fontSize: 30,
    fontWeight: "700",
    margin: 10,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    width: 200,
  },
  textInputTitle: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: "500",
    top: 5,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginHorizontal: 20,
    width: 200,
  },
  buttonText: { color: "white", fontSize: 15, fontWeight: "500" },

  disabled: { opacity: 0.4 },
});
