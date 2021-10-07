import styled from 'styled-components';

const SourceCard = props => {
  const { source } = props;

  let urlText = source.url.split('//')[1];
  if (source.url.includes('www.')) {
    urlText = source.url.split('www.')[1];
  }

  return (
    <Card category={source.category.toLowerCase()}>
      <h3>{source.name}</h3>
      <p><a href={`https://${source.url}`} target="_blank" rel="noopener noreferrer nofollow">{urlText}</a></p>

      <div className="source-facts">
        <p className="source-bias">Bias: <span>{source.bias.split('_').join(' ')}</span></p>
        <p>Credibility: <span>{source.credibility.split('_').join(' ')}</span></p>
        <p>Factual Reporting: <span>{source.factualReporting.split('_').join(' ')}</span></p>
      </div>

      <p>source: <a href={`https://${source.factCheckUrl}`} target="_blank" rel="noopener noreferrer nofollow">mediabiasfactcheck.com</a></p>
    </Card>
  );
};

export default SourceCard;

const Card = styled.div`
  border: 2px solid #777;
  border-radius: 9px;
  width: 280px;
  height: 200px;
  margin: 10px;
  padding: 16px;
  box-shadow: 0 0 4px #aaa, 0 0 10px #88888899;
  
  a {
    color: ${props => props.theme.nBlue};
  }

  > p {
    margin-bottom: 16px;

    &:first-of-type {
      /* border-bottom: none; */
      text-indent: 6px;
    }

    &:last-of-type {
      font-size: .8rem;
      text-align: center;
    }
  }

  > h3 {
    width: 100%;
    font-size: 1.2rem;
    margin-bottom: 4px;
    padding-bottom: 2px;
    border-bottom: 1px solid ${props => props.theme.mainRed};
  }



  > .source-facts {
      margin-bottom: 12px;

    > p {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: 4px 0 2px 0;
      padding: 4px 0;
      border-bottom: 1px solid grey;
      font-size: .9rem;

      > span {
        padding: 2px 4px;
        border-radius: 2px;
        background-color: #555;
      }
    }

    .source-bias {

      > span {
        padding: 2px 4px;
        border-radius: 2px;
        background: ${props => {
    if (props.category === 'neutral') return props.theme.nPurple;
    if (props.category === 'conservative') return props.theme.nRed;
    if (props.category === 'liberal') return props.theme.nBlue;
  }};
      }
    }
  }
`;
