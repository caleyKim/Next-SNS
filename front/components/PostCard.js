import React from 'react';
import {Card, Icon, Button, Avatar} from 'antd'
import PropTypes from 'prop-types'

const PostCard = ({data}) => {
  return (
    <Card
      key={+data.createdAt}
      cover={data.img && <img alt="exmple" src={data.img} />}
      actions={[
        <Icon type="retweet" key="retweet" />,
        <Icon type="heart" key="heart" />,
        <Icon type="message" key="message" />,
        <Icon type="ellipsis" key="ellipsis" />,
      ]}
      extra={<Button>팔로우</Button>}
    >
      <Card.Meta
        avatar={<Avatar>{data.User.nickname[0]}</Avatar>}
        title={data.User.nickname}
        description={data.User.content}
      />
    </Card>
  )
}

PostCard.propTypes = {
  data : PropTypes.shape({
    User : PropTypes.object,
    content : PropTypes.string,
    img : PropTypes.string,
    createAt : PropTypes.object
  })
} 
export default PostCard;
