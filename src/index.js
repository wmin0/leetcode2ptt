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
      content = `\u0015[${colorMap[key]}m${content}\u0015[m`;
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
  let selector = '.ReactCodeMirror .CodeMirror-lines .CodeMirror-line';
  let nodes = Array.from(document.querySelectorAll(selector));
  return nodes.map(extractText).join('\n');
}


let initInterval = setInterval(() => {
  let btnBar = document.querySelector('.control-btn-bar > div');
  if (!btnBar) {
    return;
  }

  clearInterval(initInterval)

  let wrapper = document.createElement('wrapper');
  wrapper.innerHTML = [
    `<span`,
      ` id="btn-2ptt"`,
      ` class="editor-popover"`,
      ` data-toggle="popover"`,
      ` data-trigger="hover"`,
      ` data-placement="top"`,
      ` data-content="Copy code"`,
      ` data-container=""`,
      ` aria-hidden="true"`,
      ` style="cursor: pointer;"`,
      ` data-original-title=""`,
      ` title=""`,
    `>`,
      `<button class="editor-btn code-btn btn btn-default">`,
        `<i class="fa fa-clipboard"></i>`,
      `</button>`,
    `</span>`,
  ].join('');

  let btn = wrapper.firstElementChild;

  let hiddenEl = btnBar.querySelector('.editor-toolbar > .hidden-xs');
  hiddenEl.insertAdjacentElement('afterend', btn)

  btn.addEventListener('click', () => {
    btn.dataset.clipboardText = extract();
  });

  let clipboard = new Clipboard('#btn-2ptt');
}, 1000)

})()
