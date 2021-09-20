import * as Source from '../action-types/sourceTypes';

export function sourceReducer(state = [], action) {
  switch (action.type) {
    case Source.SET_ALL_SOURCES:
      return action.payload;
    case Source.ADD_SOURCE_TO_SOURCES:
      return [...state, action.payload];
    case Source.EDIT_SOURCE_IN_SOURCES:
      return state.map(source => {
        if (source.id === action.payload.id) {
          return action.payload;
        }
        return source;
      });
    case Source.DELETE_SOURCE:
      return state.filter(source => source.id !== action.payload);
    default: return state;
  }
}
