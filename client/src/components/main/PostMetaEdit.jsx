import { useState } from 'react';
import { RedBlueButton, Input, Select } from '../../styles/components';
import { PostMetaEditWrapper } from './styles/postStyles';

const PostMetaEdit = props => {
  const [title, setTitle] = useState(props.post.title);
  const [subtitle, setSubtitle] = useState(props.post.subtitle);
  const [categoryId, setCategoryId] = useState(props.post.categoryId);
  const [isPublic, setIsPublic] = useState(!!props.post.public);

  const { post, categories } = props;

  function handleInputChange({ target }) {
    const { name, value, checked } = target;
    switch (name) {
      case "title":
        return setTitle(value);
      case "subtitle":
        return setSubtitle(value);
      case "isPublic":
        return setIsPublic(checked);
      default:
        setCategoryId(value);
    }
  }

  function clearAll() {
    setTitle('');
    setSubtitle('');
    setCategoryId('');
  }

  function save() {
    const update = { id: post.id };
    if (title !== post.title) update.title = title;
    if (subtitle !== post.subtitle) update.subtitle = subtitle;
    if (categoryId !== post.categoryId) update.categoryId = categoryId;
    if (isPublic !== !!post.public) update.public = isPublic;
    props.save(update);
    props.close();
  }

  function cancelMetaEdit() {
    clearAll();
    props.close();
  }

  return (
    <PostMetaEditWrapper>
      <Input
        full
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
      />

      <Input
        full
        type="text"
        name="subtitle"
        value={subtitle}
        onChange={handleInputChange}
      />

      <div>
        <Select
          name="category"
          onChange={handleInputChange}
          value={categoryId}
        >
          <option value="None">None</option>
          {categories.map((c, i) => {
            if (c.name !== 'None')
              return <option key={`cat-${i}`} value={c.id}>{c.name}</option>
          })}
        </Select>

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

      <div style={{ display: 'flex' }}>
        <RedBlueButton text onClick={save}>
          save
        </RedBlueButton>
        <RedBlueButton text onClick={cancelMetaEdit}>
          cancel
        </RedBlueButton>
      </div>
    </PostMetaEditWrapper>
  )
};

export default PostMetaEdit