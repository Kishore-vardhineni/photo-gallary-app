import * as yup from "yup";

export const resetPasswodSchema = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm Password is requierd")
        .oneOf([yup.ref("password"), null], "Passwords must match")
});