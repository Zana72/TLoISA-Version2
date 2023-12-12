
export function compareObjects(object1, object2, key) {
    
    const obj1 = object1[key].toUpperCase()
    const obj2 = object2[key].toUpperCase()
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
}