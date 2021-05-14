import { Router } from 'express'
import fs from 'fs'
const router = Router()

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('deploy server is fine')
})

const createFolder = (deployFolder, name) => {
  const outputFolder = `${outputFolder}/${name}`
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder)
  }
}


router.post('/deploy', (req, res, next)=> {
  try {
    const deployFolder = process.env['DEPLOY_FOLDER']
    const b = Buffer.from(req.body.data, 'binary')
    const name = req.query.name
    createFolder(deployFolder, name)
    const fileName = `${outputFolder}/${name}/${name}.tar.gz`
    fs.writeFileSync(fileName, b)
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