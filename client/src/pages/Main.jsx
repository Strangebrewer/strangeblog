import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Bio from '../components/main/Bio';
import Nav from '../components/main/Nav';
import Posts from '../components/main/Posts';

const Main = (props) => {
  const [bioEditable, setBioEditable] = useState(false);

  return (
    <PageWrapper>
      <Header>
        <h1>{props.blog.title}</h1>
        <p>{props.blog.subtitle}</p>
      </Header>

      <Nav setBioEditable={setBioEditable} />

      <Bio bioEditable={bioEditable} setBioEditable={setBioEditable} />

      <Posts />
    </PageWrapper>
  )
}

function mapPropsToState(state) {
  return {
    blog: state.blog
  }
}

const mapDispatchToState = {};

export default connect(mapPropsToState, mapDispatchToState)(Main);

const PageWrapper = styled.div`
  background-color: black;
  color: white;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 760px;
  margin: auto;

  > h1 {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.8;
  }

  > p {
    font-size: 22px;
    text-indent: 10px;
    color: ${props => props.theme.mainRed};
  }
`;
