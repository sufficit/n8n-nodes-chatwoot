import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceAccount(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	let accessToken = this.getNodeParameter('accessToken', i, '') as string;
	let accountId = this.getNodeParameter('accountId', i, '') as string;

	if (!accountId) {
		const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
		if (credentials) {
			accessToken = accessToken || credentials.accessToken;
			accountId = accountId || credentials.accountId;
		}
	}

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	let responseData;
	if (operation === 'accountInformation') {
		let endpoint = '/api/v1/accounts/{{accountId}}';
		endpoint = endpoint.replace('{{accountId}}', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}

	return responseData;
}
