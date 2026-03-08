import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceTeam(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	
	if (operation === 'teamList') {
		let endpoint = apiVersionPrefix + '/accounts/:account_id/teams';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'teamGet') {
		const teamId = this.getNodeParameter('teamId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/teams/:team_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':team_id', teamId.toString());
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'teamGetAgents') {
		const teamId = this.getNodeParameter('teamId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/teams/:team_id/team_members';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':team_id', teamId.toString());
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}

	return responseData;
}
