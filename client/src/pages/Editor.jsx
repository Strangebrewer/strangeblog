import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Editor from '../components/slate/Editor';

const FullPageEditor = props => {
  return (
    <PageWrapper>
      <Editor post={props.post} />
    </PageWrapper>
  );
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FullPageEditor);

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 50px;
`;
