import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MainButton } from '../../styles/components';
import { saveBlogData } from '../../redux/actions/otherActions';

const Blog = props => {
  const [state, setState] = useState({
    title: props.blog.title,
    subtitle: props.blog.subtitle
  });

  useEffect(() => {
    (function () {

    })();
  }, [])

  function handleInputChange({ target }) {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  function save() {
    const update = { id: props.blog.id };
    if (state.title !== props.blog.title) update.title = state.title;
    if (state.subtitle !== props.blog.subtitle) update.subtitle = state.subtitle;
    props.saveBlogData(update);
  }

  function cancel() {
    setState({
      title: props.blog.title,
      subtitle: props.blog.subtitle
    });
  }

  const disabled = (
    state.title === props.blog.title
    && state.subtitle === props.blog.subtitle
  );

  return (
    <Wrapper>
      <InputWrapper>
        <h1>Title:</h1>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <InputWrapper subtitle>
        <h2>Subtitle:</h2>
        <input
          type="text"
          name="subtitle"
          value={state.subtitle}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <div className="buttons">
        <MainButton color="nBlue" disabled={disabled} onClick={save}>Save</MainButton>
        <MainButton color="nRed" disabled={disabled} onClick={cancel}>Cancel</MainButton>
      </div>
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = {
  saveBlogData
};

export default connect(mapPropsToState, mapDispatchToState)(Blog);

const Wrapper = styled.div`
  margin: auto;
  padding-top: 48px;
  width: 900px;

  > .buttons {
    margin: 24px 0 0 132px;
  }
`;

const InputWrapper = styled.div`
  display: flex;

  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #222;
    color: ${props => props.subtitle ? props.theme.mainRed : props.theme.text};
    font-family: Roboto;
    font-size: ${props => props.subtitle ? '1.35rem' : '3rem'};
    font-weight: ${props => props.subtitle ? '300' : '900'};
    outline: transparent;
    padding-bottom: 6px;
    width: 100%;
    ${props => props.subtitle && 'text-indent: 10px'};
  }

  h1 {
    align-self: flex-end;
    font-size: 2.4rem;
    padding: 0 12px 12px 0;
    text-align: right;
    width: 140px;
  }

  h2 {
    align-self: flex-end;
    font-size: 1.1rem;
    padding: 0 12px 9px 0;
    text-align: right;
    width: 140px;
  }
`;
