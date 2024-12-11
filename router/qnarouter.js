const express = require('express');
const router = express.Router();

var qna = require('../lib/qna');

/**qna
 * qnaid    title   description     user_id     date    answer
 * 번호(PK) 제목     내용            작성자      작성일   답변내용
 */

router.get('/view', (req, res) => {             // 문의 목록
    qna.view(req, res);
})

router.get('/detail/:qnaId', (req, res) => {    // 문의 상세(답변 입력란 포함)
    qna.detail(req, res);
})

router.post('/upload_answer', (req, res) => {   // 문의 답변(detail에서 작성 한 answer를 DB에 update하는 process)
    qna.upload_answer(req, res);
})

router.get('/delete/:qnaId', (req, res) => {    // 문의 삭제
    qna.delete(req, res);
})


module.exports = router;