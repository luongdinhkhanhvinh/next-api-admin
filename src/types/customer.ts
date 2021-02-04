import { Field, Int, ObjectType } from 'type-graphql';
import User from './user';

@ObjectType()
export default class Customer extends User {
  @Field({ defaultValue: false })
  has_blocked: boolean;

  @Field((type) => Int, { nullable: true })
  total_order?: number;

  @Field((type) => Int, { nullable: true })
  total_order_amount?: number;

  @Field({ defaultValue: 'silver' })
  rank?: string;
}
