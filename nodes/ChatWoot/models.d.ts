export declare namespace CWModels {

	export type Resource = 'account' | 'contact' | 'public';

	export type Credentials = {
		baseUrl: string;
		accessToken: string;
		accountId: string;
	};

	export type ContactUpdateRequest = {
		name?: string;
		inbox_id?: string;
		phone_number?: string;
		email?: string;
		source_id?: string;
		identifier?: string;
		custom_attributes?: any;
	};

	export type ContactGetOrCreateRequest = {
		name: string;
		phone_number?: string;
		email?: string;
		source_id?: string;
		identifier?: string;
		custom_attributes?: any;
	};

	export type CreateMessageRequest = {
		content: string;
		echo_id?: string;
	};
}
