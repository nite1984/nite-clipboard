# nite-clipboard

# Install

```
npm i @nite1984/nite-clipboard
```

```
import NiteClipboard from '@nite1984/nite-clipboard';

window.NiteClipboard = NiteClipboard;
```

# Example Usage

```
const niteClipboard = new NiteClipboard({
    logToConsole: true,
});

niteClipboard.copyToClipboard('ok');
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