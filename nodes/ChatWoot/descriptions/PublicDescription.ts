import { INodeProperties } from 'n8n-workflow';

export const publicDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['public'],
			},
		},
		options: [
			{
				name: 'Create Contact',
				value: 'contactCreate',
				action: 'Create contact a public',
			},
			{
				name: 'Create Conversation',
				value: 'conversation',
				action: 'Create conversation a public',
			},
			{
				name: 'Create Message',
				value: 'messageCreate',
				action: 'Create message a public',
			},
			{
				name: 'Get All Conversation',
				value: 'conversations',
				action: 'Get all conversation a public',
			},
			{
				name: 'Get All Messages',
				value: 'messages',
				action: 'Get all messages a public',
			},
			{
				name: 'Get Contact Details',
				value: 'contact',
				action: 'Get contact details a public',
			},
		],
		default: 'messages',
	},
	{
		displayName: 'Inbox Identifier',
		name: 'inboxIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Source ID',
		name: 'sourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['messageCreate', 'messages', 'contact', 'contactCreate'],
			},
		},
		default: '',
		description: 'Internal Source Contact Identifier, used for search, URL escaped or HEX',
	},
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['messageCreate', 'messages'],
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['messageCreate'],
			},
		},
		default: '',
		description: 'Text Message Content',
	},
];
