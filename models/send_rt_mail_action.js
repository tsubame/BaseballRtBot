/**
 * sendRtMailActionの処理実行
 *
 *
 */


/**
 * requires.
 *
 */
var nodemailer = require("nodemailer");
var async = require('async');
var retweet_model = require('./retweet_model');
var rt_candidate_model = require('./rt_candidate_model');

/**
 * exports.
 */
exports.exec = exec;

/**
 * メールパラメータ
 *
 * @var String
 */
// 外に出せる定数
var MAIL_SERVICE = 'Gmail';
var MAIL_TO = 'dortmund23andcska18@gmail.com';
var MAIL_FROM = '100RTbot <apricot34@gmail.com>';

/**
 * メールアカウントとパスワード
 *
 * @var String
 */
// 公開するのは危険？ ファイルで外に出しましょう
var MAIL_USER = 'apricot34';
var MAIL_PASS = 'sheisagirl';
//

/**
 * SmtpTransportオブジェクト
 *
 * @var object
 */
var smtpTransport;

/**
 * メールオプション
 *
 * @var object
 */
var mailOptions = {
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: '',
    text: ''
}

/**
 * 処理実行
 *
 * 本日RTしたツイートとRT候補をメールで送信
 *
 */
function exec() {
	init();

	async.series([
		function(callback) {
			sendTodaysRt(callback);
		},
		function(callback) {
			sendTodaysCandidates(callback);
			//callback();
		}
	],
	function(err, results) {
		if(err) {
			throw err;
		} else {
			console.log('mail send finished!');
			close();
		}
	});
}

/**
 * 初期化
 */
function init() {
	smtpTransport = nodemailer.createTransport('SMTP',{
	    service: MAIL_SERVICE,
	    auth: {
	        user: MAIL_USER,
	        pass: MAIL_PASS
	    }
	});
}

/**
 * サーバから切断
 */
function close() {
	smtpTransport.close();
}

/**
 * 本日のRTをメール送信
 */
function sendTodaysRt(callback) {
	// 本日のRTを取得
	retweet_model.getTodaysRetweets(function(results) {
		var full_text = '';
		// 本文作成
		for(var i = 0; i < results.length; i++) {
			var tweet = results[i];
			var text = tweet.user_name + '\n' +
				'RT: ' + tweet.rt_count + '\n' + tweet.text + '\n\n\n';
			full_text += text;
		}

		mailOptions.subject = "本日のRT";
		mailOptions.text = full_text;

		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
			} else {
		        console.log("Message sent: " + response.message);
		    }

		    callback();
		});
	});
}

/**
 * 本日のRT候補をメール送信
 */
function sendTodaysCandidates(callback) {
	// 本日のRT候補を取得
	rt_candidate_model.getTodaysCandidates(function(results) {
		var full_text = '';
		// 本文作成
		for(var i = 0; i < results.length; i++) {
			var tweet = results[i];
			var text = tweet.user_name + '\n' +
					'RT: ' + tweet.rt_count + '\n' + tweet.text + '\n\n\n';
			full_text += text;
		}

		mailOptions.subject = "本日のRT候補";
		mailOptions.text = full_text;

		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
			} else {
		        console.log("Message sent: " + response.message);
		    }

		    //smtpTransport.close();
		    callback();
		});
	});
}

/*
function exec_org() {
	rt_candidate_model.getTodaysCandidates(function(results) {
		var smtpTransport = nodemailer.createTransport("SMTP",{
		    service: "Gmail",
		    auth: {
		        user: "apricot34",
		        pass: "sheisagirl"
		    }
		});

		var full_text = '';

		for(var i = 0; i < results.length; i++) {
			var tweet = results[i];
			var text = tweet.user_name + '\n' +
					'RT: ' + tweet.rt_count + '\n' + tweet.text + '\n' +
					 '\n\n';
			full_text += text;
		}

		var mailOptions = {
		    from: "100RTbot <apricot34@gmail.com>",
		    to: "dortmund23andcska18@gmail.com",
		    subject: "本日のRT候補",
		    text: full_text
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
			} else {
		        console.log("Message sent: " + response.message);
		    }

		    smtpTransport.close();
		});
	});
}
*/