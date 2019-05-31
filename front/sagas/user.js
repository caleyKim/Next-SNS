/* eslint-disable require-yield */
import { all, takeLatest, call, put, takeEvery, fork, delay } from 'redux-saga/effects';
import axios from 'axios';
import { SIGN_UP_REQUEST,SIGN_UP_FAILURE,LOG_IN_REQUEST,LOG_IN_FAILURE, LOG_IN_SUCCESS, SIGN_UP_SUCCESS  } from '../reducers/user';

function* loginAPI(){

}
function* login(){
  try{
    // yield call(loginAPI);
    yield delay(2000);
    yield put({
      type : LOG_IN_SUCCESS
    })
  } catch(e){
    console.error(e);
    yield put({
      type : LOG_IN_FAILURE
    })
  }
}
function* watchLogin(){
  yield takeEvery(LOG_IN_REQUEST, login)
}




function* signUpAPI(signUpData){
  return axios.post('http://localhost:6060/api/user',signUpData)
}


function* signUp(action){
  try{
    yield call(signUpAPI,action.data);
    yield put({
      type : SIGN_UP_SUCCESS
    })
  } catch(e){
    console.error(e);
    yield put({
      type : SIGN_UP_FAILURE,
      error : e
    })
  }
}
function* watchSignUp(){
  yield takeEvery(SIGN_UP_REQUEST, signUp)
}


export default function* userSaga(){
  yield all([
    // watchHello(),
    fork(watchLogin),
    fork(watchSignUp)
  ])
}