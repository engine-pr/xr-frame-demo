function rel2abs (currentUrl, url) {
  if (url.startsWith('/')) {
    return url.substring(1)
  }
  // //////////////////
  var folder
  if (currentUrl.indexOf('/') >= 0) {
    folder = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1)
    if (folder.startsWith('/')) {
      folder = folder.substring(1)
    }
  } else {
    folder = ''
  }
  url = url.trim()
  if (url.startsWith('./')) {
    url = url.substring('./'.length)
  }
  while (url.startsWith('../')) {
    folder = folder.substring(0, folder.length - 1)
    folder = folder.substring(0, folder.lastIndexOf('/') + 1)
    url = url.substring('../'.length)
  }

  return folder + url
}
function abs2rel(currentUrl, url) {
  url = rel2abs(currentUrl, url)
  if (currentUrl.startsWith('/')) {
    currentUrl = currentUrl.substring(1)
  }
  var array = currentUrl.split('/')
  var result = ''
  if (array.length > 1) {
    for (var i = 0; i < array.length - 1; i++) {
      result += '../'
    }
  } else {
    result += './'
  }
  result += url
  return result.toString()
}
export default {
  rel2abs,
  abs2rel
}
