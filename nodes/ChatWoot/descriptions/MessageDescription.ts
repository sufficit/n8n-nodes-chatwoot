import {
	INodeProperties,
} from 'n8n-workflow';

export const messageDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['message'],
			},
		},
		options: [
			{
				name: 'Send Message',
				value: 'messageSend',
				description: 'Send a message in a conversation',
				action: 'Send message',
			},
			{
				name: 'List Messages',
				value: 'messageList',
				description: 'List all messages in a conversation',
				action: 'List messages',
			},
			{
				name: 'Delete Message',
				value: 'messageDelete',
				description: 'Delete a message',
				action: 'Delete message',
			},
		],
		default: 'messageSend',
	},
	// Conversation ID field (required for all operations)
	{
		displayName: 'Conversation ID',
		name: 'conversationId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageSend', 'messageList', 'messageDelete'],
			},
		},
		default: '',
		description: 'The ID of the conversation',
	},
	// Send Message fields
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageSend'],
			},
		},
		typeOptions: {
			rows: 4,
		},
		default: '',
		description: 'The message content to send',
	},
	{
		displayName: 'Message Type',
		name: 'message_type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageSend'],
			},
		},
		options: [
			{
				name: 'Outgoing',
				value: 'outgoing',
			},
			{
				name: 'Incoming',
				value: 'incoming',
			},
		],
		default: 'outgoing',
		description: 'Type of message',
	},
	{
		displayName: 'Private',
		name: 'private',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageSend'],
			},
		},
		default: false,
		description: 'Whether the message is a private note (only visible to agents)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageSend'],
			},
		},
		options: [
			{
				displayName: 'Echo ID',
				name: 'echo_id',
				type: 'string',
				default: '',
				description: 'Temporary ID for the message (useful for tracking)',
			},
			{
				displayName: 'Content Attributes',
				name: 'content_attributes',
				type: 'json',
				default: '{}',
				description: 'Additional attributes for the message in JSON format',
			},
		],
	},
	// Delete Message field
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['messageDelete'],
			},
		},
		default: '',
		description: 'The ID of the message to delete',
	},
];
