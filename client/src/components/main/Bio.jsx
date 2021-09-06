import { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { connect } from 'react-redux';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';

import RenderButtons, { toggleMark } from '../slate/components/RenderButtons';
import { Element, Leaf } from '../slate/utils/Renderers';
import { initialValue } from '../slate/utils/value';

import { saveBlogData } from '../../redux/actions/otherActions';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+q': 'strikethrough',
  'mod+u': 'underline'
};

const Bio = props => {
  const [value, setValue] = useState(props.blog && props.blog.bio ? JSON.parse(props.blog.bio) : initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [readonly, setReadonly] = useState(true);

  function honKeyDown(e) {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, e)) {
        e.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  }

  function saveBio() {
    props.saveBlogData({
      id: props.blog.id,
      bio: JSON.stringify(value)
    })
  }

  function saveBioAndClose() {
    saveBio();
    cancelBio();
  }

  function cancelBio() {
    setReadonly(true);
  }

  function setEditable() {
    if (props.admin) setReadonly(false);
  }

  const editorFieldStyle = {
    backgroundColor: 'black',
  };

  return (
    <Wrapper>
      <Slate editor={editor} value={value} onChange={v => setValue(v)}>
        {!readonly && <RenderButtons visible />}
        <Editable
          style={editorFieldStyle}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Sup, sucka..."
          readOnly={readonly}
          onKeyDown={honKeyDown}
          onDoubleClick={setEditable}
        />
      </Slate>

      {!readonly && (
        <Buttons>
          <button onClick={saveBio}>Save</button>
          <button onClick={saveBioAndClose}>Save &amp; Close</button>
          <button onClick={cancelBio}>Cancel</button>
        </Buttons>
      )}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    blog: state.blog
  }
}

const mapDispatchToState = { saveBlogData };

export default connect(mapPropsToState, mapDispatchToState)(Bio);

const Wrapper = styled.section`
  width: 700px;
  margin: 12px auto;
  padding: 20px 0;
  border-bottom: 2px solid ${props => props.theme.mainRed};
  color: #aaa;

  p {
    font-size: 16px;
    padding: 8px 0;
    line-height: 1.3;
    text-indent: 0;
  }
`;

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
