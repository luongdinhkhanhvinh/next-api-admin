import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import { sortByHighestNumber, sortByLowestNumber } from 'src/helpers/sort';
import search from 'src/helpers/search';
import shuffle from 'src/helpers/shuffle';
import AddProductInput from 'src/types/inputProduct';
import GetProductsArgs from 'src/types/argsProduct';
import Product from 'src/types/product';
import ProductsConnection from 'src/types/products';
import loadProducts from 'src/data/product';
import { Contanst } from 'src/commons/constants';
import { transKeys } from 'src/helpers/i18n';

@Resolver()
export default class ProductResolver {
  private readonly productsCollection: Product[] = loadProducts();

  @Query((returns) => ProductsConnection, { description: transKeys.get_products })
  async products(
    @Args()
    { limit, offset, sortByPrice, type, searchText, category }: GetProductsArgs,
  ): Promise<ProductsConnection> {
    let products = this.productsCollection;
    if (category) {
      products = products.filter((product) =>
        product.categories.find((category_item) => category_item.slug === category),
      );
    }
    if (type) {
      products = products.filter((product) => product.type === type);
    }
    if (sortByPrice) {
      if (sortByPrice === Contanst.HIGHEST_TO_LOWEST) {
        products = sortByHighestNumber(products, 'price');
      }
      if (sortByPrice === Contanst.LOWEST_TO_HIGHEST) {
        products = sortByLowestNumber(products, 'price');
      }
    } else {
      products = shuffle(products);
    }

    // return await products.slice(0, limit);
    products = await search(products, ['name'], searchText);
    const hasMore = products.length > offset + limit;

    return {
      items: products.slice(offset, offset + limit),
      totalCount: this.productsCollection.length,
      hasMore,
    };
  }

  @Query(() => Product)
  async product(@Arg('slug') slug: string): Promise<Product | undefined> {
    return this.productsCollection.find((item) => item.slug === slug);
  }

  @Mutation(() => Product, { description: transKeys.create_categories })
  async createProduct(@Arg('product') product: AddProductInput): Promise<Product> {
    console.log(product, 'product');

    return product;
  }
}
