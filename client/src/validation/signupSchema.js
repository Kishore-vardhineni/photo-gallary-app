import * as yup from "yup";

export const signupSchema = yup.object({
    role: yup
        .string()
        .required("Please select the role"),
    username: yup
        .string()
        .required("User Name is required")
        .min(3, "Minimum 3 characters"),
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "Email must be valid and end with .com"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is requierd")
        .oneOf([yup.ref("password"), null], "Passwords must match")
})