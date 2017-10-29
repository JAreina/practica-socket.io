(function (d,io) {
	/* body... */
	'use strict';

	var io = io(),
		chatForm = d.querySelector('#chat-form'),
		messageText = d.querySelector('#message-text'),
		chat = d.querySelector('#chat');

	chatForm.onsubmit = function (e) {
		e.preventDefault();
		io.emit('new message', messageText.value);
		messageText.value = null;//borrar caja de texto
		return false;
	}


	io.on('new user', function (newUser) {
		alert(newUser.message);
	});
// recibe mensaje del servidor
	io.on('user says', function (userSays) {

		chat.insertAdjacentHTML('beforeend', '<li>' + userSays + '</li>');
	});

	io.on('bye bye user', function (byeByeUser) {
		alert(byeByeUser.message);
	});
})(document,io);