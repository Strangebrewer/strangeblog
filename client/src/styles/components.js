import styled from 'styled-components';

export const RedBlueButton = styled.button`
  background: #181818;
  border: 1px solid ${props => props.theme.mainRed};
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${props => props.theme.mainRed};
  color: ${props => props.theme.nBlue};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin: 0 12px;
  outline: transparent;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  ${props => props.height ? `height: ${props.height}px` : ''};
  ${props => props.width ? `min-width: ${props.width}px` : ''};
  ${props => props.text && 'padding: 4px 8px'};

  > i {
    align-self: center;
    display: block;
    margin: auto;
  }

  &:hover {
    background-color: ${props => props.theme.nBlue};
    color: ${props => props.theme.nRed};
  }

  &:disabled {
    border: 1px solid ${props => props.theme.mainRed + '99'};
    box-shadow: none;
    color: ${props => props.theme.nBlue + '99'};
    cursor: default;

    &:hover {
      background: #181818;
      color: ${props => props.theme.nBlue + '99'};
    }
  }
`;

export const PurpleGreenButton = styled.button`
  background: #181818;
  border: 1px solid ${props => props.theme.nPurple};
  border-radius: 5px;
  box-shadow: 0px 0px 8px ${props => props.theme.nPurple};
  color: ${props => props.theme.nGreen};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  margin: 0 12px;
  outline: transparent;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  ${props => props.height ? `height: ${props.height}px` : ''};
  ${props => props.width ? `min-width: ${props.width}px` : ''};
  ${props => props.text && 'padding: 4px 8px'};

  > i {
    align-self: center;
    display: block;
    margin: auto;
  }

  &:hover {
    background-color: ${props => props.theme.nGreen};
    color: ${props => props.theme.nPurple};
  }

  &:disabled {
    border: 1px solid ${props => props.theme.nPurple + '99'};
    box-shadow: none;
    color: ${props => props.theme.nGreen + '99'};
    cursor: default;

    &:hover {
      background: #181818;
      color: ${props => props.theme.nGreen + '99'};
    }
  }
`;

export const MainButton = styled.button`
  background: #111;
  border: 1px solid ${props => props.theme[props.color]};
  border-radius: 5px;
  box-shadow: 4px 4px 4px ${props => props.theme[props.color]}77;
  color: ${props => props.theme[props.color]};
  cursor: pointer;
  font-weight: bold;
  margin-right: 16px;
  min-width: 80px;
  outline: transparent;
  padding: 6px 12px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme[props.color]};
    color: ${props => props.color === 'nGreen' || props.color === 'nYellow' ? 'black' : 'white'};
  }

  &:disabled {
    background-color: ${props => props.theme.text + '44'};
    border: 1px solid ${props => props.theme.text + '99'};
    box-shadow: none;
    color: ${props => props.theme.bg + '99'};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  width: 100%;
`;

export const Input = styled.input`
  background-color: #ccc;
  border: 2px solid ${props => props.theme.mainRed};
  border-radius: 4px;
  box-shadow: inset 3px 3px 2px #777,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  height: ${props => props.height ? `${props.height}px` : '32px'};
  outline: transparent;
  padding: 4px 8px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const Select = styled.select`
  background-color: #ccc;
  border-radius: 4px;
  border: 2px solid ${props => props.theme.mainRed};
  box-shadow: inset 3px 3px 2px #777,
  inset -3px -3px 2px #fff;
  color: ${props => props.theme.nBlue};
  font-weight: 700;
  height: ${props => props.height ? `${props.height}px` : '32px'};
  outline: transparent;
  padding: 4px 8px;

  ${props => props.full
    ? 'width: 100%; display: block; margin-bottom: 6px;'
    : ''
  }
`;

export const Form = props => {
  return (
    <StyledForm onSubmit={props.submit} style={props.style}>
      {props.children}
      <input hidden type="submit" />
    </StyledForm>
  )
};

export const StyledForm = styled.form`

`;

export const TagDelete = styled.span`
  color: ${props => props.theme.mainRed};
  cursor: pointer;
  font-size: 1rem;
  margin: auto 8px auto 0;
`;

export const Tags = styled.p`
  display: flex;

  > span {
    display: flex;
    margin: auto 2px;

    > .tag {
      background-color: #333;
      border-radius: 3px;
      color: white;
      cursor: pointer;
      display: inline-block;
      margin: auto 2px;
      padding: 3px 6px;
    }

    > .tag-delete {
      color: ${props => props.theme.mainRed};
      cursor: pointer;
      font-size: 1.2rem;
      margin: 0 8px 2px 1px;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-left: 16px;
  margin-top: 16px;

  > button:last-of-type {
    margin-right: 0;
  }
`;