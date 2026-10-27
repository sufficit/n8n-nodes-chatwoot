import {
	INodeProperties,
} from 'n8n-workflow';

export const agentDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['agent'],
			},
		},
		options: [
			{
				name: 'List Agents',
				value: 'agentList',
				description: 'List all agents',
				action: 'List agents',
			},
			{
				name: 'Get Agent',
				value: 'agentGet',
				description: 'Get agent details',
				action: 'Get agent',
			},
			{
				name: 'Update Availability',
				value: 'agentUpdateAvailability',
				description: 'Update agent availability status',
				action: 'Update agent availability',
			},
		],
		default: 'agentList',
	},
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['agentGet', 'agentUpdateAvailability'],
			},
		},
		default: '',
		description: 'The ID of the agent',
	},
	{
		displayName: 'Availability',
		name: 'availability',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['agentUpdateAvailability'],
			},
		},
		options: [
			{
				name: 'Online',
				value: 'online',
			},
			{
				name: 'Offline',
				value: 'offline',
			},
			{
				name: 'Busy',
				value: 'busy',
			},
		],
		default: 'online',
		description: 'Availability status for the agent',
	},
];
