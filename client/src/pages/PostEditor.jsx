import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Editor from '../components/slate/Editor';

import { getOnePost, savePost } from '../redux/actions/postActions';

const FullPageEditor = props => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [tags, setTags] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);
  const [tagsToAdd, setTagsToAdd] = useState('');

  useEffect(() => {
    (async function () {
      let post = await props.getOnePost(props.match.params.id, true);
      setTitle(post.title);
      setSubtitle(post.subtitle);
      setTags(post.tags);
      setCategoryId(post.categoryId);
      setLoading(false);
    })();
  }, []);

  function canSave() {
    if (
      tags !== props.editing.tags
      || categoryId !== props.editing.categoryId
      || title !== props.editing.title
      || subtitle !== props.editing.subtitle
    ) return true;
    return false;
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
    console.log('tagsToAdd:::', tagsToAdd);
    setTags([...tags, tagsToAdd])
    setTagsToAdd('')
    setShowAddTag(false)
  }

  function save(bodyText) {
    console.log('yeah fuck what');
    const update = {
      id: props.editing.id,
      tags,
      categoryId,
      title,
      subtitle
    };
    if (bodyText) update.body = bodyText;
    props.savePost(update, true);
  }

  return (
    <PageWrapper>
      {!loading && (
        <>
          <div>
            <label htmlFor="title-edit">Title:</label>
            <input
              id="title-edit"
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="subtitle-edit">Subtitle:</label>
            <input
              id="subtitle-edit"
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="category-select">Category:</label>
            <select name="categoryId" id="category-select" value={categoryId} onChange={handleInputChange}>
              <option value="">none</option>
              {props.categories.map((c, i) => {
                return <option value={c.id} key={`category-${i}`}>{c.name}</option>
              })}
            </select>
          </div>

          <div>
            <div>
              <label htmlFor="tags-edit">Tags: {!showAddTag ? <AddTag onClick={() => setShowAddTag(true)}>+</AddTag> : null}</label>
              {showAddTag
                ? (
                  <div>
                    <input name="tagsToAdd" value={tagsToAdd} type="text" onChange={handleInputChange} />
                    <button onClick={addNewTags}>add</button>
                  </div>
                ) : null}
            </div>
            <div>
              {tags && tags.map((t, i) => {
                let comma = i < tags.length - 1 ? ',' : '';
                return <Tag key={`tag-${i}`}>{t} <span onClick={() => deleteTag(i)}>x</span>{comma}</Tag>
              })}
            </div>
          </div>
          <Editor post={props.editing} canSave={canSave()} save={save} />
        </>
      )}
    </PageWrapper>
  );
}

function mapStateToProps(state) {
  return {
    editing: state.editing,
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