import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
 currentPassword: yup
    .string()
    .required("Old password is required")
    .min(6, "Minimum 6 characters"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Minimum 6 characters"),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});