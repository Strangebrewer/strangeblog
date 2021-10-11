import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserCard from "./UserCard";
import Modal from '../Modal';
import { Form, Input, Label } from '../../styles/components'
import { UserCardWrapper } from './UserCard';

import { getBasicSearchCriteria } from '../../utils/halp';

import { adminListUsers, adminDeactivateUser, adminUpdateUser, adminDeleteUser } from '../../redux/actions/adminUserActions';
import { setSearchCriteria, setCount } from '../../redux/actions/otherActions';

const Users = props => {
  const [action, setAction] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [acl, setAcl] = useState('');
  const [status, setStatus] = useState('');

  const { skip, take } = props.criteria;

  useEffect(() => {
    (async function () {
      const result = await props.adminListUsers(getBasicSearchCriteria());
      props.setCount(result.count);
    })();
  }, []);

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'username') setUsername(value);
    if (name === 'acl') setAcl(value);
    if (name === 'status') setStatus(value);
  }

  async function searchUsers(event) {
    event.preventDefault();
    const search = getBasicSearchCriteria();
    if (email) search.email = email;
    if (username) search.username = username;
    if (acl) search.acl = acl;
    if (status) search.status = status;
    props.setSearchCriteria(search);
    await props.adminListUsers(search);
  }

  async function nextTenUsers() {
    const plus10 = skip + 10;
    props.adminListUsers({ ...props.criteria, skip: plus10 }, true);
    props.setSearchCriteria({ ...props.criteria, skip: plus10 });
  }

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
    if (status === 'delete') {
      setModalMessage('Are you sure you want to delete this user?')
    }
    setAction(status);
    setUserIdToUpdate(userId);
    setShowModal(true);
  }

  function modalSaveUser() {
    if (action === 'inactive' || action === 'banned') {
      props.adminDeactivateUser(userIdToUpdate, action);
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
    if (action === 'delete') {
      props.adminDeleteUser(userIdToUpdate);
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

      <SearchWrapper>
        <h2>Seek and Destroy!</h2>

        <Form submit={searchUsers}>
          <FormRow>
            <div>
              <Label>Username:</Label>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Email:</Label>
              <Input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>ACL:</Label>
              <Input
                type="text"
                name="acl"
                value={acl}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label>Status:</Label>
              <Input
                type="text"
                name="status"
                value={status}
                onChange={handleInputChange}
              />
            </div>
          </FormRow>
        </Form>
      </SearchWrapper>
      
      <UserCardWrapper style={{ borderBottom: '1px solid #333' }}>
        <p className="username">Username</p>
        <p className="email">Email</p>
        <p className="acl">ACL</p>
        <p className="status">Status</p>
        <p className="since">Follower Since</p>
        <div className="buttons"></div>
      </UserCardWrapper>
      {props.adminUsers.map((user) => {
        return (
          <UserCard
            key={`user-card-${user.id}`}
            user={user}
            openModal={openModal}
          />
        )
      })}

      {props.count >= (skip + take) && (
        <button onClick={nextTenUsers}>Load More...</button>
      )}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    adminUsers: state.adminUsers,
    count: state.count,
    criteria: state.criteria
  }
}

const mapDispatchToState = {
  adminListUsers,
  adminDeactivateUser,
  adminDeleteUser,
  adminUpdateUser,
  setCount,
  setSearchCriteria
};

export default connect(mapPropsToState, mapDispatchToState)(Users);

const Wrapper = styled.div`
  margin: auto;
  width: 900px;

  > h2 {
    border-bottom: 2px solid ${props => props.theme.mainRed};
    font-size: 2.2rem;
    font-weight: 700;
    margin: 24px auto 12px auto;
    padding-bottom: 12px;
    text-align: center;
  }
`;

const SearchWrapper = styled.div`
  margin-bottom: 24px;
  padding-bottom: 12px;
  /* border-bottom: 1px solid #333; */

  > h2 {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 12px;
  }
`;

const FormRow = styled.div`
  display: flex;

  > div {
    margin-right: 12px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
