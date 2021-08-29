import { connect } from 'react-redux';
import styled from 'styled-components';

function Main(props) {

  return (
    <div>Eat Shit, Honkey!@</div>
  )
}

function mapPropsToState(state) {
  return {}
}

const mapDispatchToState = {};

export default connect(mapPropsToState, mapDispatchToState)(Main);