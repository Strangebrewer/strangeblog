import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { listPublicPosts, listPosts } from '../../redux/actions/postActions';

import Post from './Post';

const Posts = props => {
  const [count, setCount] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState(getBasicSearchCriteria());

  const { admin, friend } = props;

  useEffect(() => {
    (async function () {
      let result;
      if (admin || friend) {
        result = await props.listPosts(getBasicSearchCriteria());
      } else {
        result = await props.listPublicPosts(getBasicSearchCriteria());
      }
      setCount(result.count);
    })();
  }, [admin, friend]);

  async function nextTenPosts() {
    const plus10 = searchCriteria.take + 10
    if (admin || friend) {
      await props.listPosts({ ...searchCriteria, take: plus10 });
    } else {
      await props.listPublicPosts({ ...searchCriteria, take: plus10 });
    }
    setSearchCriteria({ ...searchCriteria, take: plus10 });
  }

  async function searchByTag(tag) {
    const search = { ...getBasicSearchCriteria(), tags: tag };
    setSearchCriteria(search);
    let result;
    if (admin || friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    setCount(result.count);
  }

  async function searchByUserTag(tag) {
    const search = { ...getBasicSearchCriteria(), tags: tag, byUserTag: true };
    setSearchCriteria(search);
    let result;
    if (admin || friend) {
      result = await props.listPosts(search);
    } else {
      result = await props.listPublicPosts(search);
    }
    setCount(result.count);
  }

  function getBasicSearchCriteria() {
    return {
      skip: 0,
      take: 10,
      orderBy: 'createdAt',
      order: 'desc'
    };
  }

  return (
    <Wrapper>
      {props.posts && props.posts.map((post) => {
        return (
          <Post
            key={`post-${post.id}`}
            post={post}
            searchByUserTag={searchByUserTag}
            searchByTag={searchByTag}
          />
        )
      })}
      {(count >= searchCriteria.take) && <button onClick={nextTenPosts}>Load More...</button>}
    </Wrapper >
  )
};

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    friend: state.user.acl === "friend",
    posts: state.posts
  }
}

const mapDispatchToState = {
  listPosts,
  listPublicPosts
};

export default connect(mapPropsToState, mapDispatchToState)(Posts);

const Wrapper = styled.main`
  width: 700px;
  margin: auto;
  padding: 20px 0;
`;
