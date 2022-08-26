import Cookie from 'js-cookie'
const isCookie = true
export default {
  set (k, v, doma) {
    if (!v && v !== 0) return this.remove(k)
    if (!isCookie && !!window.sessionStorage && typeof window.sessionStorage.setItem === 'function') {
      window.sessionStorage.setItem(k, v)
    } else {
      Cookie.set(k, v, {domain: doma})
    }
  },
  get (k) {
    if (!isCookie && !!window.sessionStorage && typeof window.sessionStorage.getItem === 'function') {
      return window.sessionStorage.getItem(k)
    } else {
      return Cookie.get(k)
    }
  },
  remove (k) {
    if (!isCookie && !!window.sessionStorage && typeof window.sessionStorage.removeItem === 'function') {
      window.sessionStorage.removeItem(k)
    } else {
      Cookie.remove(k)
    }
  }
}
