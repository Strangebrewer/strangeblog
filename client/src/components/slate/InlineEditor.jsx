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

const DisplayEditor = props => {
  const [value, setValue] = useState(props.post.body ? JSON.parse(props.post.body) : initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [readOnly, setReadOnly] = useState(true);

  function honKeyDown(e) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, e)) {
        e.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  }

  function toggleEditable() {
    if (props.isAdmin) {
      setReadOnly(false);
    }
  }

  async function save() {
    const update = { body: JSON.stringify(value) };
    if (props.post && props.post.id) update.id = props.post.id;
    props.save(update);
  }

  async function saveAndClose() {
    save();
    setReadOnly(true);
  }

  function cancel() {
    setValue(props.post.body ? JSON.parse(props.post.body) : initialValue);
    setReadOnly(true);
  }

  const editorStyles = {
    fontSize: '1.2rem'
  }

  return (
    <div>
      <Slate editor={editor} value={value} onChange={v => setValue(v)}>
        {!readOnly && <RenderButtons visible />}
        <Editable
          style={editorStyles}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          readOnly={readOnly}
          onKeyDown={honKeyDown}
          onDoubleClick={toggleEditable}
        />
      </Slate>

      {!readOnly && (
        <Buttons>
          <button onClick={save}>Save</button>
          {!props.new && <button onClick={saveAndClose}>Save &amp; Close</button>}
          <button onClick={cancel}>Cancel</button>
        </Buttons>
      )}
    </div>
  )
}

export default DisplayEditor;

const Buttons = styled.div`
  margin-left: 16px;
  margin-top: 16px;

  > button {
    background: #222;
    border: 1px solid ${props => props.theme.nBlue};
    border-radius: 5px;
    box-shadow: 4px 4px 4px ${props => props.theme.nBlue}77;
    color: ${props => props.theme.nBlue};
    cursor: pointer;
    font-weight: bold;
    margin-right: 16px;
    outline: transparent;
    padding: 6px 12px;
  }

  > button:nth-child(2) {
    border: 1px solid ${props => props.theme.nGreen};
    box-shadow: 4px 4px 4px ${props => props.theme.nGreen}77;
    color: ${props => props.theme.nGreen};
  }

  > button:last-of-type {
    border: 1px solid ${props => props.theme.nRed};
    box-shadow: 4px 4px 4px ${props => props.theme.nRed}77;
    color: ${props => props.theme.nRed};
    margin-right: 0;
  }
`;
