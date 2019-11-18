import express from 'express'
const app = express()  
const tf = require('@tensorflow/tfjs-node'); 
var mnist = require('mnist');  
var set = mnist.set(10000, 2000);
var trainingSet = set.training;  
var weights 

var model

async function train() {   
  // Model Architecture
  model = tf.sequential();
  model.add(tf.layers.flatten({ inputShape: [28, 28, 1] }));
  model.add(tf.layers.dense({ units: 100, activation: 'relu' })); // 100 original
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' })); 

  // Model fitting settings
  model.compile({
    optimizer : 'rmsprop',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  
  console.log('Building training data')
  // Build trainData.xs (inputs) as a 4dvector
  let trainData = {}
  let alfa = [] 
  trainingSet.forEach((el, id) => { alfa.push(...el.input) })
  trainData.xs = tf.tensor4d(alfa, [trainingSet.length, 28, 28, 1])

  // Build trainData.labels (outputs) as a 2dvector
  trainData.labels = trainingSet.map((el, id) => { return el.output })
  trainData.labels = tf.tensor2d(trainData.labels)

  console.log('Model starts the fitting process')
  await model.fit(
    trainData.xs,
    trainData.labels,
    {
      batchSize : 500,
      validationSplit: 0.15,
      epochs: 150,
      callbacks: {
        onEpochEnd: (epoch, logs) => {      
          // Extracts the weights from layers and reorder them to be arrays ready for HTML canvas.

          // WEIGHTS FROM LAYER 1
          let weightsLayer1 = model.layers[1].getWeights()[0].arraySync()
          var wghtLay1AsArr = []
          weightsLayer1.forEach((EL, ID) => { //  784 
            EL.forEach((el, id) => { // 100
              if (!wghtLay1AsArr[id]) { wghtLay1AsArr[id] = [] }
              wghtLay1AsArr[id][ID] = el
            })
          })
          weightsLayer1 = tf.tensor(wghtLay1AsArr).reshape([100, 28, 28]).softmax().arraySync()


          // WEIGHTS FROM LAYER 2
          let weightsLayer2 = model.layers[2].getWeights()[0].arraySync()
          var wghtLay2AsArr = []
          weightsLayer2.forEach((EL, ID) => { //  100 
            EL.forEach((el, id) => { // 10
              if (!wghtLay2AsArr[id]) { wghtLay2AsArr[id] = [] }
              wghtLay2AsArr[id][ID] = el
            })
          })
          weightsLayer2 = tf.tensor(wghtLay2AsArr).arraySync()

          
          weights = [
            weightsLayer1, 
            weightsLayer2,
          ] 
        }
      }
    }
  );
}

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
}) 

app.get('/weights', async (req, res) => {  
  res.send(JSON.stringify(weights))
}) 

train() 

app.get('/restart', async (req, res) => { 
  await tf.dispose(model)
  weights = undefined
  train() 
  res.send(JSON.stringify({success : true}))
}) 
  

 