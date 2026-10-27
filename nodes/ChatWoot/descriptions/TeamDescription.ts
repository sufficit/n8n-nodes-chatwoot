import {
	INodeProperties,
} from 'n8n-workflow';

export const teamDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['team'],
			},
		},
		options: [
			{
				name: 'List Teams',
				value: 'teamList',
				description: 'List all teams',
				action: 'List teams',
			},
			{
				name: 'Get Team',
				value: 'teamGet',
				description: 'Get team details',
				action: 'Get team',
			},
			{
				name: 'Get Team Agents',
				value: 'teamGetAgents',
				description: 'Get list of agents in a team',
				action: 'Get team agents',
			},
		],
		default: 'teamList',
	},
	{
		displayName: 'Team ID',
		name: 'teamId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['team'],
				operation: ['teamGet', 'teamGetAgents'],
			},
		},
		default: '',
		description: 'The ID of the team',
	},
];
