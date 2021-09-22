import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Editor from '../components/slate/Editor';
import Navbar from '../components/Navbar';
import { Spinner, SpinnerWrap } from '../styles/Elements';
import {
  RedBlueButton,
  Label,
  Input,
  Select,
  Tags
} from '../styles/components';

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
  const [isPublic, setIsPublic] = useState(false);

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
    setIsPublic(!!data.public);
  }

  function handleInputChange({ target }) {
    const { name, value, checked } = target;
    if (name === 'categoryId') setCategoryId(value);
    if (name === 'tagsToAdd') setTagsToAdd(value);
    if (name === 'title') setTitle(value);
    if (name === 'subtitle') setSubtitle(value);
    if (name === 'isPublic') setIsPublic(checked);
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

  async function save(bodyText, saveAndClose) {
    setSaving(true);
    const none = props.categories.find(cat => cat.name === 'None');
    const update = {
      tags,
      categoryId: categoryId ? categoryId : none.id,
      title,
      subtitle,
      public: isPublic
    };
    if (post.id) update.id = post.id;
    if (bodyText) update.body = bodyText;
    const savedPost = await props.savePost(update, true);
    if (!saveAndClose) {
      setLocalVariables(savedPost);
      setTimeout(() => setSaving(false), 1200);
    }
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
    <Wrapper>
      {saving && (
        <SpinnerWrap>
          <Spinner size="120" border="10" style={{ zIndex: '999' }} />
        </SpinnerWrap>
      )}

      <Navbar />

      {!loading && (
        <Main>
          <YeOldeInputs>
            <div>
              <div>
                <Label htmlFor="title-edit">Title:</Label>
                <Input
                  full
                  id="title-edit"
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="subtitle-edit">Subtitle:</Label>
                <Input
                  full
                  id="subtitle-edit"
                  type="text"
                  name="subtitle"
                  value={subtitle}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div>
                <Label htmlFor="category-select">Category:</Label>
                <Select
                  full
                  name="categoryId"
                  id="category-select"
                  value={categoryId}
                  onChange={handleInputChange}
                >
                  {props.categories.map((c, i) => {
                    return <option value={c.id} key={`category-${i}`}>{c.name}</option>
                  })}
                </Select>
              </div>

              <div>
                <label>public: </label>
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={isPublic}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </YeOldeInputs>

          <YeOldeTagInputs>
            <div>
              <TagWrapper>
                <h4>Tags<span>:</span>&nbsp;
                  <AddTag onClick={() => setShowTagInput(!showTagInput)} red={showTagInput}>
                    {showTagInput ? '-' : '+'}
                  </AddTag>
                </h4>
                <Tags>
                  {tags.map((tag, i) => (
                    <span key={`tag-${i}`}>
                      <span className="tag">{tag}</span>
                      {props.admin && <span onClick={() => deleteTag(i)}>&times;</span>}
                    </span>
                  ))}
                </Tags>
              </TagWrapper>
            </div>

            {showTagInput
              ? (
                <div className="tag-input-wrapper">
                  <Input height="26" name="tagsToAdd" value={tagsToAdd} type="text" onChange={handleInputChange} />
                  <RedBlueButton onClick={addNewTags}>add</RedBlueButton>
                  <RedBlueButton onClick={() => setShowTagInput(false)}>cancel</RedBlueButton>
                </div>
              ) : null}
          </YeOldeTagInputs>

          <Editor post={post} save={save} cancel={cancel} />
        </Main>
      )}
    </Wrapper>
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

export const Wrapper = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  width: 900px;
  margin: auto;
  padding-top: 50px;
`;

const YeOldeInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  > div {
    display: flex;
    width: 100%;

    > div {
      margin: auto;
      width: 48%;

      label {
        color: white;
      }
    }
  }
`;

const YeOldeTagInputs = styled.div`
  width: 800px;
  margin: auto;
  display: flex;
  position: relative;

  .tag-input-wrapper {
    position: absolute;
    top: 40px;
    width: 360px;
    display: flex;
    align-items: center;

    > input {
      margin-bottom: 0;
    }

    > button {
      margin: 0 4px;
      padding: 4px 8px;
    }
  }
`;

const AddTag = styled.span`
  color: ${props => props.red ? 'red' : 'green'};
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
`;

const TagWrapper = styled.div`
  display: flex;
  font-size: .68rem;
  margin: 12px 0 6px 0;

  > h4 {
    color: white;
    font-size: 16px;
    padding: 3px 8px;
  }
`;