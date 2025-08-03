import * as yup from "yup";
import { VALIDATION_RULES } from "./constants";

// Task creation/update validation schema - Simplified
export const taskValidationSchema = yup.object({
  title: yup
    .string()
    .required("Görev başlığı zorunludur")
    .min(
      VALIDATION_RULES.TITLE_MIN_LENGTH,
      `Görev başlığı en az ${VALIDATION_RULES.TITLE_MIN_LENGTH} karakter olmalıdır`
    )
    .max(
      VALIDATION_RULES.TITLE_MAX_LENGTH,
      `Görev başlığı en fazla ${VALIDATION_RULES.TITLE_MAX_LENGTH} karakter olabilir`
    )
    .trim(),

  description: yup
    .string()
    .max(
      VALIDATION_RULES.DESCRIPTION_MAX_LENGTH,
      `Açıklama en fazla ${VALIDATION_RULES.DESCRIPTION_MAX_LENGTH} karakter olabilir`
    )
    .nullable()
    .transform((value) => value || null), // Empty string to null

  isCompleted: yup.boolean().default(false),
});

// Form default values - Simplified
export const defaultTaskValues = {
  title: "",
  description: "",
  isCompleted: false,
};
