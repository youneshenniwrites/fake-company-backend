import { JoiRequestValidationError } from '@global/helpers/handleErrors';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

type validateWithJoiDecoratorType<T> = (target: T, key: string, descriptor: PropertyDescriptor) => void;

export function validateWithJoiDecorator<T>(schema: ObjectSchema): validateWithJoiDecoratorType<T> {
  return (_target: T, _key: string, descriptor: PropertyDescriptor) => {
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
