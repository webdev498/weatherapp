import * as Actions from "../actions/LocationActions";

const initialState = {
  location : {
      city: '--',
      region: '--'
  }
}

export const locationInfo = (state = initialState, action) => {

    switch (action.type) {
        case Actions.LOCATION_FETCHED:
            return Object.assign({}, state, {
                location : action.address
            })
        default:
            return state;
    }
}

export const locationFetched = (address) => ({
  type: Actions.LOCATION_FETCHED,
  address
});