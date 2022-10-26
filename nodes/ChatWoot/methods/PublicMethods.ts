import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourcePublic(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const baseEndpoint = '/public/api/v1/inboxes/{{inbox_identifier}}';

	const inboxIdentifier = this.getNodeParameter('inboxIdentifier', i) as string;
	let endpoint: string = baseEndpoint.replace('{{inbox_identifier}}', inboxIdentifier);

	let responseData;
	if (operation === 'contactCreate') {
		endpoint = endpoint + "/contacts";

		const body: CWModels.ContactGetOrCreateRequest = {
			name: this.getNodeParameter('name', i) as string,
			phone_number: this.getNodeParameter('phoneNumber', i, '') as string,
			email: this.getNodeParameter('email', i, '') as string,
			source_id: this.getNodeParameter('sourceId', i, '') as string,
			identifier: this.getNodeParameter('contactIdentifier', i, '') as string,
		};

		// Handle custom headers
		const parCustomAttributes = this.getNodeParameter('customAttributes', i) as IDataObject;
		if (parCustomAttributes && parCustomAttributes.attribute) {
			const data: IDataObject = {};

			const atts = parCustomAttributes.attribute as IDataObject[];
			atts.map(property => {
				data[property.key as string] = property.value;
			});

			body.custom_attributes = data;
		}

		responseData = await apiRequest.call(this, 'POST', endpoint, body);
	}
	else if (operation === 'contact'){
		endpoint = endpoint + "/contacts/{{source_id}}";

		const contactIdentifier = this.getNodeParameter('sourceId', i) as string;
		endpoint = endpoint.replace('{{source_id}}', contactIdentifier);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	}
	else if (operation === 'messageCreate') {
		const body: CWModels.CreateMessageRequest = {
			content: this.getNodeParameter('content', i) as string,
		};

		endpoint = endpoint + "/contacts/{{source_id}}/conversations/{{conversation_id}}/messages";

		const contactIdentifier = this.getNodeParameter('sourceId', i) as string;
		endpoint = endpoint.replace('{{source_id}}', contactIdentifier);

		const conversationId = this.getNodeParameter('conversationId', i) as string;
		endpoint = endpoint.replace('{{conversation_id}}', conversationId);

		responseData = await apiRequest.call(this, 'POST', endpoint, body);
	}
	else if (operation === 'messages') {
		endpoint = endpoint + "/contacts/{{source_id}}/conversations/{{conversationId}}/messages";

		const contactIdentifier = this.getNodeParameter('sourceId', i) as string;
		endpoint = endpoint.replace('{{source_id}}', contactIdentifier);

		const conversationId = this.getNodeParameter('conversationId', i) as string;
		endpoint = endpoint.replace('{{conversationId}}', conversationId);

		responseData = await apiRequest.call(this, 'GET', endpoint);
	}

	return responseData;
}
