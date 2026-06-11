
{

  const toggleCursor = () => {
    document.documentElement.classList.toggle('cat-cursor');
  }

  const setCatUrl = (name = 'cat-1') => {

    // same as referencing `__MSG_@@extension_id__` in CSS files
    const extensionId = chrome.i18n.getMessage('@@extension_id');

    // use fallback URLs, for chromium / gecko based browsers
    const cursorUrls =
        ['chrome-extension', 'moz-extension']
            .map(protocol => `url('${protocol}://${extensionId}/images/${name}.png')`)
            .join(', ');

    document.documentElement.style.setProperty('--cursor-urls', cursorUrls);
  }


  // register event listeners

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.command === 'toggle-cursor') {
        toggleCursor();
    }
  });

  chrome.storage.local.onChanged.addListener(async (changes) => {
    const currentData = await chrome.storage.local.get();
    const catNameChange = changes['cat-name'];
    setCatUrl(
        catNameChange ? catNameChange.newValue : currentData['cat-name'],
    );
  });


  // populate initial values from storage

  chrome.storage.local.get({
    'cat-name': 'cat-1',
  }).then((data) => (
    setCatUrl(data['cat-name'])
  ));

}
