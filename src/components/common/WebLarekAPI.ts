import { Api } from '../base/api';

export class IWebLarekAPI {
	readonly cdn: string;
	readonly api: Api;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		this.api = new Api(baseUrl, options);
		this.cdn = cdn;
	}
}
