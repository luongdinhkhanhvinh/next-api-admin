import { Field, Float, ID, InputType, Int } from 'type-graphql';
import CategoryInput from './inputCategory';
import Product from './product';
@InputType({ description: 'New recipe data' })
export default class AddProductInput implements Partial<Product> {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field({ defaultValue: '1' })
  unit: string;

  @Field((type) => [CategoryInput], { nullable: true })
  categories: CategoryInput[];

  @Field((type) => Int)
  price: number;

  @Field((type) => Float, { nullable: true })
  salePrice: number;

  @Field((type) => Int, { defaultValue: 0 })
  discountInPercent: number;

  @Field((type) => Int, { defaultValue: 1 })
  per_unit: number;

  @Field((type) => Int)
  quantity: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creation_date: Date;
}
