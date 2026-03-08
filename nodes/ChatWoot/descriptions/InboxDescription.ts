import {
	INodeProperties,
} from 'n8n-workflow';

export const inboxDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['inbox'],
			},
		},
		options: [
			{
				name: 'List Inboxes',
				value: 'inboxList',
				description: 'List all inboxes',
				action: 'List inboxes',
			},
			{
				name: 'Get Inbox',
				value: 'inboxGet',
				description: 'Get inbox details',
				action: 'Get inbox',
			},
			{
				name: 'Get Inbox Agents',
				value: 'inboxGetAgents',
				description: 'Get list of agents in an inbox',
				action: 'Get inbox agents',
			},
		],
		default: 'inboxList',
	},
	{
		displayName: 'Inbox ID',
		name: 'inboxId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['inbox'],
				operation: ['inboxGet', 'inboxGetAgents'],
			},
		},
		default: '',
		description: 'The ID of the inbox',
	},
];
