import styled from 'styled-components';

export const RedBlueButton = styled.button`
  background: #181818;
  border: 1px solid ${props => props.theme.mainRed};
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${props => props.theme.mainRed};
  color: ${props => props.theme.nBlue};
  cursor: pointer;
  font-weight: bold;
  margin: 0 12px;
  outline: transparent;
  ${props => props.height ? `height: ${props.height}px` : ''};
  ${props => props.width ? `min-width: ${props.width}px` : ''};
  display: flex;
  ${props => props.text && 'padding: 4px 8px' };
  > i {
    display: block;
    align-self: center;
    margin: auto;
  }
`;

export const Label = styled.label`
  width: 100%;
  display: block;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  height: ${props => props.height ? `${props.height}px` : '32px'};
  padding: 4px 8px;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.mainRed};
  box-shadow: inset 3px 3px 2px #777,
    inset -3px -3px 2px #fff;
  background-color: #ccc;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  outline: transparent;
  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const Select = styled.select`
  height: ${props => props.height ? `${props.height}px` : '32px'};
  padding: 4px 8px;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.mainRed};
  box-shadow: inset 3px 3px 2px #777,
    inset -3px -3px 2px #fff;
  background-color: #ccc;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  outline: transparent;
  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const TagDelete = styled.span`
  color: ${props => props.theme.mainRed};
  cursor: pointer;
  margin: auto 8px auto 0;
  font-size: 1rem;
`;

export const Tags = styled.p`
  display: flex;

  > span {
    display: flex;

    > span:first-of-type {
      background-color: #444;
      color: white;
      border-radius: 3px;
      display: inline-block;
      margin: auto 2px;
      padding: 3px 6px;
      cursor: pointer;
    }

    > span:last-of-type {
      color: ${props => props.theme.mainRed};
      cursor: pointer;
      margin: 0 8px 2px 1px;
      font-size: 1.2rem;
    }
  }
`;

export const SearchButtons = styled.div`
  margin-left: 16px;
  margin-top: 16px;

  > button {
    background: #111;
    border: 1px solid ${props => props.theme.nGreen};
    border-radius: 5px;
    box-shadow: 4px 4px 4px ${props => props.theme.nGreen}77;
    color: ${props => props.theme.nGreen};
    cursor: pointer;
    font-weight: bold;
    margin-right: 16px;
    outline: transparent;
    padding: 6px 12px;
    min-width: 80px;
  }

  > button:nth-child(2) {
    border: 1px solid ${props => props.theme.nBlue};
    box-shadow: 4px 4px 4px ${props => props.theme.nBlue}77;
    color: ${props => props.theme.nBlue};
  }

  > button:last-of-type {
    border: 1px solid ${props => props.theme.nRed};
    box-shadow: 4px 4px 4px ${props => props.theme.nRed}77;
    color: ${props => props.theme.nRed};
    margin-right: 0;
  }
`;