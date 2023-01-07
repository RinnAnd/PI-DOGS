import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    var info = await axios.get('http://localhost:3001/dogs')
    return dispatch({
        type: 'GET_DOGS',
        payload: info.data
    })
};
}

export const dogsTemper = () => {
  return async (dispatch) => {
    const json = await axios.get('http://localhost:3001/tempers');
    return dispatch({
      type: 'GET_TEMPERS',
      payload: json.data
    })
  }
}

export const postDog = (payload) => {
  return async () => {
    const json = await axios.post('http://localhost:3001/dogs', payload);
    return json
  }
}

export const dogByName = (payload) => {
  return async (dispatch) => {    
    try {
      const json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
      return dispatch({
        type: 'GET_QUERY',
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const dogID = (payload) => {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/dogs/${payload}`)
      return dispatch({
        type: 'GET_ID',
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const orderAlphabetically = (payload) => {
  return {
    type: 'ORDER_ABC',
    payload: payload
  }
}

export const orderWeight = (payload) => {
  return {
    type: 'ORDER_WEIGHT',
    payload: payload
  }
}

export const filterTempers = (payload) => {
  return {
    type: 'FILTER_TEMPERS',
    payload: payload
  }
}

export const filterCreated = (payload) => {
  return {
    type: 'FILTER_CREATED',
    payload: payload
  }
}