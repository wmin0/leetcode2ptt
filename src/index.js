(() => {

const colorMap = {
  'cm-keyword': '1;32',
  'cm-comment': '1;30',
  'cm-string': '1;35',
  'cm-variable-2': '1;33',
  'cm-number': '1;35',
  'cm-def': '1;37',
  'cm-meta': '1;36',
  'cm-type': '1;32'
};

const colorNode = (node, content) => {
  Object.keys(colorMap).some((key) => {
    if (node.classList.contains(key)) {
      content = `\u001b[${colorMap[key]}m${content}\u001b[m`;
      return true;
    }
  });
  return content;
}

const extractText = (node) => {
  if (node.nodeType === 3) {
    let text = node.nodeValue;
    // handle double space
    text = text.replace(/\u0020\u00a0/g, '\u0020\u0020');
    // handle empty line
    text = text.replace(/^\u200b$/, '');
    return text;
  }
  let content = Array.from(node.childNodes).map(extractText).join('');
  return colorNode(node, content);
}

const extract = () => {
  let selector = '#submission-form-app .CodeMirror-lines .CodeMirror-line';
  let nodes = Array.from(document.querySelectorAll(selector));
  return nodes.map(extractText).join('\n');
}

let btnBar = document.querySelector('.control-btn-bar > div');
if (!btnBar) {
  return;
}

let wrapper = document.createElement('wrapper');
wrapper.innerHTML = [
  `<span id="btn-2ptt">`,
    `<span`,
      ` class="code-btn btn btn-default"`,
      ` aria-hidden="true"`,
      ` style="cursor: pointer;"`,
    `>`,
      `<span class="fa fa-clipboard"></span>`,
    `</span>`,
  `</span>`
].join('');

let rightEl = btnBar.querySelector('.pull-right');
btnBar.insertBefore(wrapper, rightEl);

let btn = wrapper.querySelector('#btn-2ptt');
btn.addEventListener('click', () => {
  btn.dataset.clipboardText = extract();
});

let clipboard = new Clipboard('#btn-2ptt');

})()
