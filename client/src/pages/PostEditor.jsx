import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Editor from '../components/slate/Editor';
import { Spinner, SpinnerWrap } from '../styles/Elements';

import { getOnePost, savePost } from '../redux/actions/postActions';

const FullPageEditor = props => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState(null);

  const [showTagInput, setShowTagInput] = useState(false);
  const [tagsToAdd, setTagsToAdd] = useState('');

  useEffect(() => {
    (async function () {
      let post = {
        title: '',
        subtitle: '',
        tags: [],
        categoryId: ''
      };
      if (props.match.params.id) {
        post = await props.getOnePost(props.match.params.id);
      }
      setLocalVariables(post);
      setLoading(false);
    })();
  }, []);

  function setLocalVariables(data) {
    setPost(data);
    setTitle(data.title);
    setSubtitle(data.subtitle);
    setTags(data.tags);
    setCategoryId(data.categoryId);
  }

  function canSave() {
    return true;
    // if (
    //   tags !== post.tags
    //   || categoryId !== post.categoryId
    //   || title !== post.title
    //   || subtitle !== post.subtitle
    // ) return true;
    // return false;
  }

  function handleInputChange({ target }) {
    const { name, value } = target;
    if (name === 'categoryId') setCategoryId(value);
    if (name === 'tagsToAdd') setTagsToAdd(value);
    if (name === 'title') setTitle(value);
    if (name === 'subtitle') setSubtitle(value);
  }

  function deleteTag(index) {
    const copy = [...tags];
    copy.splice(index, 1);
    setTags(copy);
  }

  function addNewTags() {
    const toAdd = tagsToAdd.split(',');
    setTags([...tags, ...toAdd]);
    setTagsToAdd('')
    setShowTagInput(false)
  }

  async function save(bodyText) {
    setSaving(true);
    const update = {
      tags,
      categoryId,
      title,
      subtitle
    };
    if (post.id) update.id = post.id;
    if (bodyText) update.body = bodyText;
    const savedPost = await props.savePost(update, true);
    setLocalVariables(savedPost);
    setTimeout(() => setSaving(false), 1200);
  }

  function cancel() {
    const { state } = history.location;
    if (state && state.from) {
      history.push(state.from);
    } else {
      history.push('/');
    }
  }

  return (
    <PageWrapper>
      {saving && (
        <SpinnerWrap>
          <Spinner size="120" border="10" style={{ zIndex: '999' }} />
        </SpinnerWrap>
      )}

      {!loading && (
        <>
          <InputWrapper>
            <label htmlFor="title-edit">Title:</label>
            <input
              id="title-edit"
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="subtitle-edit">Subtitle:</label>
            <input
              id="subtitle-edit"
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={handleInputChange}
            />
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="category-select">Category:</label>
            <select name="categoryId" id="category-select" value={categoryId} onChange={handleInputChange}>
              {props.categories.map((c, i) => {
                return <option value={c.id} key={`category-${i}`}>{c.name}</option>
              })}
            </select>
          </InputWrapper>

          {/* <div> */}
          <InputWrapper>
            <label htmlFor="tags-edit">Tags: {!showTagInput ? <AddTag onClick={() => setShowTagInput(true)}>+</AddTag> : null}</label>
            {showTagInput
              ? (
                <div>
                  <input name="tagsToAdd" value={tagsToAdd} type="text" onChange={handleInputChange} />
                  <button onClick={addNewTags}>add</button>
                  <button onClick={() => setShowTagInput(false)}>cancel</button>
                </div>
              ) : null}
          </InputWrapper>
          
          <InputWrapper>
            {tags && tags.map((t, i) => {
              let comma = i < tags.length - 1 ? ',' : '';
              return <Tag key={`tag-${i}`}>{t} <span onClick={() => deleteTag(i)}>x</span>{comma}</Tag>
            })}
          </InputWrapper>
          {/* </div> */}

          <Editor post={post} canSave={canSave()} save={save} cancel={cancel} />
        </>
      )}
    </PageWrapper>
  );
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = {
  getOnePost,
  savePost
};

export default connect(mapStateToProps, mapDispatchToProps)(FullPageEditor);

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding-top: 50px;
`;

const InputWrapper = styled.div`
  margin: auto;
  width: 900px;
`;

const Tag = styled.p`
  span {
    color: red;
    cursor: pointer;
    font-size: 12px;
  }
`;

const AddTag = styled.span`
  color: green;
  cursor: pointer;
  font-size: 12px;
`;