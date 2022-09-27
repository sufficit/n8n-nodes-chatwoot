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
				value: 'message',
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
		displayName: 'Contact Identifier',
		name: 'contactIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['messages', 'contact'],
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['messages'],
			},
		},
		required: true,
		default: '',
	},

	// Contact Create
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['contactCreate'],
			},
		},
		required: true,
		default: '',
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['contactCreate'],
			},
		},
		default: '',
	},
	{
		displayName: 'E-Mail',
		name: 'email',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['contactCreate'],
			},
		},
		placeholder: 'email@domain.com',
		default: '',
	},
	{
		displayName: 'Identifier',
		name: 'identifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['contactCreate'],
			},
		},
		default: '',
		description: '(Optional) External API Contact identifier, *URL Escaped - valid query parameter',
	},
	{
		displayName: 'Custom Attributes',
		name: 'customAttributes',
		placeholder: 'Add Attributes',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['public'],
				operation: ['contactCreate'],
			},
		},
		default: {},
		options: [
			{
				name: 'attribute',
				displayName: 'Attributes',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						description: 'Key of the attribute',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to set for the attribute',
					},
				],
			},
		],
	},
];
