export default class Utils {
  /**
   * Test if email is valid
   * @param {String} email 
   */
  static isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  /**
   * Test if website is valid
   * @param {String} website 
   */
  static isWebsiteValid(website) {
    return /^\w{3}\.\w+\.\w{2,3}$/.test(website);
  }
}