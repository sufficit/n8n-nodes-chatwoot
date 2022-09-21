import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	apiRequest,
} from '../GenericFunctions';

import type { ChatWoot } from '../types';

export async function resourceAccount(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> {
	const credentials = await this.getCredentials('chatWootToken') as ChatWoot.Credentials;

	let responseData;
	if (operation === 'information') {
		let endpoint: string = '/api/v1/accounts/{{accountId}}';

		let AccountId = this.getNodeParameter('accountId', i) as string;
		if(!AccountId){
			AccountId = credentials.accountId;
		}

		endpoint = endpoint.replace('{{accountId}}', AccountId); 
		responseData = await apiRequest.call(this, 'GET', endpoint);
	} 
			
	return responseData;
}