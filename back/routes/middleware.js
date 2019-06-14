exports.isLoggedIn = ( req, res, next) => {
  if(req.isAuthenticated()){
    next()
  }else{
    res.status(401).send('로그인이 필요합니다.')
  }
}

exports.isNotLoggedIn = ( req, res, next) => { /// 로그인 한  유저가 회원가입이나 
  if(!req.isAuthenticated()){
    next()
  }else{
    res.status(401).send('로그인한 유저는 접근할 수 없습니다.')
  }
}
