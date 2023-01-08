chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: '/index.html'
  });
})

chrome.runtime.onInstalled.addListener(function (object) {
  let welcomeURL = chrome.runtime.getURL("onboarding.html");

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: welcomeURL })
  }
});
