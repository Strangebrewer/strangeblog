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
  border: 1px solid ${props => props.add ? props.theme.nBlue : props.theme.text};
  display: flex;
  ${props => props.add && 'margin-bottom: 24px;'}

  > .main-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 80px;
    justify-content: space-between;
    padding: 6px 12px;
    width: calc(100% - 60px);
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
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #333;
      color: ${props => props.theme.text};
      font-family: Roboto;
      font-size: 1rem;
      font-weight: 300;
      outline: transparent;
      padding: 4px 0;
    }

    > .urls {
      display: flex;
      justify-content: space-around;
      width: 100%;

      > p {
        width: 48%;

        > a {
          color: ${props => props.theme.nBlue};
          font-size: .9rem;
        }
      }

      > input {
        font-size: .9rem;
        width: 48%;
      }
    }
  }

  > .buttons {
    align-items: center;
    display: flex;
    justify-content: right;
    margin: auto;
    text-align: right;
    width: 60px;

    > button {
      background-color: transparent;
      border: none;
      color: ${props => props.theme.text};
      cursor: pointer;
      outline: transparent;

      &:hover {
        color: ${props => props.theme.nBlue};
      }
    }
  }
`;