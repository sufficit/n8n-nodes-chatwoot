import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ChatWootTokenApi implements ICredentialType {
	name = 'chatWootTokenApi';
	displayName = 'ChatWoot Access Token API';
	documentationUrl = 'https://github.com/sufficit/n8n-nodes-chatwoot/docs/auth';
	properties: INodeProperties[] = [
		{
			displayName: 'ChatWoot API Url',
			name: 'baseUrl',
			placeholder: "https://www.chatwoot.com",
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			placeholder: "00000000-0000-0000-0000-000000000000",
			default: '',
			required: true,
		},
		{
			displayName: 'Account Id',
			name: 'accountId',
			type: 'string',
			placeholder: "1",
			default: '1',
			required: true,
		},
	];
}
