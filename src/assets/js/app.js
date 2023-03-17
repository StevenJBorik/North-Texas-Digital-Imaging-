// require(['require', 'name'], function (require) {
//     const express = require('express');
// 	const bodyParser = require('body-parser');
// 	const nodemailer = require('nodemailer');

// 	const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/send-email', (req, res) => {
// 	const { name, email, message, phone, findUs } = req.body;

// 	const transporter = nodemailer.createTransport({
// 		service: 'gmail',
// 		auth: {
// 			user: 'stevenjborik@gmail.com', // replace with your email address
// 			pass: 'Gimetdi27!' // replace with your password
// 		}
// 	});

// 	const mailOptions = {
// 		from: email,
// 		to: 'stevenjborik@gmail.com', // replace with the recipient email address
// 		subject: 'Contact Form Submission',
// 		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message} \nPhone: ${phone} \nFindUs: ${findUs}`
// 	};

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send('An error occurred');
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     })
// })
// });


