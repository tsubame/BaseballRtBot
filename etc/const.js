/**
 * app_configから定数を取得して設定
 */
var app_config = require('./app_config');


/**
 * 開発中は1
 * リリース時は0
 */
var DEV_LEVEL = 0; //1;

/**
 * TLから1度に取得するツイートの数
 */
var TL_GET_COUNT_ONCE = 200;

exports.TL_GET_COUNT_ONCE = TL_GET_COUNT_ONCE;

/**
 * この数以上のRT数でリツイート
 */
var BASE_RT_COUNT = 50;//100;

exports.BASE_RT_COUNT = BASE_RT_COUNT;

/**
 * トップページのアドレス
 */
//exports.APP_URL = 'http://kuroneko.info:3000/';
exports.APP_URL = app_config.app_url;

/**
 * OAuthコールバックのURL
 */
var OAUTH_CALLBACK_URL  = 'http://127.0.0.1:3000/auth/tweet/callback';

exports.OAUTH_CALLBACK_URL = OAUTH_CALLBACK_URL;

/**
 * メールアカウント
 */
exports.MAIL = app_config.mail;

/**
 * 待受ポート番号
 */
exports.PORT = app_config.port;

/**
 * DBパラメータ
 */
exports.DB_PARAMS = app_config.db_params;

/**
 * アカウント
 *
 * WATCH_TL: TL監視用に使用
 * TWEET: つぶやき用に使用
 */
var ACCOUNT = {
	WATCH_TL: {},
	TWEET: {}
}


/**
 * 開発時と稼動時でアカウント切り替え
 *
 */
if (DEV_LEVEL == 1) {
	ACCOUNT.WATCH_TL = app_config.twitter.WATCH_TL;
	ACCOUNT.TWEET    = app_config.twitter.WATCH_TL;

} else {
	ACCOUNT.WATCH_TL = app_config.twitter.WATCH_TL;
	ACCOUNT.TWEET    = app_config.twitter.TWEET;

}

exports.ACCOUNT = ACCOUNT;


