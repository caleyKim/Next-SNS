import {all, call } from 'redux-saga/effects';
import axios from 'axios'
import user from './user';
import post from './post';
axios.defaults.baseURL = 'http://localhost:6060/api'
export default function* rootSage(){
  yield all([
    call(user),
    call(post)
  ])
}