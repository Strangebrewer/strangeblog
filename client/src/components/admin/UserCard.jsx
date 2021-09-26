import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import { format } from 'date-fns';

const UserCard = props => {
  const { openModal, user } = props;

  function getAcl() {
    let acl = '';
    if (user.acl.includes('admin')) acl = 'admin';
    if (acl !== 'admin' && user.acl.includes('friend')) acl = 'friend';
    return acl;
  }

  return (
    <UserCardWrapper>
      <p className="username">{user.username}</p>
      <p className="email">{user.email}</p>
      <p className="acl">{getAcl()}</p>
      <p className="status">{user.status}</p>
      <p className="since">{format(new Date(user.createdAt), 'MMM dd, yyyy - hh:mm aaaa')}</p>
      <div className="buttons">
        <button
          onClick={() => openModal(user.id, 'reset-pw')}
          title="reset pw"
        >
          <i className="fas fa-unlock-alt" />
        </button>

        <button
          onClick={() => openModal(user.id, 'active')}
          title="reactivate user"
          disabled={user.status === 'active'}
        >
          <i className="far fa-smile-beam" />
        </button>

        <button
          onClick={() => openModal(user.id, 'friend')}
          title="set as friend"
          disabled={user.acl.includes('friend')}
        >
          <i className="fas fa-robot" />
        </button>

        <button
          onClick={() => openModal(user.id, 'unfriend')}
          title="remove as friend"
          disabled={!user.acl.includes('friend')}
        >
          <i className="fas fa-atom" />
        </button>

        <button
          onClick={() => openModal(user.id, 'inactive')}
          title="deactivate user"
          disabled={!user.status === 'active'}
        >
          <i className="far fa-stop-circle" />
        </button>

        <button
          onClick={() => openModal(user.id, 'banned')}
          title="ban user"
          disabled={user.status === 'banned'}
        >
          <i className="fas fa-ban" />
        </button>
      </div>
    </UserCardWrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    adminUsers: state.adminUsers
  }
}

const mapDispatchToState = {};

export default connect(mapPropsToState, mapDispatchToState)(UserCard);

const UserCardWrapper = styled.div`
  width: 900px;
  margin: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.text};
  padding: 6px 0 6px 12px;
  justify-content: space-between;

  &:last-of-type {
    border: none;
  }

  > .username {
    width: 180px;
  }
  > .email {
    width: 240px;
  }
  > .acl {
    width: 70px;
  }
  > .status {
    width: 70px;
  }

  > .buttons {
    width: 80px;
    text-align: right;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-left: 1px solid ${props => props.theme.nBlue};

    > button {
      background-color: transparent;
      outline: transparent;
      border: none;
      color: ${props => props.theme.nPurple};
      cursor: pointer;
      padding: 3px 4px;

      &:hover {
        color: ${props => props.theme.nBlue};
      }

      &:disabled {
        color: #555;
        cursor: default;
      }
    }
  }
`;