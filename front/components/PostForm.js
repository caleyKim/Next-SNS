import React from 'react';
import {Form,Button,Input} from 'antd'

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

const Post = () => {
  return (
    <Form encType="multipart/form-data" style={{margin : '10px 0 20px'}}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{float : 'right'}} htmlType="submit">제출</Button>
      </div>
      <div>
        {dummy.imagePaths.map((v, i)=>{
          return (
            <div key={i} style={{display : 'inline-block'}}>
              <img src={`http://localhost:3000/${v}`} style={{width : '200px'}} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
}
export default Post;