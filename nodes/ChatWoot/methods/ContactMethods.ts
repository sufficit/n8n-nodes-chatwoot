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

		let endpoint = apiVersionPrefix + '/accounts/:account_id/contacts/:contact_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':contact_id', this.getNodeParameter('contactId', i) as string);

		responseData = await apiRequest.call(this, 'PUT', endpoint, body, {}, headers);
	}
	else if (operation === 'contactCreate') {

		const body: CWModels.ContactUpdateRequest = {};

		const parName = this.getNodeParameter('name', i, null) as string | undefined;
		if (parName){ body.name = parName; }

		const parInboxId = this.getNodeParameter('inboxId', i, null) as string | undefined;
		if (parInboxId){ body.inbox_id = parInboxId; }

		const parPhoneNumber = this.getNodeParameter('phoneNumber', i, null) as string | undefined;
		if (parPhoneNumber){ body.phone_number = parPhoneNumber; }

		const parEmail = this.getNodeParameter('email', i, null) as string | undefined;
		if (parEmail){ body.email = parEmail; }

		const parSourceId = this.getNodeParameter('sourceId', i, null) as string | undefined;
		if (parSourceId){ body.source_id = parSourceId; }

		const parIdentifier = this.getNodeParameter('contactIdentifier', i, null) as string | undefined;
		if (parIdentifier){ body.identifier = parIdentifier; }

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

		let endpoint = apiVersionPrefix + '/accounts/:account_id/contacts';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'POST', endpoint, body, {}, headers);
	}
	else if (operation === 'contactSearch') {

		const query: IDataObject = {};
		query["q"] = this.getNodeParameter('contactSearchQuery', i) as string;

		let endpoint = apiVersionPrefix + '/accounts/:account_id/contacts/search';
		endpoint = endpoint.replace(':account_id', accountId);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, query, headers);
	}
	else if (operation === 'contactDetails') {

		let endpoint = apiVersionPrefix + '/accounts/:account_id/contacts/:contact_id';
		endpoint = endpoint.replace(':account_id', accountId);
		endpoint = endpoint.replace(':contact_id', this.getNodeParameter('contactId', i) as string);
		responseData = await apiRequest.call(this, 'GET', endpoint, {}, {}, headers);
	}

	return responseData;
}
