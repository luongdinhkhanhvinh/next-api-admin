import { Field, Int, ObjectType } from 'type-graphql';
import Product from './product';

@ObjectType()
export default class ProductsConnection {
  @Field((type) => [Product])
  items: Product[];

  @Field((type) => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}
