/* eslint-disable import/prefer-default-export */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Vue from 'vue';

export const registerUser = async ({ commit }, payload) => {
  try {
    const { email, password } = payload;
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    commit('SET_LOGGED_IN', true);
    return user;
  } catch (error) {
    Vue.prototype.$reporter.error(error);
    throw error;
  }
};

export const signOut = async ({ commit }) => {
  try {
    const data = await firebase.auth().signOut();
    commit('SET_LOGGED_IN', false);
    return data;
  } catch (error) {
    Vue.prototype.$reporter.error(error);
    throw error;
  }
};

export const signIn = async ({ commit }, payload) => {
  try {
    const { email, password } = payload;
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('login', user);
    commit('SET_LOGGED_IN', true);
    return user;
  } catch (error) {
    console.log('error', error);
    // Vue.prototype.$reporter.error(error);
    throw error;
  }
};
