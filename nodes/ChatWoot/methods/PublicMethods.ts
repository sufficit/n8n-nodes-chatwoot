import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import type { CWModels } from '../models';

export async function resourcePublic(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	const baseEndpoint = '/public/api/v1/inboxes/{{inboxIdentifier}}';

	const inboxIdentifier = this.getNodeParameter('inboxIdentifier', i) as string;
	let endpoint: string = baseEndpoint.replace('{{inboxIdentifier}}', inboxIdentifier);

	let responseData;
	if (operation === 'contactCreate') {
		endpoint = endpoint + "/contacts";

		const body: CWModels.ContactGetOrCreateRequest = {
			name: this.getNodeParameter('name', i) as string,
			phone_number: this.getNodeParameter('phoneNumber', i) as string | undefined,
			email: this.getNodeParameter('email', i) as string | undefined,
			source_id: this.getNodeParameter('identifier', i) as string | undefined,
		};

		// Handle custom headers
		const parCustomAttributes = this.getNodeParameter('customAttributes', i) as IDataObject;
		if (parCustomAttributes && parCustomAttributes.attribute) {
			const data: IDataObject = {}; // tslint:disable-line:no-any

			const atts = parCustomAttributes.attribute as IDataObject[];
			atts.map(property => {
				data[property.key as string] = property.value;
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
