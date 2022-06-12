const initialStore = {
  users: [],
  single_user: [],
  loading: false,
  single_loading: false,
}

function reducer(state = initialStore, action) {
  if (action.type === 'SET_LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'SET_USERS') {
    return {
      ...state,
      users: [...state.users, ...action.payload],
      loading: false,
    }
  }
  if (action.type === 'SET_SINGLE_LOADING') {
    return { ...state, single_loading: true }
  }
  if (action.type === 'SET_SINGLE_USER') {
    return { ...state, single_user: action.payload, single_loading: false }
  }
  return state
}

export default reducer
