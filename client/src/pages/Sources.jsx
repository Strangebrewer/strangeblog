import { useEffect } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';

import { deleteSource, listSources, save } from '../redux/actions/sourceActions';

const Sources = props => {
  useEffect(() => {
    (async function () {
      if (props.admin) {
        await props.listSources();
      }
    })();
  }, []);

  return (
    <Wrapper>
      <h1>Hello from the sources page</h1>
      {console.log('props.sources:::', props.sources)}
      <p>These are the sources I generally use to research any news issue I want to know more about. I want as unbiased reporting as I can get, but I also like to know what spin is going around, too.</p>

      <div>
        <h2>"Neutral" Sources</h2>
        <SourceTable>
          {props.sources && props.sources.length ? (
            props.sources.filter(source => source.category === 'Neutral').map(source => {
              return (
                <SourceCard>
                  <h3>{source.name}</h3>
                  <div>
                    {/* <p>Bias: {source.bias.split('_').join(' ')}</p> */}
                    <p>Bias:</p>
                    <p>{source.bias.split('_').join(' ')}</p>
                  </div>
                  <div>
                    {/* <p>Factual Reporting: {source.factualReporting.split('_').join(' ')}</p> */}
                    <p>Factual Reporting:</p>
                    <p>{source.factualReporting.split('_').join(' ')}</p>
                  </div>
                  <div>
                    {/* <p>Credibility: {source.credibility.split('_').join(' ')}</p> */}
                    <p>Credibility:</p>
                    <p>{source.credibility.split('_').join(' ')}</p>
                  </div>
                  <div className="source-links">
                    <p><a href={source.url} target="_blank" rel="noopener noreferrer nofollow">{source.url}</a></p>
                    <p><a href={source.factCheckUrl} target="_blank" rel="noopener noreferrer nofollow">{source.name} on mediabiasfactcheck.com</a></p>
                  </div>
                </SourceCard>
              )
            })
          ) : null}
        </SourceTable>
      </div>

      <div>
        <h2>Liberal Sources</h2>
        <SourceTable>
          {props.sources && props.sources.length ? (
            props.sources.filter(source => source.category === 'Liberal').map(source => {
              return (
                <SourceCard>
                  <h3>{source.name}</h3>
                  <p>Bias: {source.bias.split('_').join(' ')}</p>
                  <p>Factual Reporting: {source.factualReporting.split('_').join(' ')}</p>
                  <p>Credibility: {source.credibility.split('_').join(' ')}</p>
                  <div className="source-links">
                    <p><a href={source.url} target="_blank" rel="noopener noreferrer nofollow">{source.url}</a></p>
                    <p><a href={source.factCheckUrl} target="_blank" rel="noopener noreferrer nofollow">{source.name} on mediabiasfactcheck.com</a></p>
                  </div>
                </SourceCard>
              )
            })
          ) : null}
        </SourceTable>
      </div>

      <div>
        <h2>Conservative Sources</h2>
        <SourceTable>
          {props.sources && props.sources.length ? (
            props.sources.filter(source => source.category === 'Conservative').map(source => {
              return (
                <SourceCard>
                  <h3>{source.name}</h3>
                  <p>Bias: {source.bias.split('_').join(' ')}</p>
                  <p>Factual Reporting: {source.factualReporting.split('_').join(' ')}</p>
                  <p>Credibility: {source.credibility.split('_').join(' ')}</p>
                  <div className="source-links">
                    <p><a href={source.url} target="_blank" rel="noopener noreferrer nofollow">{source.url}</a></p>
                    <p><a href={source.factCheckUrl} target="_blank" rel="noopener noreferrer nofollow">{source.name} on mediabiasfactcheck.com</a></p>
                  </div>
                </SourceCard>
              )
            })
          ) : null}
        </SourceTable>
      </div>

      {/* {props.sources && props.sources.length ? (
        <SourceTable>
          {props.sources.map((source, i) => {
            return (
              <div>
                <p>{source.name}</p>
                <p>Bias: {source.bias.split('_').join(' ')}</p>
                <p>Factual Reporting: {source.factualReporting.split('_').join(' ')}</p>
                <p>Credibility: {source.credibility.split('_').join(' ')}</p>
                <Links>
                  <p><a href={source.url} target="_blank" rel="noopener noreferrer nofollow">{source.url}</a></p>
                  <p><a href={source.factCheckUrl} target="_blank" rel="noopener noreferrer nofollow">{source.name} on mediabiasfactcheck.com</a></p>
                </Links>
              </div>
            )
          })}
        </SourceTable>
      ) : null} */}
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
  background-color: black;
  color: white;
`;

const SourceTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  margin: auto;
`;

const SourceCard = styled.div`
  border: 1px solid hotpink;
  width: 100%;
  margin: 8px 0;

  > h3 {
    width: 100%;
    font-size: 1.8rem;
    text-decoration: underline;
  }

  .source-links {
    width: 100%;
    display: flex;
    justify-content: space-between;

    > p > a {
      color: blue;
    }
  }
`;
