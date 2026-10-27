import {
	INodeProperties,
} from 'n8n-workflow';

export const labelDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['label'],
			},
		},
		options: [
			{
				name: 'List Labels',
				value: 'labelList',
				description: 'List all labels',
				action: 'List labels',
			},
			{
				name: 'Create Label',
				value: 'labelCreate',
				description: 'Create a new label',
				action: 'Create label',
			},
			{
				name: 'Update Label',
				value: 'labelUpdate',
				description: 'Update a label',
				action: 'Update label',
			},
			{
				name: 'Delete Label',
				value: 'labelDelete',
				description: 'Delete a label',
				action: 'Delete label',
			},
		],
		default: 'labelList',
	},
	{
		displayName: 'Label ID',
		name: 'labelId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['labelUpdate', 'labelDelete'],
			},
		},
		default: '',
		description: 'The ID of the label',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['labelCreate', 'labelUpdate'],
			},
		},
		default: '',
		description: 'The title of the label',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['labelCreate', 'labelUpdate'],
			},
		},
		default: '',
		description: 'Description of the label',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['labelCreate', 'labelUpdate'],
			},
		},
		default: '#1f93ff',
		description: 'Color for the label',
	},
	{
		displayName: 'Show on Sidebar',
		name: 'show_on_sidebar',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['labelCreate', 'labelUpdate'],
			},
		},
		default: true,
		description: 'Whether to show the label on the sidebar',
	},
];
