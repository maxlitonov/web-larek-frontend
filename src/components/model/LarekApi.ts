import { ApiListResponse, Product } from "../../types/components/model/larekApi";
import { Order, OrderResult } from "../../types/components/view/Order";
import { Api } from "../base/Api";

export class larekApi extends Api implements larekApi {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProducts(): Promise<Product[]> {
    return this.get('/product').then((data: ApiListResponse<Product>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        }))
    );
}

  orderProducts(order: Order): Promise<OrderResult> {
    return this.post('/order', order).then(
        (data: OrderResult) => data
    );
}
}