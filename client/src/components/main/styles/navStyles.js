import styled from 'styled-components';

export const Outer = styled.div`
  width: 700px;
  margin: 0 auto 30px auto;
  padding: 30px 0 16px 0;
`;

export const SearchWrapper = styled.div`
  display: ${props => props.display};
  margin-top: 12px;
  opacity: ${props => props.opacity};
  padding: 12px 40px;
  transition: opacity ${props => props.transition};
  visibility: ${props => props.visiblity};
  z-index: 0;

  p {
    font-size: .7rem;
    margin: 4px auto;
    padding: 0 12px;
  }

  .title-search {
    margin-bottom: 12px;
  }

  .tag-category-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;

    .tag-search, .category-search {
      width: 48%;
    }
  }

  .date-search {
    .date-inputs {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      padding: 0 12px;

      .start-date, .end-date {
        width: 48%;
      }
    }
  }

  .search-buttons {
    display: flex;
    justify-content: space-between;
    margin: 30px auto 0 auto;
    width: 280px;
  }
`;