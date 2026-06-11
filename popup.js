{
    const settingsFormEl = document.getElementById('popup-form');


    // bind event listeners

    const urlParamsChangeHandler = (ev) => {
        if (ev.target) {
            chrome.storage.local.set({
                [ev.target.name]: ev.target.value,
            });
        }
    }

    // a nice trick to register one listener for all radio buttons
    settingsFormEl.addEventListener('change', (ev) => {
        if (ev.target?.matches('input[type="radio"]')) {
            urlParamsChangeHandler(ev);
        }
    })


    // populate initial values from storage

    chrome.storage.local.get({
        'cat-name': 'cat-1',
    }).then((data) => {
        settingsFormEl.querySelector(
            `input[name="cat-name"][value="${data['cat-name']}"]`
        ).checked = true;
    });
}
