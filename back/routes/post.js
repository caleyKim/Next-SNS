const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../models');
const {isLoggedIn} = require('./middleware')
const router = express.Router();

const upload = multer({
  storage : multer.diskStorage({
    destination(req, file, done){  // 어느 경로에 저장을 할지
      done(null, 'uploads')
    },
    filename(req, file, done ){
      const ext = path.extname(file.originalname) // 여기는 확장자.. png, jpg 등등
      const basename = path.basename(file.originalname, ext) // 여기는 파일명
      done(null, basename + new Date().valueOf() + ext)
    }
  }),
  limits : {filesize : 20 * 1024 * 1024}
})


router.post('/', isLoggedIn, upload.none() ,async (req, res, next) => { // POST /api/post
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content: req.body.content, // ex) '제로초 파이팅 #구독 #좋아요 눌러주세요'
      UserId: req.user.id,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where: { name: tag.slice(1).toLowerCase() },
      })));
      console.log(result);
      await newPost.addHashtags(result.map(r => r[0]));
    }
    if(req.body.image){
      if(Array.isArray(req.body.image)){
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.create({src : image})
        }))
        await newPost.addImage(images)
      }else {
        const image = await db.Image.create({src : req.body.image})
        await newPost.addImage(image)

      }
    }
    // const User = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
      },{
        model : db.Image
      }],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});



router.post('/images', upload.array('image'), (req, res) => {
  res.json(req.files.map(v => v.filename))
});

router.get('/:id/comments', async (req, res, next) => {
  try{
    const post = await db.Post.findOne({ where : { id : req.params.id }})
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where : {
        PostId : req.params.id
      },
      order : [['createdAt', 'ASC']],
      include : [{
        model : db.User,
        attributes : ['id', 'nickname']
      }]
    })
    res.json(comments)
  }catch(e){
    console.error(e)
    next(e)
  }
})

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try{
    const post = await db.Post.findOne({ where : {id : req.params.id}});
    if(!post){
      return res.status(404).send('포스트가 존재하지 않습니다.')
    }
    const newComment = await db.Comment.create({
      PostId : post.id,
      UserId : req.user.id,
      content : req.body.content
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where : {
        id : newComment.id,
      },
      include : [{
        model : db.User,
        attributes : ['id', 'nickname'],
      }],
    });
    return res.json(comment)
  } catch(e){
    console.erorr(e)
    next(e)
  }
})
module.exports = router;