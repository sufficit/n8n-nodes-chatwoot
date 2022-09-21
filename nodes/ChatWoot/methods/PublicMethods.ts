import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import type { ChatWoot } from '../types';

export async function resourcePublic(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> {
	const credentials = await this.getCredentials('chatWootToken') as ChatWoot.Credentials;

	const baseEndpoint: string = '/public/api/v1/inboxes/{{inboxIdentifier}}';

	let InboxIdentifier = this.getNodeParameter('inboxIdentifier', i) as string;
	let endpoint: string = baseEndpoint.replace('{{inboxIdentifier}}', InboxIdentifier);

	let responseData;
	if (operation === 'contactCreate') {
		endpoint = endpoint + "/contacts"

		let contactName = this.getNodeParameter('name', i) as string;
		let contactPhoneNumber = this.getNodeParameter('phoneNumber', i) as string;
		let contactIdentifier = this.getNodeParameter('identifier', i) as string;
		let body: ChatWoot.ContactGetOrCreateRequest = {
			name: contactName,
			phone_number: contactPhoneNumber,
			source_id: contactIdentifier,
		};

		// Handle custom headers
		let customAttributes = this.getNodeParameter('customAttributes', i) as IDataObject;		
		if (customAttributes) {
			const data: any = {}; // tslint:disable-line:no-any

			//@ts-ignore
			customAttributes.attribute.map(property => {
				data[property.key] = property.value;
			});

			body.custom_attributes = data;
		}

		responseData = await apiRequest.call(this, 'POST', endpoint, body);
	} 
	else if (operation === 'contact'){
		endpoint = endpoint + "/contacts/{{contactIdentifier}}"

		let ContactIdentifier = this.getNodeParameter('contactIdentifier', i) as string;
		endpoint = endpoint.replace('{{contactIdentifier}}', ContactIdentifier);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	}
	else if (operation === 'messages') {
		endpoint = endpoint + "/contacts/{{contactIdentifier}}/conversations/{{conversationId}}/messages"

		let ContactIdentifier = this.getNodeParameter('contactIdentifier', i) as string;
		endpoint = endpoint.replace('{{contactIdentifier}}', ContactIdentifier);

		let ConversationId = this.getNodeParameter('conversationId', i) as string;
		endpoint = endpoint.replace('{{conversationId}}', ConversationId);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	} 
			
	return responseData;
}