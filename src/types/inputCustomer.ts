import { InputType, Field, ID } from 'type-graphql';
import Customer from './customer';
import AddAddressInput from './inputAddress';

import AddCardInput from './inputCard';
import AddContactInput from './inputContact';
@InputType({ description: 'New recipe data' })
export default class AddCustomerInput implements Partial<Customer> {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  email: string;

  @Field((type) => [AddAddressInput])
  address: AddAddressInput[];

  @Field((type) => [AddContactInput])
  contact: AddContactInput[];

  @Field((type) => [AddCardInput])
  card: AddCardInput[];

  password: string;

  @Field()
  creation_date: Date;

  @Field({ defaultValue: false })
  has_blocked: boolean;

  @Field({ defaultValue: 'silver' })
  rank: string;
}
