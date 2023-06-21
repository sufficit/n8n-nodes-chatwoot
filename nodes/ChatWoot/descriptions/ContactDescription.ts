import {
	INodeProperties,
} from 'n8n-workflow';

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Get Contact Details',
				value: 'contactDetails',
				description: 'Retrieve Contact Details',
				action: 'Contact details',
			},
			{
				name: 'Search Contacts',
				value: 'contactSearch',
				description: 'Search Contacts By name|identifier|email|phone_number',
				action: 'Contact search',
			},
			{
				name: 'Update | Put',
				value: 'contactUpdate',
				description: 'Update Contact Details',
				action: 'Contact update',
			},
			{
				name: 'Create',
				value: 'contactCreate',
				description: 'Update Create',
				action: 'Contact create',
			},
		],
		default: 'contactDetails',
	},
	{
		displayName: 'Query',
		name: 'contactSearchQuery',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['contactSearch'],
			},
		},
		default: '',
		description: 'Query text to search',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['contactUpdate','contactDetails'],
			},
		},
		default: '',
		description: 'Get account details',
	},
	{
		displayName: 'Contact Identifier',
		name: 'contactIdentifier',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['contactUpdate','contactCreate'],
			},
		},
		default: '',
		description: '(Optional) External API Contact Identifier',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact', 'public'],
				operation: ['contactUpdate','contactCreate','publicContactCreate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Inbox ID',
		name: 'inboxId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact', 'public'],
				operation: ['contactUpdate','contactCreate','publicContactCreate'],
			},
		},
		default: '',
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact', 'public'],
				operation: ['contactUpdate','contactCreate','publicContactCreate'],
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
				resource: ['contact', 'public'],
				operation: ['contactUpdate','contactCreate','publicContactCreate'],
			},
		},
		placeholder: 'email@domain.com',
		default: '',
	},{
		displayName: 'Custom Attributes',
		name: 'customAttributes',
		placeholder: 'Add Attributes',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['contact', 'public'],
				operation: ['contactUpdate','contactCreate','publicContactCreate'],
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
