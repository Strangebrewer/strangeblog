import { connect } from 'react-redux';
import styled from 'styled-components';

import Bio from '../components/main/Bio';
import Nav from '../components/main/Nav';
import Posts from '../components/main/Posts';

const Main = (props) => {
  return (
    <PageWrapper>
      <Header>
        <h1>{props.blog.title}</h1>
        <p>{props.blog.subtitle}</p>
      </Header>

      <Nav />

      <Bio />

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
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.8;
  }

  > p {
    font-size: 1.35rem;
    text-indent: 10px;
    color: ${props => props.theme.mainRed};
  }
`;
