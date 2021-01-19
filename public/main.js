const socket = io();

socket.on('messages', function(data) {
  render(data);
})

function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
			  <input type="text" id="buttton${index}" placeholder="Contraseña">
			  <input type="button" value="Desencriptar" onclick="dec('${elem.text}', 'buttton${index}');">
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: crypt(document.getElementById('text').value, document.getElementById('password').value)
  };

  socket.emit('new-message', message);
  return false;
}

function crypt(text, password) {
	const crypt = CryptoJS.AES.encrypt(text, password).toString();
	return crypt;
}

function dec(text, e) {
	const res = decrypt(text, document.getElementById(e).value);
	alert(res);
}

function decrypt(text, password) {
	const decrypt = CryptoJS.AES.decrypt(text, password);
	return decrypt.toString(CryptoJS.enc.Utf8);
}