import storageModule from "redux-persist/lib/storage"

const storage = storageModule.default

console.log("storaget =", storage)
console.log("getItem =", storage?.getItem)
console.log("setItem =", storage?.setItem)
console.log("removeItem =", storage?.removeItem)