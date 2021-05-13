import { Router } from 'express'

const router = Router()
const i18nString = '/i18n'

router.get(i18nString, (req, res, next)=> {
    console.log('get test')
    res.send('i18n')
})

export default router