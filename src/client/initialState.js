import { List, Map } from "immutable";

export default {
    app: Map({
      size: 200,
      tag: 'art',
      tags: List()
    }),

    register: Map({
      users: List(),
      username: '',
      password: '',
      location: Map(),
      passeordError: '',
      usernameError: null
    }),

    login: Map({
      username:'',
      password: '',
      loginError: null,
      location: null,
      loginSuccess: false
    }),
    chains: Map({
      chains: List(),
      tStamp: 0,
      toEdit:null,
      activeImage:""
    }),
    home: Map({
      userOrRestaurantTofind: null, 
      searchError: null,
      searchSuccess: null,
      isLoading: false,
      results: [],
    }),
    edit: Map({
      users: List(),
      isExist: null,
      userToSave: null,
      locationToSave: null,
      updateSuccess: false,
      redirect: false
    }),
    advanceSearch: Map({
      searchBy: 'searchByBoth',
      searchSuccess: false,
      searchError: false,
      name: null,
      location: null,
      average: 0,
      closerBetter: 50
    })
};
