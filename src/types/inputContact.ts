import { Field, ID, InputType } from 'type-graphql';
import Contact from './contact';
@InputType({ description: 'New recipe data' })
export default class AddContactInput implements Partial<Contact> {
  @Field((type) => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  number: string;
}
