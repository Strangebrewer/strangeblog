import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import slugify from 'slugify';
import styled from 'styled-components';
import InlineEditor from '../slate/InlineEditor';
import Modal from '../Modal';
import {
  destroyPost,
  getOnePost,
  getOnePublicPost,
  savePost,
  saveUserTags
} from '../../redux/actions/postActions';

const Post = props => {
  const history = useHistory();
  const [newTags, setNewTags] = useState('');
  const [newUserTags, setNewUserTags] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [showUserTagInput, setShowUserTagInput] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    post,
    searchByTag,
    searchByUserTag,
  } = props;

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === "newTags") setNewTags(value);
    if (name === "newUserTags") setNewUserTags(value);
  }

  function save(update) {
    props.savePost(update);
  }

  function goTo(route, state) {
    history.push(route, state)
  }

  async function getPost(post) {
    if (props.admin || props.friend) {
      await props.getOnePost(post.id);
    } else {
      await props.getOnePublicPost(post.id);
    }
    goTo(`/${slugify(post.title, { lower: true })}`);
  }

  async function openSingleEdit() {
    if (props.admin) {
      await props.getOnePost(post.id, true);
      goTo('/editor/' + post.id, { from: history.location.pathname });
    }
  }

  function deletePost() {
    props.destroyPost(post.id);
  }

  function addTags() {
    const tags = [...post.tags];
    const toAdd = newTags.split(',');
    toAdd.forEach(tag => {
      tags.push(tag.trim());
    });
    save({ id: post.id, tags });
    setShowTagInput(false);
  }

  function addUserTags() {
    const tags = post.userTags ? [...post.userTags] : [];
    const toAdd = newUserTags.split(',');
    toAdd.forEach(tag => {
      tags.push(tag.trim());
    });
    props.saveUserTags(props.user.id, { id: post.id, tags });
    setShowUserTagInput(false);
  }

  function removeTag(index) {
    const tags = [...post.tags];
    tags.splice(index, 1);
    save({ id: post.id, tags });
  }

  function removeUserTag(index) {
    const tags = [...post.userTags];
    tags.splice(index, 1);
    props.saveUserTags(props.user.id, { id: post.id, tags });
  }

  function toggleTagInput() {
    setShowTagInput(!showTagInput);
  }

  function toggleUserTagInput() {
    setShowUserTagInput(!showUserTagInput);
  }

  function closeModal() {
    setShowDeleteModal(false);
  }

  return (
    <Wrapper>
      <Modal
        show={showDeleteModal}
        close={closeModal}
        callback={deletePost}
        confirmText="Yes"
        cancelText="Cancel"
      >
        <h4>Are you sure you want to delete this post?</h4>
      </Modal>

      <MetaData>
        <h2 className="post-title" onClick={() => getPost(post)} style={{ cursor: 'pointer' }}>{post.title}</h2>
        <h4 className="post-subtitle">{post.subtitle}</h4>

        {props.admin && (
          <div className="post-buttons">
            <button onClick={openSingleEdit}>
              <i className="fas fa-external-link-alt" title="open in editor" />
            </button>
            <button onClick={() => setShowDeleteModal(true)}>
              <i className="far fa-trash-alt" title="delete this post" />
            </button>
            <button onClick={toggleTagInput}>
              <i className="fas fa-tag" title="add tag" />
            </button>
            {showTagInput && (
              <TagInput>
                <input
                  type="text"
                  name="newTags"
                  value={newTags}
                  onChange={handleInputChange}
                  placeholder="comma-separated tags..."
                />
                <button onClick={addTags}>add</button>
              </TagInput>
            )}
          </div>
        )}
      </MetaData>

      <TagWrapper>
        <h5>{format(new Date(post.createdAt), 'MMM dd, yyyy - hh:mm aaaa')} <span>-</span></h5>
        {
          post.tags.length
            ? (
              <Tags>
                <h4>Tags<span>:</span> </h4>
                <p>
                  {post.tags.map((tag, i) => (
                    <span key={`tag-${i}`}>
                      <span className="tag" onClick={() => searchByTag(tag)}>{tag}</span>
                      <span className="tag-delete" onClick={() => removeTag(i)}>&times;</span>
                    </span>
                  ))}
                </p>
              </Tags>
            ) : null
        }
      </TagWrapper>

      <InlineEditor
        post={post}
        save={save}
        isAdmin={props.admin}
        edit={openSingleEdit}
      />

      <Tags userTags>
        {
          post.userTags && (
            <>
              <h4>My Tags<span>:</span> </h4>
              <p>
                {post.userTags.map((tag, i) => (
                  <span key={`my-tag-${i}`}>
                    <span className="tag" onClick={() => searchByUserTag(tag)}>{tag}</span>
                    <span className="tag-delete" onClick={() => removeUserTag(i)}>&times;</span>
                  </span>
                ))}
              </p>
            </>
          )
        }
      </Tags>

      <UserActions>
        <button onClick={toggleUserTagInput}>
          <i className="fas fa-tag" title="add tags" />
        </button>

        {showUserTagInput && (
          <TagInput userTags>
            <input
              type="text"
              name="newUserTags"
              value={newUserTags}
              onChange={handleInputChange}
              placeholder="comma-separated tags..."
            />
            <button onClick={addUserTags}>add</button>
          </TagInput>
        )}
      </UserActions>
    </Wrapper>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    friend: state.user.acl === "friend",
    user: state.user
  }
}

const mapDispatchToState = {
  destroyPost,
  getOnePost,
  getOnePublicPost,
  savePost,
  saveUserTags
};

export default connect(mapPropsToState, mapDispatchToState)(Post);

const Wrapper = styled.article`
  margin-bottom: 60px;
`;

const MetaData = styled.div`
  position: relative;

  .post-title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 4px;
  }

  .post-subtitle {
    font-size: .88rem;
    border-bottom: 1px solid ${props => props.theme.mainGrey};
    padding-bottom: 8px;
    margin-bottom: 4px;
    text-indent: 20px;
    color: ${props => props.theme.mainRed};
  }

  .post-buttons {
    position: absolute;
    right: 0;
    top: 4px;

    > button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      margin-right: 4px;
      outline: transparent;

      &:hover {
        color: ${props => props.theme.nBlue};
      }
    }
  }
`;

const UserActions = styled.div`
  position: relative;

  > button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      outline: transparent;

      &:hover {
        color: ${props => props.theme.nBlue};
      }
    }
`;

const TagWrapper = styled.div`
  display: flex;
  font-size: .68rem;
  margin-bottom: 24px;

  > h5 {
    font-size: .68rem;
    margin-right: 8px;
    padding: 3px 0;
    align-self: flex-start;

    > span {
      color: ${props => props.theme.mainRed};
      padding-left: 8px;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  font-size: .68rem;
  margin-top: ${props => props.userTags && '24px'};

  > h4 {
    padding: 3px 8px 0 3px;
  }

  > p {
    display: flex;

    > span {
      display: flex;
    }

    .tag {
      background-color: #444;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
      margin: 2px;
      padding: 2px 4px;

      &:hover {
        box-shadow: 0px 0px 3px white;
      }
    }

    .tag-delete {
      color: ${props => props.theme.mainRed};
      cursor: pointer;
      margin: auto 8px auto 0;
      font-size: 1rem;
    }
  }
`;

const TagInput = styled.div`
  position: absolute;
  ${props => props.userTags ? 'left: 0' : null};
  ${props => props.userTags ? null : 'right: 0'};
  top: 20px;
  display: flex;
`;
