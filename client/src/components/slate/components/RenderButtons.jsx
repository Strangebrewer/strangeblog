import {
  Editor,
  Element as SlateElement,
  Transforms
} from 'slate';
import { useSlate } from 'slate-react';
import styled from 'styled-components';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
      split: true
  });

  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  });

  return !!match;
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

const RenderButtons = props => {

  const MarkButton = ({ format, icon, inline }) => {
    const editor = useSlate();
    let color;
    if (format === 'red') color = '#bd0000';
    if (format === 'blue') color = '#1111ff';
    if (format === 'green') color = '#39ff14';
    if (format === 'yellow') color = '#fffb00';
    if (format === 'purple') color = '#660d8a';

    return (
      <EditorBtn
        active={isMarkActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ color }}
        inline={inline}
      >
        <i className={`fas fa-${icon}`} />
      </EditorBtn>
    );
  };

  const BlockButton = ({ format, icon, inline }) => {
    const editor = useSlate();

    let span;
    if (format.includes('one')) span = <span>&nbsp;1</span>;
    if (format.includes('two')) span = <span>&nbsp;2</span>;
    if (format.includes('three')) span = <span>&nbsp;3</span>;  

    return (
      <EditorBtn
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}
        key={`icon-${format}`}
        inline={inline}
      >
        <i className={`fas fa-${icon}`} />
        {span}
      </EditorBtn>
    );
  };

  // const renderLinkButton = (type, icon) => {
  //   let isActive = props.hasLinks();
  //   return (
  //     <EditorBtn
  //       inline={props.inline}
  //       isActive={isActive}
  //       key={`icon-${type}`}
  //       onClick={props.onClickLink}
  //     >
  //       <i className={`fas fa-${icon}`} />
  //     </EditorBtn>
  //   )
  // }

  return (
    <EditorBtnArray inline={props.inline} style={props.style} visible={props.visible}>
      <BlockButton inline={props.inline} format="heading-one" icon="heading" />
      <BlockButton inline={props.inline} format="heading-two" icon="heading" />
      <BlockButton inline={props.inline} format="heading-three" icon="heading" />
      <BlockButton inline={props.inline} format="block-quote" icon="quote-right" />
      <BlockButton inline={props.inline} format="numbered-list" icon="list-ol" />
      <BlockButton inline={props.inline} format="bulleted-list" icon="list-ul" />

      <MarkButton inline={props.inline} format="bold" icon="bold" />
      <MarkButton inline={props.inline} format="italic" icon="italic" />
      <MarkButton inline={props.inline} format="underline" icon="underline" />
      <MarkButton inline={props.inline} format="red" icon="palette" />
      <MarkButton inline={props.inline} format="blue" icon="palette" />
      <MarkButton inline={props.inline} format="yellow" icon="palette" />
      <MarkButton inline={props.inline} format="green" icon="palette" />
      <MarkButton inline={props.inline} format="purple" icon="palette" />
      <MarkButton inline={props.inline} format="strikethrough" icon="strikethrough" />
      <MarkButton inline={props.inline} format="code" icon="code" />

      {/* {renderLinkButton('link', 'link')} */}
    </EditorBtnArray>
  );
}

export default RenderButtons;

const EditorBtnArray = styled.div`
  visibility: ${props => props.visible ? 'visible' : 'hidden' };
  cursor: default;
  margin: 0px 0 0 0;
  opacity:  ${props => props.inline ? '.4' : '1'};
  padding: 10px 0 6px 6px;
  padding-left: ${props => props.inline && '15px'};
  padding-top: ${props => props.inline && '0px'};
  position: ${props => props.inline && 'absolute'};
  text-align: left;
  transition: opacity .23s ease-in-out;
  &:hover {
    opacity: 1;
  }
  > button > span {
    font-family: 'Times New Roman', Times, serif;
    font-size: .75rem;
    font-weight: bold;
    line-height: 0.5;
    margin: 0;
    padding: 0;
  }
`;

const EditorBtn = styled.button`
  box-shadow: 2px 2px 1px #222;
  cursor: pointer;
  font-size: .75rem;
  height: ${props => props.inline ? '25px' : '30px'};
  margin: 0 5px 0 0;
  opacity: ${props => props.active ? 1 : 0.6};
  padding: 0;
  width: ${props => props.inline ? '25px' : '30px'};
  &:last-of-type {
    margin-right: 0;
  }
  &:active {
    box-shadow: 1px 1px 1px #222;
    transform: translateY(1px);
  }
`;
