import {
	OptionsWithUri,
} from 'request';

import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IN8nHttpResponse,
	NodeApiError,
} from 'n8n-workflow';

import type { CWModels } from './models';

// used from webhook authorization, avoid bots
import { Response } from 'express';

class RequestError extends Error {
	constructor(public options: OptionsWithUri, status: number, message: string) {
		super(message);
	}
}

export async function apiRequest(this: IExecuteFunctions, method: IHttpRequestMethods, endpoint: string, body: any = {}, qs: IDataObject = {}, headers: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any
	let baseUrl = this.getNodeParameter('baseUrl', 0, '') as string;
	if (!baseUrl) {
			const credentials = await this.getCredentials('chatWootTokenApi') as CWModels.Credentials;
			baseUrl = baseUrl || credentials.baseUrl;
	}

	const endpointUri: string = baseUrl + endpoint;

	const options: IHttpRequestOptions = {
		headers: {
			Accept: 'application/json',
		},
		method,
		qs,
		url: endpointUri,
		json: true,
	};

	if (Object.keys(headers).length !== 0) {
		options.headers = Object.assign({}, options.headers, headers);
	}

	if (Object.keys(body).length !== 0) {
		options.body = body;
	}

	qs = qs || {};
	if (options.qs && Object.keys(options.qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.httpRequest(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export function authorizationError(resp: Response, realm: string, responseCode: number, message?: string) {
	if (message === undefined) {
		message = 'Authorization problem!';
		if (responseCode === 401) {
			message = 'Authorization is required!';
		} else if (responseCode === 403) {
			message = 'Authorization data is wrong!';
		}
	}

	resp.writeHead(responseCode, { 'WWW-Authenticate': `Basic realm="${realm}"` });
	resp.end(message);
	return {
		noWebhookResponse: true,
	};
}

export function requestAccountOptions(credentials: CWModels.Credentials){
	let baseUrl = credentials.baseUrl;
	if (baseUrl.endsWith("/")){
		baseUrl = baseUrl.slice(0, -1);
	}

	const options: OptionsWithUri = {
		headers: {
			'api_access_token': `${credentials.accessToken}`,
		},
		method: 'GET',
		uri: `${baseUrl}/api/v1/accounts/${credentials.accountId}`,
		json: true,
	};
	return options;
}
