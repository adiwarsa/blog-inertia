import MDEditor, { codeEdit, codePreview, commands } from '@uiw/react-md-editor';
import React from 'react';

export default function Editor({ value, onChange }) {
    return (
        <div>
            <MDEditor
                data-color-mode="dark"
                highlightEnable
                tabSize={4}
                preview="edit"
                extraCommands={[codeEdit, codePreview, commands.fullscreen]}
                visibleDragbar={false}
                height={500}
                className={
                    'max-w-none !overflow-hidden !rounded-lg border !border-gray-800 !shadow-sm [&>.w-md-editor-toolbar>ul>li>button>svg]:!h-3.5 [&>.w-md-editor-toolbar>ul>li>button>svg]:!w-3.5 [&>.w-md-editor-toolbar]:!h-12 [&>.w-md-editor-toolbar]:!px-2'
                }
                value={value}
                onChange={onChange}
            />
        </div>
    );
}