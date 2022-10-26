import {
	INodeProperties,
} from 'n8n-workflow';

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'account',
				],
			},
		},
		options: [
			{
				name: 'Information',
				value: 'accountInformation',
				description: 'Get details about an account',
				action: 'Information about an account',
			},
		],
		default: 'accountInformation',
	},
];
