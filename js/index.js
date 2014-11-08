document.addEventListener('DOMContentLoaded', function(e) {
  document.body.classList.remove('lights-off');
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  var copyBtn = document.getElementById('copyBtn');
  var cleanCSS = require('clean-css');
  input.focus();
  input.onkeyup = function() {
    var source = input.innerHTML;
    var minimized = new cleanCSS().minify(source);
    output.innerHTML = minimized;
    minimized = null;
    Prism.highlightAll(true, null);
    if(output.innerHTML.length > 4) {
      copyBtn.removeAttribute('disabled');
      copyBtn.classList.remove('off');
    } else {
      copyBtn.setAttribute('disabled', 'disabled');
      copyBtn.classList.add('off');
    }
  };
  copyBtn.onclick = function(e) {
    output.style.webkitUserSelect = 'initial';
    output.contentEditable = true;
    output.focus();
    document.execCommand('SelectAll');
    document.execCommand("copy");
    output.contentEditable = false;
    output.style.webkitUserSelect = 'none';
    document.body.focus();
    document.body.classList.add('lights-off');
    setTimeout(function(){
      document.body.classList.remove('lights-off');
    }, 1000);
  };
});