import React from 'react';
// import { Button, Card, Icon, Avatar } from 'antd';
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
const dummy = {
  isLoggedIn : true,
  imagePaths : [],
  mainPosts : [{
    User : {
      id : 1,
      nickname : '김경현',
      content : '첫번째 게시글'
    },
    img : 'http://image.itdonga.com/files/2013/05/29/1_4_1.jpg'
  }]
}

const Home = () => {
  return (
    <>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} data={c}/>
        )
      })}
    </>
  );
}

export default Home;