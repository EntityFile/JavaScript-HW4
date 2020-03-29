// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumb, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,

function checkLength(value, type, length, errors) {
  if (value.length < length) {
    let li = document.createElement('li');
    li.innerText = type + ' is too short';
    errors.appendChild(li);
  }
}

function checkFormat(value, type, format, errors) {
  if (!value.match(format)) {
    let li = document.createElement('li');
    li.innerText = type + ' format is incorrect';
    errors.appendChild(li);
  }
}

function validateMe(event) {
  event.preventDefault();

  const emailNode = event.target.elements['email'];
  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");

  checkLength(emailNode.value, 'Email', 5, emailErrors);
  checkFormat(emailNode.value, 'Email', /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, emailErrors);

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  const nameNode = event.target.elements['name'];
  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';
  
  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  var whiteSpaces = 0;

  for (let char of nameNode.value) {
    if (char === ' ') {
      whiteSpaces += 1;
    }
  }

  if (!(whiteSpaces === 2 || whiteSpaces === 0)) {
    let li = document.createElement('li');
    li.innerText = 'Name should consist 0 or 2 whitespaces';
    nameErrors.appendChild(li)
  }

  checkLength(nameNode.value, 'Name', 1, nameErrors);

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }

  const phoneNode = event.target.elements['phone'];
  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");

  checkLength(phoneNode.value, 'Phone number', 12, phoneErrors);
  checkFormat(phoneNode.value, 'Phone number', /^[\+|0]?(380)?[\(]?(\d{2})[\)]?[\ |\-]?(\d{3})[\ |\-]?(\d{2})[\ |\-]?(\d{2})$/, phoneErrors);

  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

  const messageNode = event.target.elements['message'];
  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  checkLength(messageNode.value, 'Message', 10, messageErrors);

  var rudeWords = ['dumb', 'ugly', 'stupid', 'pig', 'ignorant'];

  for (const word of rudeWords) {
    if (messageNode.value.includes(word)) {
      let li = document.createElement('li');
      li.innerText = 'Message should not consist strong language';
      messageErrors.appendChild(li);

      break;
    }
  }

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }

  return false;
}