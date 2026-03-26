import * as yup from "yup";

export const singinSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "Email must be valid and end with .com"),
    password: yup
        .string()
        .required("Password is required")
        .min(6, "Minimum 6 characters")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/[0-9]/, "Must contain at least one number")
        .matches(
            /[@$!%*?&#^()_\-+=]/,
            "Must contain at least one special character"
        )

})