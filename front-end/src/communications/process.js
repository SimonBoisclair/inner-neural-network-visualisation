export let RESTART_TRAINING = async (body) => {
  console.log("RESTART_TRAINING",body)
  try{
    let url = '/restart'
    let method = "GET" 
    let response = await fetch(url,{method})
    let textResponse = await response.text()
    let parsedResponse = JSON.parse(textResponse)
    // console.log("RESTART_TRAINING RESPONSE",parsedResponse)
    return parsedResponse
  }catch(err){
    let parsedResponse = { errors : ["Can't reach server"]}
    console.log("RESTART_TRAINING ERROR",parsedResponse)
    return parsedResponse
  }
}
