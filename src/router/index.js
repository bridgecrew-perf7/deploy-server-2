import { Router } from 'express'
import fs from 'fs'
import { exec } from 'child_process'

const router = Router()

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('deploy server is fine')
})

const createFolder = (deployFolder, name) => {
  const outputFolder = `${deployFolder}/${name}`
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder)
  }
  return outputFolder
}

const runCmd = (cmd) => {
  exec(cmd, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      // if (stderr) {
      //     console.log(`stderr: ${stderr}`);
      //     return;
      // }
      console.log(`run: ${stdout}`);
   });
}


router.post('/deployServer', (req, res, next)=> {
  try {
    const deployFolder = process.env['DEPLOY_FOLDER']
    const b = Buffer.from(req.body.data, 'binary')
    const name = req.query.name
    const outputFolder = createFolder(deployFolder, name)
    const fileName = `${outputFolder}/${name}.tar.gz`
    fs.writeFileSync(fileName, b)
    const cmd = `echo 5566 | sudo -S docker exec ${name} bash restart.sh`
    runCmd(cmd)
    res.json({
      status: 'ok',
      msg: 'upload complete'
    })
  } catch (e) {
    res.json({
      status: 'error',
      msg: e.message
    })
  }
})

router.post('/deployClient', (req, res, next)=> {
  try {
    const deployFolder = process.env['DEPLOY_FOLDER']
    const b = Buffer.from(req.body.data, 'binary')
    const name = req.query.name
    const outputFolder = createFolder(deployFolder, name)
    const fileName = `${outputFolder}/${name}.tar.gz`
    fs.writeFileSync(fileName, b)
    // const cmd = `echo 5566 | sudo -S docker exec ${name} bash restart.sh`
    // runCmd(cmd)
    res.json({
      status: 'ok',
      msg: 'upload complete'
    })
  } catch (e) {
    res.json({
      status: 'error',
      msg: e.message
    })
  }
})

export default router