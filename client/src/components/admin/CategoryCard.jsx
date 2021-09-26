import { useState } from 'react';
import styled from 'styled-components';

const CategoryCard = props => {
  const [categoryInput, setCategoryInput] = useState('');
  const [editable, setEditable] = useState(false);

  const { category, openDeleteModal, save } = props;

  function handleInputChange({ target }) {
    const { value } = target;
    setCategoryInput(value);
  }

  function toggleEdit() {
    if (!editable) setCategoryInput(category.name);
    else setCategoryInput('');
    setEditable(!editable);
  }

  async function saveCategory(event) {
    event.preventDefault();
    await save({
      id: category.id,
      name: categoryInput
    });
    setEditable(false);
  }


  return (
    <Card>
      {editable
        ? (
          <form onSubmit={saveCategory}>
            <input
              type="text"
              name="categoryInput"
              value={categoryInput}
              onChange={handleInputChange}
              autoFocus
            />
            <input type="submit" hidden />
          </form>
        ) : (
          <h2>{category.name}</h2>
        )}
      <div>
        <button onClick={toggleEdit}>
          {editable
            ? <i className="fas fa-undo" />
            : <i className="far fa-edit" />}
        </button>

        <button
          onClick={() => openDeleteModal(category.id)}
          disabled={category.posts && category.posts.length}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </Card>
  );
};

export default CategoryCard;

const Card = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin: 12px auto;

  > h2, > form input {
    height: 24px;
    font-size: 1.2rem;
  }

  > form input {
    border: none;
    padding: 0 0 3px 0;
    background-color: transparent;
    border-bottom: 1px solid #222;
    color: ${props => props.theme.text};
    font-weight: 300;
    font-family: Roboto;
      outline: transparent;
  }

  > div > button {
    background-color: transparent;
    outline: transparent;
    border: none;
    color: ${props => props.theme.text};
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.nBlue};
    }

    &:disabled {
      color: #777;
      cursor: default;
    }
  }
`;