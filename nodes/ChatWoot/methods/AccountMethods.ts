import {
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import type { CWModels } from '../models';

export async function resourceAccount(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;

	let responseData;
	if (operation === 'information') {
		let endpoint = '/api/v1/accounts/{{accountId}}';

		let accountId = this.getNodeParameter('accountId', i) as string;
		if(!accountId){
			accountId = credentials.accountId;
		}

		endpoint = endpoint.replace('{{accountId}}', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint);
	}

	return responseData;
}
