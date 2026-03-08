import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceAgent(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	
	if (operation === 'agentList') {
		let endpoint = apiVersionPrefix + '/accounts/:account_id/agents';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'agentGet') {
		const agentId = this.getNodeParameter('agentId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/agents/:agent_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':agent_id', agentId.toString());
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'agentUpdateAvailability') {
		const agentId = this.getNodeParameter('agentId', i) as number;
		const availability = this.getNodeParameter('availability', i) as string;

		const body: IDataObject = {
			availability,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/agents/:agent_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':agent_id', agentId.toString());
		responseData = await apiRequest.call(this, 'PATCH', endpoint, body, {}, headers);
	}

	return responseData;
}
