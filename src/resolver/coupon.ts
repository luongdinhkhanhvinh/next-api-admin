import loadCoupons from 'src/data/coupon';
import { transKeys } from 'src/helpers/i18n';
import search from 'src/helpers/search';
import Coupon from 'src/types/coupon';
import AddCouponInput from 'src/types/inputCoupon';
import { Resolver, Mutation, Arg, Query } from 'type-graphql';

@Resolver()
export default class CouponResolver {
  private readonly couponsCollection: Coupon[] = loadCoupons();

  @Query((returns) => [Coupon], { description: transKeys.get_coupons })
  async coupons(
    @Arg('status', { nullable: true }) status?: string,
    @Arg('searchBy', { nullable: true }) searchBy?: string,
  ): Promise<Coupon[] | undefined> {
    let coupons = this.couponsCollection;
    if (status) {
      coupons = coupons.filter((coupon) => coupon.status === status);
    }
    return await search(coupons, ['title', 'code'], searchBy);
  }

  @Mutation((returns) => Coupon)
  async createCoupon(@Arg('coupon') coupon: AddCouponInput): Promise<Coupon | undefined> {
    console.log(coupon, 'coupon');

    return coupon;
  }
}
