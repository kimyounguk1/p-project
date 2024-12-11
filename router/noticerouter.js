const express = require('express');
const router = express.Router();

var notice = require('../lib/notice');

/**notice
 * noticeid     title   description     date
 * 번호(PK)     제목     내용            작성일
 */

router.get('/view', (req, res) => {             // 공지 목록
    notice.view(req, res);
})

router.get('/detail/:noticeId', (req, res) => { // 공지 상세
    notice.detail(req, res);
})

router.get('/create', (req, res) => {           // 공지 생성
    notice.create(req, res);
})

router.post('/create_process', (req, res) => {  // 생성 프로세스
    notice.create_process(req, res);
})

router.get('/update/:noticeId', (req, res) => { // 공지 수정
    notice.update(req, res);
})

router.post('/update_process', (req, res) => {  // 수정 프로세스
    notice.create_process(req, res);
})

router.get('/delete/:noticeId', (req, res) => { // 공지 삭제
    notice.delete(req, res);
})

module.exports = router;