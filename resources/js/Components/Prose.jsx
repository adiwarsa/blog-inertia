import { useEffect } from 'react';
import ClipboardJS from 'clipboard';
import hljs from 'highlight.js';

const clipboardIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path> <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path> </svg>`;
const clipboardCopiedIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="check" width="24" height="24" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M5 12l5 5l10 -10"></path> </svg>`;

export default function Prose({ value }) {
    useEffect(() => {
        let codeBlocks = document.querySelectorAll('.prose pre');

        codeBlocks.forEach((element, key) => {
            const wrapper = document.createElement('div');

            [].forEach((value) => {
                wrapper.classList.add(value);
            });

            element.parentNode.insertBefore(wrapper, element);

            wrapper.appendChild(element);

            let copyToClipboardBtn = document.createElement('button');
            copyToClipboardBtn.innerHTML = clipboardIcon;
            copyToClipboardBtn.id = `clipButton-${key}`;

            ['md:block', 'hidden'].forEach((value) => {
                copyToClipboardBtn.classList.add(value);
            });

            copyToClipboardBtn.setAttribute('aria-label', 'Copy to Clipboard');
            copyToClipboardBtn.setAttribute('title', 'Copy to Clipboard');
            copyToClipboardBtn.classList.add('copyBtn');

            wrapper.appendChild(copyToClipboardBtn);

            let copyToClipboard = new ClipboardJS(`#${copyToClipboardBtn.id}`);

            copyToClipboard.on('success', (element) => {
                copyToClipboardBtn.innerHTML = clipboardCopiedIcon;
                element.clearSelection();
                setTimeout(() => {
                    copyToClipboardBtn.innerHTML = clipboardIcon;
                }, 1500);
            });

            let codeElement = element.querySelector('code');

            codeElement.id = `clipText-${key}`;
            copyToClipboardBtn.dataset.clipboardTarget = `#${codeElement.id}`;
        });
    }, []);

    useEffect(() => {
        hljs.highlightAll();
    }, []);
    return (
        <div
            className="prose prose-invert prose-cyan prose-pre:bg-transparent"
            dangerouslySetInnerHTML={{ __html: value }}
        />
    );
}