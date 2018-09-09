(() => {

const get = () => {
  let form = document.forms[0];
  return {
    control: atob(form.control.value)
  };
};

const set = (values) => {
  let form = document.forms[0];
  form.control.value = btoa(values.control);
};

const load = () => {
  return (
    new Promise((resolve, reject) => {
      chrome.storage.sync.get({
        control: `\u0015`
      }, resolve);
    })
    .then(set)
  );
};

const save = () => {
  return (
    new Promise((resolve, reject) => {
      chrome.storage.sync.set(get(), resolve);
    })
  );
};

document.addEventListener('DOMContentLoaded', () => {
  let ctl15 = document.querySelector('#ctl-0015');
  ctl15.value = btoa('\u0015');
  let ctl1b = document.querySelector('#ctl-001b');
  ctl1b.value = btoa('\u001b');

  load().then(() => {
    let form = document.forms[0];
    form.addEventListener('change', save);
  });
});

})()
