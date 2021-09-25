import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CategoryCard from './CategoryCard';
import Modal from '../Modal';
import { RedBlueButton, PurpleGreenButton } from '../../styles/components';

import { saveCategory, deleteCategory } from '../../redux/actions/categoryActions';

const Categories = props => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  function handleInputChange({ target }) {
    setCategoryInput(target.value);
  }

  function openDeleteModal(categoryId) {
    setIdToDelete(categoryId);
    setShowDeleteModal(true);
  }

  function toggleNewInput() {
    setShowInput(!showInput);
  }

  async function deleteCategory() {
    console.log('idToDelete:::', idToDelete);
    await props.deleteCategory(idToDelete);
  }

  function save(data) {
    console.log('data:::', data);
    return props.saveCategory(data);
  }

  return (
    <Wrapper>
      <Modal
        show={showDeleteModal}
        close={() => setShowDeleteModal(false)}
        callback={deleteCategory}
        cancelText="Cancel"
        confirmText="Yes"
      >
        Are you sure you want to delete this category?
      </Modal>

      <h2>Categories</h2>
      {props.categories.map(cat => {
        if (cat.name !== 'None')
          return (
            <CategoryCard
              category={cat}
              key={`category-card-${cat.id}`}
              openDeleteModal={openDeleteModal}
              save={save}
            />
          )
      })}

      <RedBlueButton text onClick={toggleNewInput}>
        {showInput ? 'Cancel' : 'New Category'}
      </RedBlueButton>

      {showInput
        ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            save({ name: categoryInput });
            setCategoryInput('');
            setShowInput(false);
          }}>
            <input
              type="text"
              name="categoryInput"
              value={categoryInput}
              onChange={handleInputChange}
              autoFocus
            />
            <input type="submit" hidden />
          </form>
        ) : null}
    </Wrapper>
  );
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    categories: state.categories
  }
}

const mapDispatchToState = {
  deleteCategory,
  saveCategory
};

export default connect(mapPropsToState, mapDispatchToState)(Categories);

const Wrapper = styled.div`
  width: 900px;
  margin: auto;

  > h2 {
    font-size: 2.2rem;
    text-align: center;
    font-weight: 700;
    margin: 24px auto;
    padding-bottom: 12px;
    border-bottom: 2px solid ${props => props.theme.mainRed};
    width: 300px;
  }

  > button {
    min-width: 20px;
    text-align: center;
    margin: auto;
  }



  > form {
    width: 300px;
    margin: 12px auto;

    > input {
      border: none;
      padding: 0 0 11px 0;
      background-color: transparent;
      border-bottom: 1px solid #555;
      color: white;
      font-weight: 300;
      font-family: Roboto;
      height: 32px;
      font-size: 1.2rem;
      width: 200px;
      margin: 24px auto 0 auto;
      display: block;
      outline: transparent;

      &:last-of-type {
        display: none;
      }
    }
  }
`;
