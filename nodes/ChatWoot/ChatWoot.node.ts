/* eslint-disable n8n-nodes-base/node-filename-against-convention */
import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	IDataObject,
	IExecuteFunctions,
	INodeCredentialTestResult,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';
import {
	accountDescription,
	contactDescription,
	publicDescription
} from './descriptions';
import {
	resourceAccount,
	resourceContact,
	resourcePublic
} from './methods';
import { requestAccountOptions } from './GenericFunctions';
import { CWModels } from './models';

export class ChatWoot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ChatWoot',
		name: 'chatwoot',
		icon: 'file:chatwoot.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume ChatWoot API',
		defaults: {
			name: 'ChatWoot',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'chatWootTokenApi',
				testedBy: 'chatWootTokenTest',
				required: true,
				displayOptions: {
					show: {
						authentication: [
							'predefinedCredentialType',
						],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				noDataExpression: true,
				type: 'options',
				required: true,
				options: [
					{
						name: 'Parameters',
						value: 'parametersCredentialType',
					},
					{
						name: 'Predefined Chatwoot Credentials',
						value: 'predefinedCredentialType',
						description: 'BaseUrl + Token',
					},
				],
				default: 'parametersCredentialType',
			},
			{
				displayName: 'BaseUrl',
				name: 'baseUrl',
				type: 'string',
				default: '',
				required: true,
				description: 'Base URL',
				placeholder: 'https://chatwoot.org',
				displayOptions: {
					show: {
						authentication: [
							'parametersCredentialType',
						],
					},
				},
			},
			{
				displayName: 'Access Token',
				name: 'accessToken',
				type: 'string',
				default: '',
				required: true,
				description: 'Token of chatwoot, override credentials',
				placeholder: '00000000-0000-0000-0000-000000000000',
				displayOptions: {
					show: {
						authentication: [
							'parametersCredentialType',
						],
						resource: ['account','contact'],
					},
				},
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Public',
						value: 'public',
					},
				],
				default: 'public',
				required: true,
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account', 'contact'],
						operation: ['accountInformation','contactDetails','contactSearch','contactUpdate','contactCreate'],
					},
				},
				default: '',
				description: '(Optional) Account ID reference, this settings will override credentials',
			},
			{
				displayName: 'Source ID',
				name: 'sourceId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['public','contact'],
						operation: ['messageCreate','messages','contact','contactCreate','contactUpdate','publicContactCreate'],
					},
				},
				default: '',
				description: 'Internal Source Contact Identifier, used for search, URL escaped or HEX',
			},
			...accountDescription,
			...contactDescription,
			...publicDescription,
		],
	};

	methods = {
		credentialTest: {
			async chatWootTokenTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				const credentials = credential.data as CWModels.Credentials;
				const options = requestAccountOptions(credentials);
				try {
					await this.helpers.request(options);
					return {
						status: 'OK',
						message: 'Authentication successful',
					};
				} catch (error) {
					return {
						status: 'Error',
						message: error.message,
					};
				}
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][] | null> {
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0) as CWModels.Resource;
		const operation = this.getNodeParameter('operation', 0) as string;
		const returnData: IDataObject[] = [];

		for (let i = 0; i < items.length; i++) {
			let responseData;
			try {
				if (resource === 'account') {
					responseData = await resourceAccount.call(this, operation, items, i);
				}
				else if (resource === 'contact') {
					responseData = await resourceContact.call(this, operation, items, i);
				}
				else if (resource === 'public') {
					responseData = await resourcePublic.call(this, operation, items, i);
				}

				if (Array.isArray(responseData)) {
					returnData.push.apply(returnData, responseData as IDataObject[]);
				} else if (responseData !== undefined) {
					returnData.push(responseData as IDataObject);
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ error: error.message });
					continue;
				}
				throw error;
			}
		}

		// For all other ones does the output items get replaced
		return [this.helpers.returnJsonArray(returnData)];
	}
}
