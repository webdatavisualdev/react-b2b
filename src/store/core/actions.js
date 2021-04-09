import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'CORE',
};

export const coreActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    GET_LANGUAGES_SUCCESS: undefined,
    SET_LOCALE: undefined,
    SET_FORM_SUBMIT: undefined,
    TOGGLE_DRAWER_OPEN: undefined,
    SET_CURRENCY: undefined,
    TOGGLE_DRAWER: undefined
  },
  options,
);

const getLanguages = () => async (dispatch, getState) => {
  try {
    const { languages } = getState().core;
    if (languages && languages.length) {
      return;
    }

    dispatch(coreActions.setLoading(true));
    const data = await API.getLanguages();

    dispatch(coreActions.getLanguagesSuccess(data));
  } catch (error) {
    dispatch(coreActions.setFailure(error));
  }
}

const setLanguage = (payload) => async (dispatch) => {
  try {
    dispatch(coreActions.setLoading(true));
    const data = await API.setLanguage(payload);

    dispatch(coreActions.setLocale(data.lang));
  } catch (error) {
    dispatch(coreActions.setFailure(error));
  }
}

const showCartDrawer = (payload) => (dispatch) =>{
  dispatch(coreActions.toggleDrawer(payload));
}

export default {
  ...coreActions,
  showCartDrawer,
  getLanguages,
  setLanguage,
}
