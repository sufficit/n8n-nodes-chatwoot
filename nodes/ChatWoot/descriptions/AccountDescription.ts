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
				value: 'information',
				description: 'Get details about an account',
			},
		],
		default: 'information',
	},
	{
		displayName: 'Account Id',
		name: 'accountId',
		type: 'string',
		displayOptions: {
			show: {
				resource: [
					'account',
				],
				operation: [
					'information',
				],
			},
		},
		default: '',
		description: '(Optional) Get account details',
	}
];