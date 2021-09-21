import { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import SourceCard from "./SourceCard";

import { deleteSource, listSources, save } from '../redux/actions/sourceActions';

const Sources = props => {
  const history = useHistory();

  useEffect(() => {
    (async function () {
      await props.listSources();
    })();
  }, []);

  function goTo(route, state) {
    history.push(route, state)
  }

  return (
    <Wrapper>
      <nav>
        <button onClick={() => goTo('/')}>Home</button>
        <button onClick={() => goTo('/editor')}>New</button>
        <button onClick={() => goTo('/admin')}>Admin</button>
        <button onClick={() => goTo('/admin')}>logout</button>
      </nav>

      <p>These are the sources I generally use to research any news issue I want to know more about. I want as unbiased reporting as I can get, but I also like to know what spin is going around, too.</p>

      <SourceTable category="neutral">
        <h2>"Neutral" Sources</h2>
        {props.sources && props.sources.length ? (
          props.sources.filter(source => source.category === 'Neutral').map(source => {
            return (
              <SourceCard source={source} key={`source-${source.id}`} />
            )
          })
        ) : null}
      </SourceTable>

      <SourceTable category="liberal">
        <h2>Liberal Sources</h2>
        {props.sources && props.sources.length ? (
          props.sources.filter(source => source.category === 'Liberal').map(source => {
            return (
              <SourceCard source={source} key={`source-${source.id}`} />
            )
          })
        ) : null}
      </SourceTable>

      <SourceTable category="conservative">
        <h2>Conservative Sources</h2>
        {props.sources && props.sources.length ? (
          props.sources.filter(source => source.category === 'Conservative').map(source => {
            return (
              <SourceCard source={source} key={`source-${source.id}`} />
            )
          })
        ) : null}
      </SourceTable>
    </Wrapper>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = {
  deleteSource,
  listSources,
  save,
};

export default connect(mapPropsToState, mapDispatchToState)(Sources);

const Wrapper = styled.div`
  min-height: 100vh;
  color: white;
  width: 904px;
  margin: auto;
`;

const SourceTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 904px;
  margin: 48px auto;

  > h2 {
    width: 100%;
    padding: 12px 0;
    font-size: 2rem;
    text-align: center;
    font-weight: 500;
    margin: 0 10px;
    background: ${props => {
    if (props.category === 'neutral') return props.theme.purple;
    if (props.category === 'conservative') return props.theme.red;
    if (props.category === 'liberal') return props.theme.blue;
  }};
    border: 3px solid #aaa;
  }
`;
