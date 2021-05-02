import { Request } from 'express';
import { Field, ObjectType } from 'type-graphql';

export type MyContext = {
  req: Request;
  res: Request;
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
