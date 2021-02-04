import loadOrders from 'src/data/order';
import { transKeys } from 'src/helpers/i18n';
import search from 'src/helpers/search';
import Order from 'src/types/order';
import { Arg, ID, Int, Query, Resolver } from 'type-graphql';

@Resolver()
export default class OrderResolver {
  private readonly ordersCollection: Order[] = loadOrders();

  @Query((returns) => [Order], { description: transKeys.get_orders })
  async orders(
    @Arg('status', (type) => String, { nullable: true }) status: string,
    @Arg('limit', (type) => Int, { defaultValue: 50 }) limit: number,
    @Arg('searchText', (type) => String, { defaultValue: '' }) searchText: string,
  ): Promise<Order[] | undefined> {
    let orders = this.ordersCollection;
    if (status) {
      orders = orders.filter((order) => order.status === status);
    }
    return await search(orders.slice(0, limit), ['delivery_address'], searchText);
  }

  @Query((returns) => Order, { description: transKeys.get_single_order })
  async order(@Arg('id', (type) => ID) id: string): Promise<Order | undefined> {
    return this.ordersCollection.find((item) => item.id === id);
  }

  // @Mutation(returns => Order, { description: 'Add an Order' })
  // async addOrder(@Arg('orderInput') orderInput: Order): Promise<Order> {
  //   console.log(orderInput, 'orderinput');
  //   return await orderInput;
  // }
}
