const sgMail = require('@sendgrid/mail');

const sendEmail = params => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = params;

	/*
  params is an object containing the mail keys:
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  */

	return sgMail.send(msg).then(
		() => {
			console.log('EMAIL SENT:');
		},
		error => {
			console.error(error);

			if (error.response) {
				console.error(error.response.body);
			}
		}
	);
};

module.exports = sendEmail;
