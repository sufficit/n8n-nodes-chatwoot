import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import type { ChatWoot } from '../types';

export async function resourceAccount(this: IExecuteFunctions, operation: string, items: INodeExecutionData[], i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootToken') as ChatWoot.Credentials;

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
