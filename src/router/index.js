import { Router } from 'express'
import fs from 'fs'
const router = Router()



router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('deploy server is fine')
})

router.post('/deploy', (req, res, next)=> {
  const b = Buffer.from(req.body.data)
  const name = req.query.name
  console.log('p', p, 'name', name)
  const output = `deploy/${name}.tar.gz`
  fs.writeFileSync(output, b)
  res.json({
    status: 'ok'
  })

})

export default router