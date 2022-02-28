import React, {useState} from "react";


/**
 * Custom hook that stores and retrieves key/value pairs in localStorage. It also stores the value in state and returns
 * a function that allows the user to update that state.
 * @param key
 * @param value
 * @return {[unknown,setLocalStorage]}
 */
export default function useLocalStorage(key, value) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : value
    } catch (error) {
      return value
    }
  })

  const setLocalStorage = newState => {
    try {
      const newStateValue = typeof newState === "function" ? newState(state) : newState
      setState(newStateValue)
      window.localStorage.setItem(key, JSON.stringify(newStateValue))
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`)
    }
  }

  return [state, setLocalStorage]
}
