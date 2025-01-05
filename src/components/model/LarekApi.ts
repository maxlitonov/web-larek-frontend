import {
	ApiListResponse,
	ILarekApi,
	ProductApi,
} from '../../types/components/model/larekApi';
import { IOrder, IOrderResult } from '../../types/components/view/Order';
import { Api } from '../base/Api';

export class larekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<ProductApi[]> {
		return this.get('/product').then((data: ApiListResponse<ProductApi>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProducts(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
