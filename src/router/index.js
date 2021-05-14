import { Router } from 'express'
import fs from 'fs'
const router = Router()

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('deploy server is fine')
})

const createFolder = (name) => {
  const outputFolder = `${outputFolder}/${name}`
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder)
  }
}


router.post('/deploy', (req, res, next)=> {
  const outputFolder = process.env['OUTPUT_FOLDER']
  const b = Buffer.from(req.body.data, 'binary')
  const name = req.query.name
  createFolder(name)
  const fileName = `${outputFolder}/${name}/${name}.tar.gz`
  fs.writeFileSync(fileName, b)
  res.json({
    status: 'ok'
  })

})

export default router