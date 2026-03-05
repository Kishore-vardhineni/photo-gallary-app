import * as yup from "yup";

export const resetPasswodSchema = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters"),
});