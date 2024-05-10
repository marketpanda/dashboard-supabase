import { encode as _encode, decode as _decode } from "./openlocationcode"

export default {
  OpenLocationCode,
  encode: ({ latitude, longitude, codeLength }, callback) => {
    // ?? if (callback) callback(false, result)
    try {
      return _encode(latitude, longitude, codeLength)
    } catch (error) {
      return false // { error }
    }
  },
  decode: plusCode => {
    try {
      return _decode(plusCode)
    } catch (error) {
      return false // { error }
    }
  },
  decodePromise: plusCode =>
    new Promise((resolve, reject) => {
      try {
        const result = _decode(plusCode)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }),
  encodePromise: ({ latitude, longitude, codeLength }) =>
    new Promise((resolve, reject) => {
      try {
        const result = _encode(latitude, longitude, codeLength)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }),
}