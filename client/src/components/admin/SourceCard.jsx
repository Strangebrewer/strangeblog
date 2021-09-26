import { useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import SourceForm from "./SourceForm";

const SourceCard = props => {
  const [editable, setEditable] = useState(false);
  const { source, openDeleteModal } = props;

  function toggleEditable() {
    setEditable(!editable);
  }

  return (
    editable
      ? (
        <Card>
          <SourceForm toggleEditable={toggleEditable} source={source} />
        </Card>
      ) : (
        <Card>
          <div className="main-container">
            <p className="name">{source.name}</p>
            <p className="bias">{source.bias.split('_').join(' ')}</p>
            <p className="credibility">{source.credibility}</p>
            <p className="reporting">{source.factualReporting.split('_').join(' ')}</p>
            <p className="category">{source.category}</p>
            <div className="urls">
              <p>
                <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">
                  {source.url}
                </a>
              </p>
              <p>
                <a href={source.factCheckUrl} target="_blank" rel="noopener noreferrer nofollow">
                  {source.factCheckUrl}
                </a>
              </p>
            </div>
          </div>

          <div className="buttons">
            <button onClick={toggleEditable}>
              <i className="far fa-edit" />
            </button>

            <button onClick={() => openDeleteModal(source.id)}>
              <i className="fas fa-times" />
            </button>
          </div>
        </Card>
      )
  );
}
function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    sources: state.sources,
    categories: state.categories
  }
}

const mapDispatchToState = {};

export default connect(mapPropsToState, mapDispatchToState)(SourceCard);

export const Card = styled.div`
  border: 1px solid ${props => props.add ? props.theme.nBlue : 'white'};
  display: flex;
  ${props => props.add && 'margin-bottom: 24px;'}

  > .main-container {
    width: calc(100% - 60px);
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 80px;
    padding: 6px 12px;
    ${props => props.head && 'font-size: 1.4rem;'}

    > .name, > .name-input {
      width: 220px;

    }
    > .bias, > .bias-input,
    > .credibility, > .credibility-input,
    > .reporting, > .reporting-input,
    > .category, > .category-input {
      width: 120px;
    }

    > input, > select,
    > .urls > input {
      padding: 4px 0;
      background-color: black;
      outline: transparent;
      border: none;
      border-bottom: 1px solid #333;
      color: white;
      font-size: 1rem;
      font-weight: 300;
      font-family: Roboto;
    }

    > .urls {
      width: 100%;
      display: flex;
      justify-content: space-around;

      > p {
        width: 40%;

        > a {
          color: ${props => props.theme.nBlue};
          font-size: .9rem;
        }
      }

      > input {
        width: 40%;
      font-size: .9rem;
      }
    }
  }

  > .buttons {
    width: 60px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: right;
    margin: auto;

    > button {
      background-color: transparent;
      outline: transparent;
      border: none;
      color: white;
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.nPurple};
      }
    }
  }
`;