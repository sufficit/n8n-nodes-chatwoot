import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceAccount(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

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
