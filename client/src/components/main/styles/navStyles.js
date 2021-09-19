import styled from 'styled-components';

export const Outer = styled.div`
  width: 700px;
  margin: 0 auto 30px auto;
  padding: 30px 0 16px 0;
`;

export const SearchWrapper = styled.div`
  visibility: ${props => props.visiblity};
  opacity: ${props => props.opacity};
  transition: opacity ${props => props.transition};
  display: ${props => props.display};
  padding: 12px 40px;
  z-index: 0;
  margin-top: 12px;

  p {
    font-size: .7rem;
    margin: 4px auto;
    padding: 0 12px;
  }

  .title-search {
    margin-bottom: 12px;
  }

  .tag-category-wrapper {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;

    .tag-search, .category-search {
      width: 48%;
    }
  }

  .date-search {
    .date-inputs {
      margin-top: 4px;
      display: flex;
      justify-content: space-between;
      padding: 0 12px;

      .start-date, .end-date {
        width: 48%;
      }
    }
  }

  .search-buttons {
    display: flex;
    width: 280px;
    justify-content: space-between;
    margin: 30px auto 0 auto;
  }
`;