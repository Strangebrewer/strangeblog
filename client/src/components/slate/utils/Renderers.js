import React from "react";
import styled from "styled-components";

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return (
        <BlockQuote>
          <blockquote {...attributes}>{children}</blockquote>
        </BlockQuote>
      );
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <H1 {...attributes}>{children}</H1>
    case 'heading-two':
      return <H2 {...attributes}>{children}</H2>
    case 'heading-three':
      return <H3 {...attributes}>{children}</H3>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <P {...attributes}>{children}</P>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>
  if (leaf.code) children = <code style={{ background: '#eeeeee', borderRadius: '2px' }}>{children}</code>
  if (leaf.italic) children = <em>{children}</em>
  if (leaf.strikethrough) children = <del>{children}</del>
  if (leaf.underline) children = <u>{children}</u>
  if (leaf.red) children = <span style={{ color: '#bd0000' }}>{children}</span>
  if (leaf.blue) children = <span style={{ color: '#1111ff' }}>{children}</span>
  if (leaf.green) children = <span style={{ color: '#39ff14' }}>{children}</span>
  if (leaf.yellow) children = <span style={{ color: '#fffb00' }}>{children}</span>
  if (leaf.purple) children = <span style={{ color: '#660d8a' }}>{children}</span>

  return <span {...attributes}>{children}</span>
}

export { Element, Leaf };

const BlockQuote = styled.div`
  border-left: 2px solid #e1e1e1;
  margin: 40px 0 40px 50px;
  padding: 0 100px 0 50px;
  opacity: .8;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 2.2rem;
  font-style: italic;

  blockquote {
    text-indent: 25px;
  }
`;

const H1 = styled.h1`
  font-size: 34px;
  font-weight: bold;
  margin-top: 16px;
`;

const H2 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-top: 16px;
`;

const H3 = styled.h1`
  font-size: 22px;
  font-style: italic;
  font-weight: bold;
  margin-top: 16px;
`;

const P = styled.p`
  line-height: 1.5;
  text-indent: 30px;
`;