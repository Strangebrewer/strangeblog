import { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { connect } from 'react-redux';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';
import { SearchButtons } from '../../styles/components';

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

  async function saveBioAndClose() {
    saveBio();
    setReadonly(true);
  }

  function cancelBio() {
    setValue(props.blog && props.blog.bio ? JSON.parse(props.blog.bio) : initialValue);
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
        <SearchButtons className="search-buttons">
          <button onClick={saveBio}>Save</button>
          <button onClick={saveBioAndClose}>Save &amp; Close</button>
          <button onClick={cancelBio}>Cancel</button>
        </SearchButtons>
      )}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog
  }
}

const mapDispatchToState = { saveBlogData };

export default connect(mapPropsToState, mapDispatchToState)(Bio);

const Wrapper = styled.section`
  border-bottom: 2px solid ${props => props.theme.mainRed};
  border-top: 2px solid ${props => props.theme.mainRed};
  color: #aaa;
  font-weight: 500;
  margin: 24px auto 0 auto;
  padding: 0;
  width: 700px;

  p {
    font-size: 16px;
    padding: 8px 0;
    line-height: 1.3;
    text-indent: 0;
  }

  .search-buttons {
    margin-bottom: 24px;
  }
`;
