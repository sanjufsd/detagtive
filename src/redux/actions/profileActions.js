import { func } from "prop-types";

export const ADD_PROFILE = 'ADD_PROFILE'
export const DELETE_PROFILE = 'DELETE_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const SELECTED_PROF = 'SELECTED_PROF'
export function addProfile(profile) {
  return {
    type: ADD_PROFILE,
    payload: profile
  };
}

export function deleteProfile(Id) {
  return {
    type: DELETE_PROFILE,
    payload: Id
  };
}

export function updateProfile(profile) {
  return {
    type: UPDATE_PROFILE,
    payload: profile
  };
}

export function selectedProf(profile){
  return{type: SELECTED_PROF,
  payload: profile
}
}
