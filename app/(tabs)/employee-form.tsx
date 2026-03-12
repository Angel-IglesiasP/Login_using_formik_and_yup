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
import { FormErrorNote } from "../../src/error-note";

type EmployeeValues = {
  fullName: string;
  employeeType: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
};

const EmployeeSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Full name should be at least 3 characters long")
    .max(50, "Full name should be at most 50 characters long")
    .required("Full name is required"),
  employeeType: yup
    .string()
    .oneOf(["Full Time", "Part Time"], "Select Full Time or Part Time")
    .required("Employee type is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),
  department: yup.string().required("Department is required"),
  jobTitle: yup.string().required("Job title is required"),
});

export default function EmployeeForm() {
  const initialValues: EmployeeValues = {
    fullName: "",
    employeeType: "",
    email: "",
    phone: "",
    department: "",
    jobTitle: "",
  };
  const typeOptions = ["Full Time", "Part Time"];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmployeeSchema}
      validateOnMount
      onSubmit={(values, { resetForm }) => {
        console.log("Employee saved:", values);
        resetForm();
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
        dirty,
        resetForm,
        setFieldValue,
        setFieldTouched,
      }) => (
        <View>
          <Text>Employee Information Form</Text>
          <Text>Full Name</Text>
          <TextInput
            style={styles.input}
            value={values.fullName}
            onChangeText={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
            placeholder="Dio Brando"
          />
          <FormErrorNote
            message={touched.fullName ? errors.fullName : undefined}
          />

          <Text>Employee Type</Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 4 }}>
            {typeOptions.map((option) => {
              const selected = values.employeeType === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    setFieldValue("employeeType", option);
                    setFieldTouched("employeeType", true);
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: selected ? "#006eff" : "#999",
                    backgroundColor: selected ? "#dbeafe" : "#fff",
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: selected ? "#006eff" : "#333",
                      fontWeight: "600",
                    }}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <FormErrorNote
            message={touched.employeeType ? errors.employeeType : undefined}
          />

          <Text>Email</Text>
          <TextInput
            style={styles.input}
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="itWasMeDio@DIO.com"
          />
          <FormErrorNote message={touched.email ? errors.email : undefined} />

          <Text>Phone</Text>
          <TextInput
            style={styles.input}
            value={values.phone}
            onChangeText={handleChange("phone")}
            onBlur={handleBlur("phone")}
            keyboardType="number-pad"
            placeholder="5871234567"
          />
          <FormErrorNote message={touched.phone ? errors.phone : undefined} />

          <Text>Department</Text>
          <TextInput
            style={styles.input}
            value={values.department}
            onChangeText={handleChange("department")}
            onBlur={handleBlur("department")}
            placeholder="Stands"
          />
          <FormErrorNote
            message={touched.department ? errors.department : undefined}
          />

          <Text>Job Title</Text>
          <TextInput
            style={styles.input}
            value={values.jobTitle}
            onChangeText={handleChange("jobTitle")}
            onBlur={handleBlur("jobTitle")}
            placeholder="Stand Coordinator"
          />
          <FormErrorNote
            message={touched.jobTitle ? errors.jobTitle : undefined}
          />

          <Pressable
            style={[
              styles.button,
              (!dirty || !isValid || isSubmitting) && styles.disabled,
            ]}
            onPress={() => handleSubmit()}
            disabled={!dirty || !isValid || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Save Employee</Text>
            )}
          </Pressable>

          <Pressable style={styles.resetButton} onPress={() => resetForm()}>
            <Text>Reset Form</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#006eff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
  resetButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
});
