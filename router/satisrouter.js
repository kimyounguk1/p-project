const express = require('express');
const router = express.Router();

var satis = require('../lib/satis');

/**feedback
 * feedback_num     satisfaction    stis_des                user_id     date
 * 번호(PK)         만족도           만족도에 대한 상세 이유   작성자      작성일
 */

router.get('/view', (req, res) => {             // 만족도 목록
    satis.view(req, res);
})

router.get('/delete/:satisId', (req, res) => {  // 만족도 삭제
    satis.delete(req, res);
})

module.exports = router;