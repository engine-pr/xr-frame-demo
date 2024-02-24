export function getFunctionName(f){
  const js = f.toString()
  const PREX = "function "
  const name = js.substring(PREX.length,js.indexOf("("))
  return name.trim()
}