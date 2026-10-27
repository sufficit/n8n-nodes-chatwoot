import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceMessage(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
	
	// Allow account ID override from node parameters, otherwise use credentials
	const accountId = this.getNodeParameter('accountId', i, '') as string || credentials.accountId;
	const accessToken = credentials.accessToken;

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	
	if (operation === 'messageSend') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const content = this.getNodeParameter('content', i) as string;
		const messageType = this.getNodeParameter('message_type', i) as string;
		const isPrivate = this.getNodeParameter('private', i) as boolean;
		const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

		const body: IDataObject = {
			content,
			message_type: messageType,
			private: isPrivate,
		};

		if (additionalFields.echo_id) {
			body.echo_id = additionalFields.echo_id;
		}

		if (additionalFields.content_attributes) {
			try {
				body.content_attributes = JSON.parse(additionalFields.content_attributes as string);
			} catch (error) {
				throw new Error('Content Attributes must be valid JSON');
			}
		}

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/messages';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'messageList') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/messages';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}
	else if (operation === 'messageDelete') {
		const conversationId = this.getNodeParameter('conversationId', i) as number;
		const messageId = this.getNodeParameter('messageId', i) as number;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/conversations/:conversation_id/messages/:message_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':conversation_id', conversationId.toString());
		endpoint = endpoint.replace(':message_id', messageId.toString());
		responseData = await apiRequest.call(this, 'DELETE', endpoint, {}, {}, headers);
	}

	return responseData;
}
