import { Field, ID, ObjectType } from 'type-graphql';
import Address from './address';
import Card from './card';
import Contact from './contact';

@ObjectType()
export default class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  email: string;

  @Field((type) => [Address])
  addresses: Address[];

  @Field((type) => [Contact])
  contacts: Contact[];

  @Field((type) => [Card])
  card: Card[];

  password: string;

  @Field()
  creation_date: Date;
}
