import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';

import RenderButtons, { toggleMark } from './components/RenderButtons';
import { Element, Leaf } from './utils/Renderers';
import { initialValue } from './utils/value';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+q': 'strikethrough',
  'mod+u': 'underline'
};

const PostEditor = props => {
  const [value, setValue] = useState(JSON.parse(props.post.body));
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  function honKeyDown(e) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, e)) {
        e.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  }

  async function save() {
    props.save(JSON.stringify(value));
  }

  function cancel() {
    // props.cancel();
  }

  async function saveAndClose() {
    // save();
    // cancel();
  }

  const editorFieldStyle = {
    backgroundColor: 'white',
    boxShadow: '4px 4px 8px #222',
    padding: '80px 120px',
    width: '900px',
    fontSize: '18px'
  };

  return (
    <EditorWrapper>
      <Slate editor={editor} value={value} onChange={v => setValue(v)}>
        <RenderButtons visible />
        <Editable
          style={editorFieldStyle}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Sup, sucka..."
          autoFocus
          onKeyDown={honKeyDown}
        />
      </Slate>

      {!props.readOnly && (
        <Buttons disabled={!props.canSave}>
          <button disabled={!props.canSave} onClick={save}>Save</button>
          <button disabled={!props.canSave} onClick={saveAndClose}>Save &amp; Close</button>
          <button onClick={cancel}>Cancel</button>
        </Buttons>
      )}
    </EditorWrapper>
  )
}

export default PostEditor;

const EditorWrapper = styled.div`
  margin: auto;
  padding-top: 50px;
  width: 900px;
`;

const Buttons = styled.div`
  margin-left: 16px;
  margin-top: 16px;

  button {
    background: #222;
    border: 1px solid ${props => props.disabled ? '#999' : props.theme.nBlue};
    border-radius: 5px;
    box-shadow: 4px 4px 4px ${props => props.disabled ? '#999' : props.theme.nBlue}77;
    color: ${props => props.disabled ? '#999' : props.theme.nBlue};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    font-weight: bold;
    margin-right: 16px;
    opacity: ${props => props.disabled ? '.6' : '1'};
    outline: transparent;
    padding: 6px 12px;
  }

  button:nth-child(2) {
    border: 1px solid ${props => props.disabled ? '#999' : props.theme.nGreen};
    box-shadow: 4px 4px 4px ${props => props.disabled ? '#999' : props.theme.nGreen}77;
    color: ${props => props.disabled ? '#999' : props.theme.nGreen};
  }

  button:last-of-type {
    border: 1px solid ${props => props.theme.nRed};
    box-shadow: 4px 4px 4px ${props => props.theme.nRed}77;
    color: ${props => props.theme.nRed};
    cursor: pointer;
    margin-right: 0;
    opacity: 1;
  }
`;
