import { JoiRequestValidationError } from '@global/helpers/handleErrors';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type validateWithJoiDecoratorType = (descriptor: PropertyDescriptor) => void;

// TODO: return to video 39 and answer the question
export function validateWithJoiDecorator(schema: ObjectSchema): validateWithJoiDecoratorType {
  return (descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: [Request, Response, NextFunction]) {
      const req: Request = args[0];
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
