// 已重构
// 密码校验规则
const PasswordValidator = require("password-validator");

const schema = new PasswordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(16) // Maximum length 16
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .symbols()
  .has()
  .not()
  .spaces(); // Should not have spaces

export const isPasswordValid = (password: string): boolean =>
  schema.validate(password);