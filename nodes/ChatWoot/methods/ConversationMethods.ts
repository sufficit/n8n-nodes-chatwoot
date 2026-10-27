import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceConversation(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	
	if (operation === 'conversationList') {
		const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
		const query: IDataObject = {};

		// Add filters to query parameters
		if (filters.status) {
			query.status = filters.status;
		}
		if (filters.assignee_type) {
			query.assignee_type = filters.assignee_type;
		}
		if (filters.inbox_id) {
			query.inbox_id = filters.inbox_id;
		}
		if (filters.team_id) {
			query.team_id = filters.team_id;
		}
		if (filters.labels) {
			query.labels = filters.labels;
		}
		if (filters.page) {
			query.page = filters.page;
		}

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, query, headers);
	}
	else if (operation === 'conversationGet') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'conversationToggleStatus') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const status = this.getNodeParameter('status', i) as string;

		const body: IDataObject = {
			status,
		};

		// Add snoozed_until if status is snoozed
		if (status === 'snoozed') {
			const snoozedUntil = this.getNodeParameter('snoozed_until', i, '') as string;
			if (snoozedUntil) {
				// Convert to Unix timestamp
				body.snoozed_until = Math.floor(new Date(snoozedUntil).getTime() / 1000);
			}
		}

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/toggle_status';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'conversationAssign') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const assigneeType = this.getNodeParameter('assigneeType', i) as string;

		const body: IDataObject = {};

		if (assigneeType === 'agent') {
			body.assignee_id = this.getNodeParameter('assignee_id', i) as number;
		} else if (assigneeType === 'team') {
			body.team_id = this.getNodeParameter('team_id', i) as number;
		} else if (assigneeType === 'unassign') {
			body.assignee_id = 0;
		}

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/assignments';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'conversationAddLabels') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const labelsString = this.getNodeParameter('labels', i) as string;

		const labels = labelsString.split(',').map(l => l.trim()).filter(l => l);

		const body: IDataObject = {
			labels,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/labels';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'conversationUpdatePriority') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const priority = this.getNodeParameter('priority', i) as string | null;

		const body: IDataObject = {
			priority,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'PATCH', endpoint, body, {}, headers);
	}
	else if (operation === 'conversationMute') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const muted = this.getNodeParameter('muted', i) as boolean;

		const body: IDataObject = {
			muted,
		};

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'PATCH', endpoint, body, {}, headers);
	}

	return responseData;
}
