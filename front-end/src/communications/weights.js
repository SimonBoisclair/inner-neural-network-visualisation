export let GET_WEIGHTS = async (body) => {
  console.log("GET_WEIGHTS",body)
  try{
    let url = '/weights'
    let method = "GET" 
    let response = await fetch(url,{method})
    let textResponse = await response.text()
    let parsedResponse = JSON.parse(textResponse)
    // console.log("GET_WEIGHTS RESPONSE",parsedResponse)
    return parsedResponse
  }catch(err){
    let parsedResponse = { errors : ["Can't reach server"]}
    console.log("GET_WEIGHTS ERROR",parsedResponse)
    return parsedResponse
  }
}
