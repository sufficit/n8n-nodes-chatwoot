import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import type { ChatWoot } from '../types';

export async function resourcePublic(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const credentials = await this.getCredentials('chatWootToken') as ChatWoot.Credentials;

	const baseEndpoint = '/public/api/v1/inboxes/{{inboxIdentifier}}';

	const inboxIdentifier = this.getNodeParameter('inboxIdentifier', i) as string;
	let endpoint: string = baseEndpoint.replace('{{inboxIdentifier}}', inboxIdentifier);

	let responseData;
	if (operation === 'contactCreate') {
		endpoint = endpoint + "/contacts";

		const body: ChatWoot.ContactGetOrCreateRequest = {
			name: this.getNodeParameter('name', i) as string,
			phone_number: this.getNodeParameter('phoneNumber', i) as string,
			email: this.getNodeParameter('email', i) as string,
			source_id: this.getNodeParameter('identifier', i) as string,
		};

		// Handle custom headers
		const customAttributes = this.getNodeParameter('customAttributes', i) as IDataObject;
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
		endpoint = endpoint + "/contacts/{{contactIdentifier}}";

		const contactIdentifier = this.getNodeParameter('contactIdentifier', i) as string;
		endpoint = endpoint.replace('{{contactIdentifier}}', contactIdentifier);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	}
	else if (operation === 'messages') {
		endpoint = endpoint + "/contacts/{{contactIdentifier}}/conversations/{{conversationId}}/messages";

		const contactIdentifier = this.getNodeParameter('contactIdentifier', i) as string;
		endpoint = endpoint.replace('{{contactIdentifier}}', contactIdentifier);

		const conversationId = this.getNodeParameter('conversationId', i) as string;
		endpoint = endpoint.replace('{{conversationId}}', conversationId);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	}

	return responseData;
}
