export type ImportStatus = 'open' | 'in progress' | 'passed' | 'partly passed' | 'failed';
export type Language =
	| 'de'
	| 'en'
	| 'pl'
	| 'ro'
	| 'ru'
	| 'ar'
	| 'cs'
	| 'bg'
	| 'hu'
	| 'sl'
	| 'hr'
	| 'sq'
	| 'tr'
	| 'es'
	| 'it'
	| 'fr';

export interface Employee {
	active: boolean;
	firstName: string;
	language: Language;
	lastName: string;
	custom1?: string;
	custom2?: string;
	custom3?: string;
	email?: string;
	employeeKey?: string;
	firstDay?: string;
	personalData?: {
		shirt: 's' | 'm' | 'l' | 'xl' | 'xxl';
		shoes: '42' | '43' | '44' | '45' | '46';
	};
	personalDataModules?: ['shirt' | 'shoes'];
	phone?: string;
	privacyConfirmed?: boolean;
	thirdFactor?: string;
}
