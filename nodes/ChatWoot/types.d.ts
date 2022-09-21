import {
	OptionsWithUri,
} from 'request';

export declare namespace ChatWoot {

	export type Resource = 'account' | 'public';

	export type Credentials = {
		baseUrl: string;
		accessToken: string;
		accountId: string;
	};

	export type ContactGetOrCreateRequest = {
		name: string;
		phone_number: string;
		source_id?: string;
		identifier?: string;
		custom_attributes?: any;
	};
}
