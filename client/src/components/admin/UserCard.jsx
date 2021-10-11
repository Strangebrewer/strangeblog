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
          disabled={user.acl.includes('admin')}
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
          disabled={!user.acl.includes('friend') || user.acl.includes('admin')}
        >
          <i className="fas fa-atom" />
        </button>

        <button
          onClick={() => openModal(user.id, 'inactive')}
          title="deactivate user"
          disabled={!user.status === 'active' || user.acl.includes('admin')}
        >
          <i className="far fa-stop-circle" />
        </button>

        <button
          onClick={() => openModal(user.id, 'banned')}
          title="ban user"
          disabled={user.status === 'banned' || user.acl.includes('admin')}
        >
          <i className="fas fa-ban" />
        </button>

        <button
          onClick={() => openModal(user.id, 'delete')}
          title="delete user"
          disabled={user.acl.includes('admin')}
        >
          <i className="far fa-trash-alt" />
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

export const UserCardWrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.text};
  display: flex;
  margin: auto;
  padding: 6px 0 6px 12px;
  width: 900px;

  &:last-of-type {
    border: none;
  }

  > .username {
    max-width: 200px;
    min-width: 200px;
  }
  > .email {
    max-width: 250px;
    min-width: 250px;
  }
  > .acl {
    max-width: 70px;
    min-width: 70px;
  }
  > .status {
    max-width: 70px;
    min-width: 70px;
  }
  > .since {
    max-width: 210px;
    min-width: 210px;
  }

  > .buttons {
    align-items: center;
    border-left: 1px solid ${props => props.theme.nBlue};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100px;
    min-width: 100px;
    text-align: right;
    width: 100px;

    > button {
      background-color: transparent;
      border: none;
      color: ${props => props.theme.nPurple};
      cursor: pointer;
      outline: transparent;
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