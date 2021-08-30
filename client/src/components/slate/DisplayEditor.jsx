import React, { useCallback, useMemo, useState } from 'react';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';

import { Element, Leaf } from './utils/Renderers';
import { initialValue } from './utils/value';

const DisplayEditor = props => {
  const [value, setValue] = useState(props.text ? JSON.parse(props.text) : initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  )
}

export default DisplayEditor;
