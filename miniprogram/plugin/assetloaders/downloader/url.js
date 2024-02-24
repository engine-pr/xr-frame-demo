function isCloudURL(url){
  return url.includes("://")
}
function isDataURI(url){
  return url.startsWidth("data://")
}
function isHTTPURL(url){
  return url.startsWidth("http://")
}
module.exports = {
  isCloudURL,
  isDataURI,
  isHTTPURL
  
}