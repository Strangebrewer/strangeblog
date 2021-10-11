import { useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import SourceCard, { Card } from './SourceCard';
import SourceForm from "./SourceForm";
import Modal from '../Modal';

import { saveSource, deleteSource } from '../../redux/actions/sourceActions';

const Sources = props => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSourceForm, setShowSourceForm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  function openDeleteModal(sourceId) {
    setIdToDelete(sourceId);
    setShowDeleteModal(true);
  }

  function toggleSourceForm() {
    setShowSourceForm(!showSourceForm);
  }

  async function deleteSource() {
    await props.deleteSource(idToDelete);
  }

  function save(data) {
    return props.saveSource(data);
  }

  return (
    <Wrapper>
      <Modal
        show={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        callback={deleteSource}
        cancelText="Cancel"
        confirmText="Yes"
      >
        Are you sure you want to delete this source?
      </Modal>

      <h2>Sources</h2>

      {showSourceForm
        ? (
          <Card add>
            <SourceForm toggleEditable={toggleSourceForm} />
          </Card>
        ) : null}

      <Card head>
        <div className="main-container">
          <p className="name">Organization</p>
          <p className="bias">Bias</p>
          <p className="credibility">Credibility</p>
          <p className="reporting">Factual Reporting</p>
          <p className="category">Category</p>
        </div>
        <div className="buttons">
          <button onClick={toggleSourceForm} style={{ marginRight: '12px' }}>
            <i className="fas fa-plus-circle" />
          </button>
        </div>
      </Card>

      {props.sources.filter(s => s.category === 'Neutral').map((source, i) => (
        <SourceCard
          key={`source-card-${source.id}`}
          source={source}
          openDeleteModal={openDeleteModal}
          save={save}
        />
      ))}

      {props.sources.filter(s => s.category === 'Liberal').map((source, i) => (
        <SourceCard
          key={`source-card-${source.id}`}
          source={source}
          openDeleteModal={openDeleteModal}
          save={save}
        />
      ))}

      {props.sources.filter(s => s.category === 'Conservative').map((source, i) => (
        <SourceCard
          key={`source-card-${source.id}`}
          source={source}
          openDeleteModal={openDeleteModal}
          save={save}
        />
      ))}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    sources: state.sources
  }
}

const mapDispatchToState = {
  deleteSource,
  saveSource
};

export default connect(mapPropsToState, mapDispatchToState)(Sources);

const Wrapper = styled.div`
  margin: auto;
  width: 900px;

  h2 {
    border-bottom: 2px solid ${props => props.theme.mainRed};
    font-size: 2.2rem;
    font-weight: 700;
    margin: 24px auto;
    padding-bottom: 12px;
    text-align: center;
    width: 100%;
  }
`;
