import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { post } from '../api';

function Main(props) {

  useEffect(() => {
    async function getPosts() {
      const publicPosts = await post.listPublicPosts();
      console.log('publicPosts:::', publicPosts);
    }

    getPosts();
  }, []);

  return (
    <div style={{ fontSize: '36px' }}>Eat Shit, Honkey!@</div>
  )
}

function mapPropsToState(state) {
  return {}
}

const mapDispatchToState = {};

export default connect(mapPropsToState, mapDispatchToState)(Main);