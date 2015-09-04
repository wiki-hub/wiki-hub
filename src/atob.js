/* see  http://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings */

export default function atob(str) {
  str = str.replace(/\s/g, '');
  str = window ? window.atob(str) : nodeAtob(str);
  return decodeURIComponent(escape(str));
}

function nodeAtob(str) {
  return new Buffer(str, 'base64').toString('binary');
}
