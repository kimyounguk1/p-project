const express = require('express');
const router = express.Router();

var user = require('../lib/user');

/**user
 * id       password    email   name    class
 * 아이디(PK)비밀번호    이메일   이름    클래스(기본값 USR)
 */

// 웹 관리자 전용으로 할거면 class는 필요 없을듯?

router.get('/view', (req, res) => {             // 사용자 목록
    user.view(req, res);
})

router.get('/create', (req, res) => {           // 사용자 생성
    user.create(req, res);
})

router.post('/create_process', (req, res) => {  // 생성 프로세스
    user.create_process(req, res);
})

router.get('/update/:userId', (req, res) => {   // 사용자 수정
    user.update(req, res);
})

router.post('/update_process', (req, res) => {  // 수정 프로세스
    user.create_process(req, res);
})

router.get('/delete/:userId', (req, res) => {   // 사용자 삭제
    user.delete(req, res);
})

module.exports = router;