# nite-clipboard

# Install

```
npm i @nite1984/nite-clipboard
```

```
import niteClipboard from '@nite1984/nite-clipboard';

window.niteClipboard = niteClipboard;
```

# Example Usage

```
niteClipboard.copyToClipboard('ok');

niteClipboard.copyToClipboard('ok', {
    logToConsole: true
    //see Available options for more
});
```

# Available Options

```
//Default settings
const defaults = {
    fallbackContainerSelector: 'body',
    successCopyCallback: null,
    failedCopyCallback: null,
    logToConsole: false,
};
```

Note: the "fallbackContainerSelector" setting is optional and mostly only needed to handle situations where you want to copy something to the clipboard while a bootstrap modal is opened.

Example
```
niteClipboard.copyToClipboard('ok', {
    fallbackContainerSelector: '#my-bootstrap-modal
});
```