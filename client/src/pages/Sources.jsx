import { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';

import SourceCard from "./SourceCard";
import Navbar from "../components/Navbar";

import { deleteSource, listSources, save } from '../redux/actions/sourceActions';

const Sources = props => {
  useEffect(() => {
    (async function () {
      await props.listSources();
    })();
  }, []);

  return (
    <Wrapper>
      <Navbar />

      <Main>
        <h1>Not Necessarily The News</h1>

        <p>These are the sources I generally use to research any news issue I want to know more about. I want as unbiased reporting as I can get, but I also like to know what spin is going around, too.</p>

        <p>This list is the result of my best effort to find Conservative news sources that Conservatives read and trust; likewise for Liberal sources, though my existing biases made that relatively easy. I initially wanted to only include sources that are ranked high in both Credibility and Factual Reporting, but I had some difficulty finding more than a handful, especially for Conservative sources. Take that as you will - I admit I leaned heavily on <a href="mediabiasfactcheck.com" target="_blank" rel="noopener noreferrer nofollow">mediabiasfactcheck.com</a> to rate these sources.  I may refine this list over time as I get a better feel for the veracity of these sources.</p>

        {props.sources && props.sources.length ? (
          <SourceTable category="neutral">
            <h2>"Neutral" Sources</h2>
            {props.sources.filter(source => source.category === 'Neutral').map(source => {
              return (
                <SourceCard source={source} key={`source-${source.id}`} />
              )
            })}
          </SourceTable>
        ) : null}

        {props.sources && props.sources.length ? (
          <SourceTable category="liberal">
            <h2>Liberal Sources</h2>
            {props.sources.filter(source => source.category === 'Liberal').map(source => {
              return (
                <SourceCard source={source} key={`source-${source.id}`} />
              )
            })}
          </SourceTable>
        ) : null}

        {props.sources && props.sources.length ? (
          <SourceTable category="conservative">
            <h2>Conservative Sources</h2>
            {props.sources.filter(source => source.category === 'Conservative').map(source => {
              return (
                <SourceCard source={source} key={`source-${source.id}`} />
              )
            })}
          </SourceTable>
        ) : null}
      </Main>
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
`;

const Main = styled.main`
  width: 904px;
  margin: auto;

  > h1 {
    font-size: 3rem;
    font-family: monospace;
    text-align: center;
    margin-bottom: 8px;
  }

  > p {
    font-size: 1rem;
    line-height: 1.5;
    font-style: italic;
    width: 560px;
    margin: 16px auto;

    > a {
      color: ${props => props.theme.nBlue};
    }
  }
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
