import {
	INodeProperties,
} from 'n8n-workflow';

export const conversationDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
			},
		},
		options: [
			{
				name: 'List Conversations',
				value: 'conversationList',
				description: 'List all conversations with filters',
				action: 'List conversations',
			},
			{
				name: 'Get Conversation',
				value: 'conversationGet',
				description: 'Get a single conversation by ID',
				action: 'Get conversation',
			},
			{
				name: 'Toggle Status',
				value: 'conversationToggleStatus',
				description: 'Update conversation status (open, resolved, pending, snoozed)',
				action: 'Toggle conversation status',
			},
			{
				name: 'Assign',
				value: 'conversationAssign',
				description: 'Assign conversation to agent or team',
				action: 'Assign conversation',
			},
			{
				name: 'Add Labels',
				value: 'conversationAddLabels',
				description: 'Add labels to conversation',
				action: 'Add labels to conversation',
			},
			{
				name: 'Update Priority',
				value: 'conversationUpdatePriority',
				description: 'Update conversation priority',
				action: 'Update conversation priority',
			},
			{
				name: 'Mute/Unmute',
				value: 'conversationMute',
				description: 'Mute or unmute conversation',
				action: 'Mute/unmute conversation',
			},
		],
		default: 'conversationList',
	},
	// Conversation ID field
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationGet', 'conversationToggleStatus', 'conversationAssign', 'conversationAddLabels', 'conversationUpdatePriority', 'conversationMute'],
			},
		},
		default: '',
		description: 'The ID of the conversation',
	},
	// List conversations filters
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationList'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Snoozed',
						value: 'snoozed',
					},
				],
				default: 'open',
				description: 'Filter by conversation status',
			},
			{
				displayName: 'Assignee Type',
				name: 'assignee_type',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Me',
						value: 'me',
					},
					{
						name: 'Unassigned',
						value: 'unassigned',
					},
				],
				default: 'all',
				description: 'Filter by assignee type',
			},
			{
				displayName: 'Inbox ID',
				name: 'inbox_id',
				type: 'number',
				default: '',
				description: 'Filter by inbox ID',
			},
			{
				displayName: 'Team ID',
				name: 'team_id',
				type: 'number',
				default: '',
				description: 'Filter by team ID',
			},
			{
				displayName: 'Labels',
				name: 'labels',
				type: 'string',
				default: '',
				description: 'Filter by labels (comma-separated)',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
		],
	},
	// Toggle Status fields
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationToggleStatus'],
			},
		},
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Resolved',
				value: 'resolved',
			},
			{
				name: 'Pending',
				value: 'pending',
			},
			{
				name: 'Snoozed',
				value: 'snoozed',
			},
		],
		default: 'open',
		description: 'New status for the conversation',
	},
	{
		displayName: 'Snoozed Until',
		name: 'snoozed_until',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationToggleStatus'],
				status: ['snoozed'],
			},
		},
		default: '',
		description: 'Unix timestamp when snooze should expire (optional)',
	},
	// Assign fields
	{
		displayName: 'Assignee Type',
		name: 'assigneeType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationAssign'],
			},
		},
		options: [
			{
				name: 'Agent',
				value: 'agent',
			},
			{
				name: 'Team',
				value: 'team',
			},
			{
				name: 'Unassign',
				value: 'unassign',
			},
		],
		default: 'agent',
		description: 'Type of assignee',
	},
	{
		displayName: 'Assignee ID',
		name: 'assignee_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationAssign'],
				assigneeType: ['agent'],
			},
		},
		default: '',
		description: 'Agent ID to assign',
	},
	{
		displayName: 'Team ID',
		name: 'team_id',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationAssign'],
				assigneeType: ['team'],
			},
		},
		default: '',
		description: 'Team ID to assign',
	},
	// Labels fields
	{
		displayName: 'Labels',
		name: 'labels',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationAddLabels'],
			},
		},
		default: '',
		description: 'Comma-separated list of label names to add',
	},
	// Priority field
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationUpdatePriority'],
			},
		},
		options: [
			{
				name: 'None',
				value: null,
			},
			{
				name: 'Urgent',
				value: 'urgent',
			},
			{
				name: 'High',
				value: 'high',
			},
			{
				name: 'Medium',
				value: 'medium',
			},
			{
				name: 'Low',
				value: 'low',
			},
		],
		default: null,
		description: 'Priority level for the conversation',
	},
	// Mute field
	{
		displayName: 'Muted',
		name: 'muted',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversation'],
				operation: ['conversationMute'],
			},
		},
		default: false,
		description: 'Whether to mute or unmute the conversation',
	},
];
