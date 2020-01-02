import { validate } from "class-validator";

export default async function validationErrorMessages(entity: Array<any>) {
  const errors = await validate(entity);
  if (errors.length <= 0) {
    return false;
  } else if (errors.length > 0) {
    let messages = errors.map(message => {
      return message.constraints[Object.keys(message.constraints)[0]];
    });
    return messages;
  }
}
