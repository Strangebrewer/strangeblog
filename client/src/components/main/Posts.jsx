import { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';
import { setSearchCriteria, setCount } from '../../redux/actions/otherActions';
import { getBasicSearchCriteria } from '../../utils/halp';

import Post from './Post';

const Posts = props => {
  const { admin, friend } = props;
  const { skip, take } = props.criteria;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.listPosts(getBasicSearchCriteria());
      } else {
        result = await props.listPublicPosts(getBasicSearchCriteria());
      }
      props.setSearchCriteria(getBasicSearchCriteria());
      props.setCount(result.count);
    })();
  }, [admin, friend]);

  async function nextTenPosts() {
    const plus10 = skip + 10;
    if (admin || friend) {
      await props.listPosts({ ...props.criteria, skip: plus10 }, true);
    } else {
      await props.listPublicPosts({ ...props.criteria, skip: plus10 }, true);
    }
    props.setSearchCriteria({ ...props.criteria, skip: plus10 });
  }

  return (
    <Wrapper>
      {props.posts && props.posts.map((post) => {
        return (
          <Post
            key={`post-${post.id}`}
            post={post}
            search={props.search}
          />
        )
      })}
      {(props.count >= (skip + take)) && <button onClick={nextTenPosts}>Load More...</button>}
    </Wrapper >
  )
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    count: state.count,
    friend: state.user.acl && state.user.acl.includes('friend'),
    posts: state.posts,
    criteria: state.criteria
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts,
  setCount,
  setSearchCriteria
};

export default connect(mapPropsToState, mapDispatchToState)(Posts);

const Wrapper = styled.main`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;
