import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';
import { ButtonContainer, MainButton } from '../../styles/components';

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
  const [value, setValue] = useState(props.post && props.post.body ? JSON.parse(props.post.body) : initialValue);
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

  function save(saveAndClose) {
    return props.save(JSON.stringify(value), saveAndClose);
  }

  function cancel() {
    props.cancel();
  }

  async function saveAndClose() {
    await save(true);
    cancel();
  }

  const editorFieldStyle = {
    backgroundColor: 'white',
    boxShadow: '4px 4px 8px #222',
    padding: '80px 120px',
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
        <ButtonContainer>
          <MainButton color="nGreen" onClick={() => save()}>Save</MainButton>
          <MainButton color="nBlue" onClick={saveAndClose}>Save &amp; Close</MainButton>
          <MainButton color="nRed" onClick={cancel}>Cancel</MainButton>
        </ButtonContainer>
      )}
    </EditorWrapper>
  )
}

export default PostEditor;

const EditorWrapper = styled.div`
  margin: auto;
  padding-top: 40px;
  width: 900px;
`;
