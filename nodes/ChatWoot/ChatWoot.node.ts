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
	publicDescription
} from './descriptions';
import {
	resourceAccount,
	resourcePublic
} from './methods';
import { requestAccountOptions } from './GenericFunctions';
import type { CWModels } from './models';

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
			},
		],
		properties: [
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
						name: 'Public',
						value: 'public',
					},
				],
				default: 'account',
				required: true,
			},
			...accountDescription,
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
				else if (resource === 'public') {
					responseData = await resourcePublic.call(this, operation, items, i);
				}
				/*
				else if (resource === 'webhook') {
						responseData = await resourceWebhook.call(this, operation, items, i)
				}
				*/
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