/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const registerUser = async ({ commit }, payload) => {
  const { email, password } = payload;
  commit('SET_ERROR', null);
  await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      commit('SET_LOGGED_IN', true);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};

export const signIn = async ({ commit }, payload) => {
  const { email, password } = payload;
  commit('SET_ERROR', null);
  await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      commit('SET_LOGGED_IN', true);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};

export const signOut = async ({ commit }) => {
  commit('SET_ERROR', null);
  await firebase.auth().signOut()
    .then(() => {
      commit('SET_LOGGED_IN', false);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};
