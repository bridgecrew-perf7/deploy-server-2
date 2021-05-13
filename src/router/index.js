import { Router } from 'express'
import i18n from './i18n.js'
const router = Router()
router.use('/', i18n)

router.get('/test', (req, res, next)=> {
    console.log('get test')
    res.send('deploy server is fine')
})

export default router