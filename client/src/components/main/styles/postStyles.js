import styled from 'styled-components';

export const Wrapper = styled.article`
  margin-bottom: 60px;
`;

export const MetaData = styled.div`
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
      color: ${props => props.theme.text};
      cursor: pointer;
      margin-right: 4px;
      outline: transparent;

      &:hover {
        color: ${props => props.theme.nBlue};
      }
    }
  }
`;

export const Category = styled.span`
  font-size: .8rem;
  color: #999;
  font-style: italic;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

export const UserActions = styled.div`
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

export const DateWrapper = styled.div`
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

export const TagWrapper = styled.div`
  display: flex;
  font-size: .68rem;
  margin-top: ${props => props.userTags && '24px'};

  > h4 {
    padding: 3px 8px 0 3px;
  }
`;

export const TagInput = props => {
  const { submit, userTags } = props;
  return (
    <TagInputForm onSubmit={submit} userTags={userTags}>
      {props.children}
      <input hidden type="submit" />
    </TagInputForm>
  );
};

const TagInputForm = styled.form`
  position: absolute;
  ${props => props.userTags ? 'left: 0; top: 24px;' : null};
  ${props => props.userTags ? null : 'right: 120px; top: 0;'};
  display: flex;
`;

export const PostMetaEditWrapper = styled.div`
  width: 500px;
  > input, > div > select {
    margin-bottom: 6px;
  }

  > div:first-of-type {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  > div:first-of-type > input,
  > div:first-of-type > select {
    width: 49%;
  }

  > div > button {
    margin: 4px 6px;
    margin-bottom: 12px;
  }
`;