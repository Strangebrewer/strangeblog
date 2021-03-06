import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import InlineEditor from '../slate/InlineEditor';
import Modal from '../Modal';
import PostMetaEdit from './PostMetaEdit';
import { RedBlueButton, Input, Tags } from '../../styles/components';
import {
  destroyPost,
  getOnePost,
  getOnePublicPost,
  savePost,
  saveUserTags
} from '../../redux/actions/postActions';

import {
  Wrapper,
  MetaData,
  Category,
  UserActions,
  DateWrapper,
  TagWrapper,
  TagInput
} from './styles/postStyles';

const Post = props => {
  const history = useHistory();
  const [newTags, setNewTags] = useState('');
  const [newUserTags, setNewUserTags] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [showUserTagInput, setShowUserTagInput] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMetaEdit, setShowMetaEdit] = useState(false);

  const {
    post,
    search,
  } = props;

  function handleInputChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case "newTags":
        return setNewTags(value);
      default:
        return setNewUserTags(value);
    }
  }

  function save(update) {
    props.savePost(update);
  }

  function goTo(route, state) {
    history.push(route, state)
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
    setNewTags('');
  }

  function addUserTags() {
    const tags = post.userTags ? [...post.userTags] : [];
    const toAdd = newUserTags.split(',');
    toAdd.forEach(tag => {
      tags.push(tag.trim());
    });
    props.saveUserTags(props.user.id, { id: post.id, tags });
    post.userTags = tags;
    setShowUserTagInput(false);
    setNewUserTags('');
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
    if (showMetaEdit) setShowMetaEdit(false);
    setShowTagInput(!showTagInput);
  }

  function toggleUserTagInput() {
    setShowUserTagInput(!showUserTagInput);
  }

  function closeModal() {
    setShowDeleteModal(false);
  }

  function metaEditOpen() {
    if (showTagInput) setShowTagInput(false);
    setShowMetaEdit(!showMetaEdit);
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
        {showMetaEdit ? (
          <PostMetaEdit
            categories={props.categories}
            post={post}
            close={() => setShowMetaEdit(false)}
            save={save}
          />
        ) : (
          <>
            <h2
              className="post-title"
              onClick={() => goTo(`/${post.id}`)}
              style={{ cursor: 'pointer' }}
            >
              {post.title}
            </h2>
            <h4 className="post-subtitle">{post.subtitle}</h4>
          </>
        )}

        {post.category && post.category.name !== 'None' ? <Category>Category: {post.category.name}</Category> : null}

        {props.admin && (
          <div className="post-buttons">
            <button onClick={metaEditOpen}>
              <i className="far fa-edit" title="edit title and etc" />
            </button>
            <button onClick={openSingleEdit}>
              <i className="fas fa-link" title="open in editor" />
            </button>
            <button onClick={() => setShowDeleteModal(true)}>
              <i className="far fa-trash-alt" title="delete this post" />
            </button>
            <button onClick={toggleTagInput}>
              <i className="fas fa-tag" title="add tag" />
            </button>
            {showTagInput && (
              <TagInput>
                <Input
                  height="24"
                  type="text"
                  name="newTags"
                  value={newTags}
                  onChange={handleInputChange}
                  placeholder="comma-separated tags..."
                  autoFocus
                />
                <RedBlueButton width="40" onClick={addTags}>
                  <i className="fas fa-plus" />
                </RedBlueButton>
              </TagInput>
            )}
          </div>
        )}
      </MetaData>

      <DateWrapper>
        <h5>{format(new Date(post.createdAt), 'MMM dd, yyyy - hh:mm aaaa')} {post.tags.length ? <span>-</span> : null}</h5>
        {
          post.tags.length
            ? (
              <TagWrapper>
                <h4>Tags<span>:</span> </h4>
                <Tags>
                  {post.tags.map((tag, i) => (
                    <span key={`tag-${i}`}>
                      <span className="tag" onClick={() => search({ tags: tag })}>{tag}</span>
                      {props.admin && <span className="tag-delete" onClick={() => removeTag(i)}>&times;</span>}
                    </span>
                  ))}
                </Tags>
              </TagWrapper>
            ) : null
        }
      </DateWrapper>

      <InlineEditor
        post={post}
        save={save}
        isAdmin={props.admin}
        edit={openSingleEdit}
      />

      <TagWrapper userTags>
        {post.userTags && post.userTags.length
          ? (
            <>
              <h4>My Tags<span>:</span> </h4>
              <Tags>
                {post.userTags.map((tag, i) => (
                  <span key={`my-tag-${i}`}>
                    <span className="tag" onClick={() => search({ tags: tag, byUserTag: true })}>{tag}</span>
                    <span className="tag-delete" onClick={() => removeUserTag(i)}>&times;</span>
                  </span>
                ))}
              </Tags>
            </>
          ) : null}
      </TagWrapper>

      {props.authenticated && (
        <UserActions>
          <button onClick={toggleUserTagInput}>
            <i className="fas fa-tag" title="add tags" />
          </button>

          {showUserTagInput && (
            <TagInput userTags submit={addUserTags}>
              <Input
                height="26"
                type="text"
                name="newUserTags"
                value={newUserTags}
                onChange={handleInputChange}
                placeholder="comma-separated tags..."
                autoFocus
              />
              <RedBlueButton width="40" onClick={addUserTags}>
                <i className="fas fa-plus" />
              </RedBlueButton>
            </TagInput>
          )}
        </UserActions>
      )}
    </Wrapper>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    friend: state.user.acl && state.user.acl.includes('friend'),
    authenticated: state.auth.authenticated,
    user: state.user,
    categories: state.categories
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
