import {
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

import {
	apiRequest,
} from '../GenericFunctions';

import { CWModels } from '../models';

export async function resourceContact(this: IExecuteFunctions, operation: string, items: any, i: number): Promise<any> { // tslint:disable-line:no-any
	let accessToken = this.getNodeParameter('accessToken', i, '') as string;
	let accountId = this.getNodeParameter('accountId', i, '') as string;

	if (!accountId) {
		const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
		if (credentials) {
			accessToken = accessToken || credentials.accessToken;
			accountId = accountId || credentials.accountId;
		}
	}

	const headers: IDataObject = {
		'api_access_token': accessToken,
	};

	const apiVersionPrefix = '/api/v1';

	let responseData;
	if (operation === 'contactUpdate') {

		const body: CWModels.ContactUpdateRequest = {
			name: this.getNodeParameter('name', i, null) as string | undefined,
			inbox_id: this.getNodeParameter('inboxId', i, null) as string | undefined,
			phone_number: this.getNodeParameter('phoneNumber', i, null) as string | undefined,
			email: this.getNodeParameter('email', i, null) as string | undefined,
			source_id: this.getNodeParameter('sourceId', i, null) as string | undefined,
			identifier: this.getNodeParameter('contactIdentifier', i, null) as string | undefined,
		};

		// Handle custom headers
		const parCustomAttributes = this.getNodeParameter('customAttributes', i, null) as IDataObject;
		if (parCustomAttributes && parCustomAttributes.attribute) {
			const data: IDataObject = {};

			const atts = parCustomAttributes.attribute as IDataObject[];
			atts.map(property => {
				data[property.key as string] = property.value;
			});

			body.custom_attributes = data;
		}

		let endpoint = apiVersionPrefix + '/accounts/{{accountId}}/contacts/{{contactId}}';
		endpoint = endpoint.replace('{{accountId}}', accountId);
		endpoint = endpoint.replace('{{contactId}}', this.getNodeParameter('contactId', i) as string);

		responseData = await apiRequest.call(this, 'PACTH', endpoint, body, {}, headers);
	}

	if (operation === 'contactCreate') {

		const body: CWModels.ContactUpdateRequest = {
			name: this.getNodeParameter('name', i, null) as string | undefined,
			inbox_id: this.getNodeParameter('inboxId', i, null) as string | undefined,
			phone_number: this.getNodeParameter('phoneNumber', i, null) as string | undefined,
			email: this.getNodeParameter('email', i, null) as string | undefined,
			source_id: this.getNodeParameter('sourceId', i, null) as string | undefined,
			identifier: this.getNodeParameter('contactIdentifier', i, null) as string | undefined,
		};

		// Handle custom headers
		const parCustomAttributes = this.getNodeParameter('customAttributes', i, null) as IDataObject;
		if (parCustomAttributes && parCustomAttributes.attribute) {
			const data: IDataObject = {};

			const atts = parCustomAttributes.attribute as IDataObject[];
			atts.map(property => {
				data[property.key as string] = property.value;
			});

			body.custom_attributes = data;
		}

		let endpoint = apiVersionPrefix + '/accounts/{{accountId}}/contacts';
		endpoint = endpoint.replace('{{accountId}}', accountId);
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}

	return responseData;
}
