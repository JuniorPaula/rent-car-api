import os from 'os'
import cluster from 'cluster'

function runPrimaryProccess() {
  const cpus = os.cpus().length * 2
  console.log(`Primary ${process.pid} is running`)
  console.log(`Forking Server with ${cpus} procceses\n`)

  for (let index = 0; index < cpus; index++) {
    cluster.fork()

    cluster.on('exit', (worker, code) => {
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log(
          `Worker ${worker.process.pid} died... scheduling another one!`,
        )
        cluster.fork()
      }
    })
  }
}

async function runWorkerProccess() {
  await import('./server.js')
}

cluster.isPrimary ? runPrimaryProccess() : runWorkerProccess()
