import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { MainButton } from '../styles/components';

const Modal = props => {
  const [state, setState] = useState({});

  useEffect(() => {
    if (props.items) {
      const newState = {};
      for (let i = 0; i < props.items.length; i++) {
        const el = props.items[i];
        newState[el.label.toLowerCase()] = '';
      }
      setState(newState);
    }
  }, [props.items])

  function onOutsideClick(e) {
    if (e.target.className.includes('modal-wrapper')) {
      props.close()
    }
  }

  function callback() {
    props.callback(state);
    closeModal();
  }

  function callbackTwo() {
    props.callbackTwo(state);
    closeModal();
  }

  function closeModal() {
    const newState = { ...state };
    for (const item in newState) {
      newState[item] = '';
    }
    setState(newState);
    props.close();
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  }

  return (
    <Wrapper
      className="modal-wrapper"
      onClick={onOutsideClick}
      show={props.show}
    >
      <Content show={props.show}>
        <CloseBtn onClick={props.close}>&times;</CloseBtn>
        <Body>
          {props.items && props.items.map((item, i) => {
            const itemValue = state[item.label.toLowerCase()];
            if (itemValue === '' || (itemValue && itemValue.length)) {
              return (
                <div key={i}>
                  <label style={{ display: 'block', width: '100%', color: 'white', fontSize: '16px', marginBottom: '10px' }}>{item.label}</label>
                  {item.type === 'textarea'
                    ? (
                      <textarea
                        type="text"
                        name={item.label.toLowerCase()}
                        onChange={handleInputChange}
                        value={itemValue}
                        style={{ minWidth: '240px', maxWidth: '240px', marginBottom: '20px' }}
                      />
                    ) : (
                      <input
                        type="text"
                        name={item.label.toLowerCase()}
                        onChange={handleInputChange}
                        value={itemValue}
                        style={{ width: '240px', marginBottom: '20px' }}
                      />
                    )
                  }
                </div>
              )
            }
          })}
          <ChildrenWrapper hasChildren={!!props.children}>
            {props.children}
          </ChildrenWrapper>
          <Buttons>
            {props.callback && (
              <MainButton
                onClick={callback}
                color="nGreen"
              >
                {props.confirmText || 'OK'}
              </MainButton>
            )}
            {props.showCallbackTwo && (
              <MainButton
                onClick={callbackTwo}
                color="nBlue"
              >
                {props.confirmTwoText || 'OK'}
              </MainButton>
            )}
            {props.close && props.callback && (
              <MainButton
                onClick={closeModal}
                color="nRed"
              >
                {props.cancelText || 'Close'}
              </MainButton>
            )}
          </Buttons>
        </Body>
      </Content>
    </Wrapper>
  )
}

export default Modal;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  display: ${props => props.show ? 'flex' : 'none'};
  height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const ChildrenWrapper = styled.div`
  text-align: center;
  line-height: 2;
  margin-bottom: ${props => props.hasChildren ? '12px' : '0px'};
`;

const Content = styled.div`
  animation-duration: 0.4s;
  animation-name: fadein;
  background: linear-gradient(#800080aa, #800080aa),
    linear-gradient(#000, #000);
  border: 1px solid ${props => props.theme.nPurple};
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px #000,
    0 0 4px #000,
    0 0 8px #111,
    0 0 10px #111,
    0 0 20px #222,
    0 0 40px #aaa,
    inset 0 0 100px 30px rgb(0,0,0);
  display: ${props => props.show ? 'block' : 'none'};
  font-size: 1.2rem;
  max-width: 60%;
  min-width: 300px;
  margin: auto;
  padding: 0;
  position: relative;
  img {
    border: 1px solid black;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Body = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 40px;
  z-index: 999;
  color: white;
`;

const Buttons = styled.div`
  text-align: center;
  width: 100%;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  color: lightgrey;
  font-size: 20px;
  outline: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover, &:focus {
    color: #26d4cc;
    cursor: pointer;
    text-decoration: none;
  }
`;