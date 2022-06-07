/**
 * NiteClipboard
 * v1.0.0 2022/06/07
 * https://github.com/nite1984/nite-clipboard
 * 
 * Released under the MIT License
 */
const NiteClipboard = (function () {
    'use strict';

    const Constructor = function (options) {

        const defaults = {
            fallbackContainerSelector: 'body',
            successCopyCallback: null,
            failedCopyCallback: null,
            logToConsole: false,
        };

        const settings = Object.assign({}, defaults, options);

        const fallbackContainerEl = document.querySelector(settings.fallbackContainerSelector);

        if (!fallbackContainerEl) {
            throw new Error('Invalid fallback container element');
        }

        if (
            (settings.successCopyCallback !== null && typeof settings.successCopyCallback !== 'function') ||
            (settings.failedCopyCallback !== null && typeof settings.failedCopyCallback !== 'function')
        ) {
            throw new Error('Invalid args');
        }

        /**/
        const copyToClipboard = function (text) {

            if (!navigator.clipboard) {
                fallbackCopyToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function () {
                if (settings.logToConsole) {
                    console.log('Clipboard copy successful - navigator');
                }
                if (settings.successCopyCallback != null) {
                    settings.successCopyCallback();
                }
            }, function (err) {
                if (settings.logToConsole) {
                    console.log('Clipboard copy failed - navigator - ' + err);
                }
                if (settings.failedCopyCallback != null) {
                    settings.failedCopyCallback();
                }
            });
        }

        /**/
        const fallbackCopyToClipboard = function (text) {

            const textArea = document.createElement('textarea');
            textArea.value = text;

            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';

            fallbackContainerEl.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                let result = document.execCommand('copy');

                if (settings.logToConsole) {
                    let msg = result ? 'successful' : 'unsuccessful';
                    console.log('Clipboard copy ' + msg + ' - fallback');
                }

                if (result) {
                    if (settings.successCopyCallback != null) {
                        settings.successCopyCallback();
                    }
                } else {
                    if (settings.failedCopyCallback != null) {
                        settings.failedCopyCallback();
                    }
                }
            } catch (err) {
                if (settings.logToConsole) {
                    console.log('Clipboard copy failed - fallback - ' + err);
                }
                if (settings.failedCopyCallback != null) {
                    settings.failedCopyCallback();
                }
            }

            fallbackContainerEl.removeChild(textArea);
        }

        /**
         * PUBLIC INTERFACE
         */
        const publicAPIs = {};

        /**/
        publicAPIs.copyToClipboard = function (text) {

            return copyToClipboard(text);
        }

        return publicAPIs;

    };

    return Constructor;
})();

module.exports = NiteClipboard;