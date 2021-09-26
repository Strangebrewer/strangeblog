import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserCard from "./UserCard";
import Modal from '../Modal';

import { getBasicSearchCriteria } from '../../utils/halp';

import { adminListUsers, adminDestroyUser, adminUpdateUser } from '../../redux/actions/adminUserActions';

const Users = props => {
  const [action, setAction] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (function () {
      console.log('fetching admin users!');
      props.adminListUsers(getBasicSearchCriteria());
    })();
  }, []);

  function openModal(userId, status) {
    if (status === 'active') {
      setModalMessage('Are you sure you want to reactivate this user?')
    }
    if (status === 'friend') {
      setModalMessage('Are you sure you want to give this user friend access?')
    }
    if (status === 'inactive') {
      setModalMessage('Are you sure you want to deactivate this user?')
    }
    if (status === 'banned') {
      setModalMessage('Are you sure you want to ban this user?')
    }
    if (status === 'reset-pw') {
      setModalMessage('Are you sure you want to reset this user\'s password?')
    }
    setAction(status);
    setUserIdToUpdate(userId);
    setShowModal(true);
  }

  function modalSaveUser() {
    if (action === 'inactive' || action === 'banned') {
      props.adminDestroyUser(userIdToUpdate, action);
    }
    if (action === 'active') {
      props.adminUpdateUser({
        id: userIdToUpdate,
        status: action
      });
    }
    if (action === 'friend') {
      props.adminUpdateUser({
        id: userIdToUpdate,
        addFriend: true
      });
    }
    if (action === 'unfriend') {
      props.adminUpdateUser({
        id: userIdToUpdate,
        removeFriend: true
      });
    }
    if (action === 'reset-pw') {
      props.adminUpdateUser({
        resetPassword: true,
        id: userIdToUpdate
      });
    }
  }

  return (
    <Wrapper>
      <Modal
        show={showModal}
        close={() => setShowModal(false)}
        callback={modalSaveUser}
        cancelText="Cancel"
        confirmText="Yes"
      >
        {modalMessage}
      </Modal>

      <h2>Users Nomsayn?</h2>

      {props.adminUsers.map((user) => {
        return (
          <UserCard
            key={`user-card-${user.id}`}
            user={user}
            openModal={openModal}
          />
        )
      })}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    adminUsers: state.adminUsers
  }
}

const mapDispatchToState = {
  adminListUsers,
  adminDestroyUser,
  adminUpdateUser
};

export default connect(mapPropsToState, mapDispatchToState)(Users);

const Wrapper = styled.div`
  width: 900px;
  margin: auto;

  h2 {
    font-size: 2.2rem;
    text-align: center;
    font-weight: 700;
    margin: 24px auto 12px auto;
    padding-bottom: 12px;
    border-bottom: 2px solid ${props => props.theme.mainRed};
  }
`;
