import loadCategories from 'src/data/category';
import { transKeys } from 'src/helpers/i18n';
import search from 'src/helpers/search';
import Category from 'src/types/category';
import AddCategoryInput from 'src/types/inputCategory';
import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql';

@Resolver()
export default class CategoryResolver {
  private readonly categoriesCollection: Category[] = loadCategories();

  @Query((returns) => [Category], { description: transKeys.get_categories })
  async categories(
    @Arg('type', { nullable: true }) type?: string,
    @Arg('searchBy', { defaultValue: '' }) searchBy?: string,
  ): Promise<Category[]> {
    let categories = this.categoriesCollection;

    if (type) {
      categories = categories.filter((category) => category.type === type);
    }
    return await search(categories, ['name'], searchBy);
  }

  @Query((returns) => Category)
  async category(@Arg('id', (type) => ID) id: string): Promise<Category | undefined> {
    return this.categoriesCollection.find((category) => category.id === id);
  }

  @Mutation(() => Category, { description: transKeys.create_categories })
  async createCategory(@Arg('category') category: AddCategoryInput): Promise<Category> {
    console.log(category, 'category');

    return category;
  }
}
