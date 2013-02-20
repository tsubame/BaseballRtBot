/**
 * 開発中は1
 * リリース時は0
 */
var DEV_LEVEL = 1; //1;

/**
 * TLから1度に取得するツイートの数
 */
var TL_GET_COUNT_ONCE = 200;

exports.TL_GET_COUNT_ONCE = TL_GET_COUNT_ONCE;

/**
 * この数以上のRT数でリツイート
 */
var BASE_RT_COUNT = 30;//50;//100;

exports.BASE_RT_COUNT = BASE_RT_COUNT;

/**
 * OAuthコールバックのURL
 */
var OAUTH_CALLBACK_URL  = 'http://127.0.0.1:3010/auth/tweet/callback';

exports.OAUTH_CALLBACK_URL = OAUTH_CALLBACK_URL;

/**
 * DBパラメータ
 */
var DB_PARAMS = {
	host: '127.0.0.1',
	name: 'baseball_rt'
}

exports.DB_PARAMS = DB_PARAMS;


/**
 * アカウント
 *
 * WATCH_TL: TL監視用に使用
 * TWEET: つぶやき用に使用
 */
var ACCOUNT = {

	WATCH_TL: {

	},
	TWEET: {

	},

	baseballs_rt: {
		screen_name: 'base_rt',
		consumer_key: 'NCgYiCvdAwHRT8trFOsSfg',
		consumer_secret: 'McOuVSv6e6Ol4a4mVTvwucc4eCD5V1asFZirS7YBdBY',
		access_token: '1200856406-qj7yiYdTML1h8aQKfDVXwfMyGjp2b6duhswGOcl',
		access_token_secret: 'ozh1I0dBunJef3fXiPlOQTJ8P7KlXINErzIVbr1aVM'
	},
	baseballs_rt2: {
		screen_name: 'baseballs_rt2',
		consumer_key: 'Hn7rJQL1KGwkIBCjAh1eWA',
		consumer_secret: 'Rys4lQFkwrPCdWaaotfY7JwO950IuinmiDbHaFc2KE',
		access_token: '1189473444-lJXf0ogDQ4NaE3HGFxODZVGDU5Wp1sTo4msNZcr',
		access_token_secret: 'EWuP4HVE3uN2M4EDtPIMtmFA32xoWW1p5LVgueFAO8'
	}
}

exports.ACCOUNT = ACCOUNT;


/**
 * 開発時と稼動時でアカウント切り替え
 *
 */
if (DEV_LEVEL == 1) {
	ACCOUNT.WATCH_TL = ACCOUNT.baseballs_rt2;
	ACCOUNT.TWEET    = ACCOUNT.baseballs_rt;
} else {
	ACCOUNT.WATCH_TL = ACCOUNT.baseballs_rt2;
	ACCOUNT.TWEET    = ACCOUNT.baseballs_rt;
}




