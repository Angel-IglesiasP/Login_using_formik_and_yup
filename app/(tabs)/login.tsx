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
        <View>
          <Text style={{ alignSelf: "center", padding: 5 }}>
            Welcome to login
          </Text>

          <Text>Email</Text>
          <TextInput
            style={{ borderWidth: 1, maxWidth: 200 }}
            value={values.email}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text>Password</Text>
          <TextInput
            style={{ borderWidth: 1, maxWidth: 200 }}
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
            {isSubmitting ? <ActivityIndicator /> : <Text>Submit</Text>}
          </Pressable>

          {status && <FormErrorNote message={status} />}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#006eff",
    borderRadius: 5,
    padding: 5,
    maxWidth: 250,
  },

  disabled: { opacity: 0.6 },
});
