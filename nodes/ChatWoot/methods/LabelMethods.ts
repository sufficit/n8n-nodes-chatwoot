import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceLabel(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	
	if (operation === 'labelList') {
		let endpoint = apiVersionPrefix + '/accounts/:account_id/labels';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'labelCreate') {
		const title = this.getNodeParameter('title', i) as string;
		const description = this.getNodeParameter('description', i, '') as string;
		const color = this.getNodeParameter('color', i, '#1f93ff') as string;
		const showOnSidebar = this.getNodeParameter('show_on_sidebar', i, true) as boolean;

		const body: IDataObject = {
			title,
			description,
			color,
			show_on_sidebar: showOnSidebar,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/labels';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'labelUpdate') {
		const labelId = this.getNodeParameter('labelId', i) as number;
		const title = this.getNodeParameter('title', i) as string;
		const description = this.getNodeParameter('description', i, '') as string;
		const color = this.getNodeParameter('color', i, '#1f93ff') as string;
		const showOnSidebar = this.getNodeParameter('show_on_sidebar', i, true) as boolean;

		const body: IDataObject = {
			title,
			description,
			color,
			show_on_sidebar: showOnSidebar,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/labels/:label_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':label_id', labelId.toString());
		responseData = await apiRequest.call(this, 'PATCH', endpoint, body, {}, headers);
	}
	else if (operation === 'labelDelete') {
		const labelId = this.getNodeParameter('labelId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/labels/:label_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':label_id', labelId.toString());
		responseData = await apiRequest.call(this, 'DELETE', endpoint, {}, {}, headers);
	}

	return responseData;
}
