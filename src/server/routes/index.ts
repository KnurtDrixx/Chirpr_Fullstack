import * as express from 'express';
import chirpevent from './chirpevent';




const router = express.Router();

router.use('/chirpevent', chirpevent);

export default router;