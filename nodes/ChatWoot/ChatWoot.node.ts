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
	agentDescription,
	contactDescription,
	conversationDescription,
	inboxDescription,
	labelDescription,
	messageDescription,
	publicDescription,
	teamDescription,
} from './descriptions';
import {
	resourceAccount,
	resourceAgent,
	resourceContact,
	resourceConversation,
	resourceInbox,
	resourceLabel,
	resourceMessage,
	resourcePublic,
	resourceTeam,
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
						name: 'Agent',
						value: 'agent',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Conversation',
						value: 'conversation',
					},
					{
						name: 'Inbox',
						value: 'inbox',
					},
					{
						name: 'Label',
						value: 'label',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Public',
						value: 'public',
					},
					{
						name: 'Team',
						value: 'team',
					},
				],
				default: 'conversation',
				required: true,
			},
			{
				displayName: 'Account ID Override',
				name: 'accountId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account', 'agent', 'contact', 'conversation', 'inbox', 'label', 'message', 'team'],
					},
				},
				default: '',
				description: 'Optional: Override the Account ID from credentials for this specific operation',
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
			...agentDescription,
			...contactDescription,
			...conversationDescription,
			...inboxDescription,
			...labelDescription,
			...messageDescription,
			...publicDescription,
			...teamDescription,
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
				else if (resource === 'agent') {
					responseData = await resourceAgent.call(this, operation, items, i);
				}
				else if (resource === 'contact') {
					responseData = await resourceContact.call(this, operation, items, i);
				}
				else if (resource === 'conversation') {
					responseData = await resourceConversation.call(this, operation, items, i);
				}
				else if (resource === 'inbox') {
					responseData = await resourceInbox.call(this, operation, items, i);
				}
				else if (resource === 'label') {
					responseData = await resourceLabel.call(this, operation, items, i);
				}
				else if (resource === 'message') {
					responseData = await resourceMessage.call(this, operation, items, i);
				}
				else if (resource === 'public') {
					responseData = await resourcePublic.call(this, operation, items, i);
				}
				else if (resource === 'team') {
					responseData = await resourceTeam.call(this, operation, items, i);
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
