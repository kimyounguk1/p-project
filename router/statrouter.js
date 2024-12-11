const express = require('express');
const router = express.Router();

var stat = require('../lib/stat');

/**user_statistics
 * user_stat_num    recycle_count   point   date    user_id
 * 번호(PK)         재활용 횟수      포인트   날짜    사용자
 */

// 아마 유저 통계 DB는 갈아엎어야 할 수도?

router.get('/view', (req, res) => {     // 통계 확인
    stat.view(req, res);
})

module.exports = router;