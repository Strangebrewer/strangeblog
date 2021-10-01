import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';
import { format } from 'date-fns';

import { getOnePost, getOnePublicPost } from '../redux/actions/postActions';

import { Element, Leaf } from '../components/slate/utils/Renderers';
import { initialValue } from '../components/slate/utils/value';
import { Spinner, SpinnerWrap } from '../styles/Elements';

const SinglePost = props => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [buttonStyles, setButtonStyles] = useState({ opacity: '.1' });

  const { admin, friend, match } = props;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.getOnePost(match.params.id)
      } else {
        result = await props.getOnePublicPost(match.params.id);
      }
      setValue(JSON.parse(result.body));
      setPost(result);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [admin, friend]);

  function print() {
    window.print();
    hideButtons();
  }

  function showButtons() {
    setButtonStyles({ opacity: '1' });
  }

  function hideButtons() {
    setButtonStyles({ opacity: '.1' });
  }

  const editorFieldStyle = {
    backgroundColor: 'white',
    padding: '40px 80px',
    fontSize: '16px',
    color: 'black',
    fontFamily: '\'Times New Roman\', Times, serif'
  };

  return (
    loading
      ? (
        <SpinnerWrap background="linear-gradient(black, 88%, #e22c5a)">
          <Spinner size="120" border="10" />
        </SpinnerWrap>
      ) : (
        <Wrapper>
          <PrintNav
            className="do-not-print"
            onMouseOver={showButtons}
            onMouseLeave={hideButtons}
            style={buttonStyles}
          >
            <button className="do-not-print" onClick={print} title="save as PDF">
              <i className="fas fa-print" />
            </button>

            <button className="do-not-print" onClick={() => props.history.push('/')} title="to Main page">
              <i className="fas fa-arrow-left" />
            </button>
          </PrintNav>

          <Container>
            <h2>{post.title}</h2>
            <h4>{post.subtitle}</h4>
            <p>{format(new Date(post.createdAt), 'MMM dd, yyyy - hh:mm aaaa ')}</p>

            <Slate editor={editor} value={value} onChange={v => setValue(v)}>
              <Editable
                style={editorFieldStyle}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Sup, sucka..."
                autoFocus
                readOnly
              />
            </Slate>
          </Container>
        </Wrapper>
      )
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    friend: state.user.acl && state.user.acl.includes('friend')
  }
}

const mapDispatchToState = {
  getOnePost,
  getOnePublicPost
};

export default connect(mapPropsToState, mapDispatchToState)(SinglePost);

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: white;
  color: black;
  @media print {
    .do-not-print {
      display: none;
    }
  }
`;

const Container = styled.div`
  padding: 130px 0 50px 0;
  width: 900px;
  margin: auto;

  > h2 {
    font-size: 48px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    text-align: center;
    margin-bottom: 6px;
  }

  > h4 {
    font-size: 20px;
    font-weight: 300;
    text-align: center;
    margin: 0 80px 6px 80px;
    padding-bottom: 2px;
    /* border-bottom: 1px solid black; */
  }

  > p {
    font-size: 12px;
    font-weight: 300;
    text-align: center;
  }
`;

const PrintNav = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .2s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  > button {
    margin: 0 32px;
    background-color: transparent;
    /* border: 1px solid #777; */
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 12px ${props => props.theme.mainRed};
    border-radius: 50%;
    color: ${props => props.theme.blue};
    outline: transparent;
    padding: 12px;
    font-size: 1.2rem;
    cursor: pointer;
    height: 48px;
    width: 48px;
  }
`;
