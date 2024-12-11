const db = require('./db');
const util = require('./util');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    view : (req, res) => { // 메인 페이지
        var context = {
            body : "notice.ejs",
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    },  
    detail : (req, res) => { // 상세 페이지
        var notid = req.params.noticeId
        db.query(`select * from notice where noticeid = ?`,
            [notid], (err, notice) => {
                if (err) return util.showerror(req, res, err);
                var context = {
                    body : "notice.ejs",
                    notice : notice,
                }
                req.app.render("mainFrame", context, (err, html) => {
                    if (err) return util.showerror(req, res, err);
                    res.end(html);
                })
            }
        )
    },  
    create : (req, res) => { // 공지 생성
        var context = {
            body : "noticeCU.ejs",
            CU : "C"
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    },
    create_process : (req, res) => {
        var post = req.body;
        var sntTitle = sanitizeHtml(post.title);
        var sntDes = sanitizeHtml(post.description);
        db.query(`insert into qna(title, description, date) values(?, ?, ?)`,
            [sntTitle, sntDes, util.dateOfEightDigit()], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/notice/view');
            }
        )
    },
    update : (req, res) => { // 공지 수정
        var notid = req.params.noticeid;
        db.query(`select * from notice where noticeid = ?`,
            [notid], (err, notice) => {
                if (err) return util.showerror(req, res, err);
                var context = {
                    body : "noticeCU.ejs",
                    CU : "U",
                    notice : notice
                }
                req.app.render("mainFrame", context, (err, html) => {
                    if (err) return util.showerror(req, res, err);
                    res.end(html);
                })
            }
        )
    },
    update_process : (req, res) => {
        var post = req.body;
        var sntnotid = sanitizeHtml(post.noticeid);
        var sntTitle = sanitizeHtml(post.title);
        var sntDes = sanitizeHtml(post.description);
        db.query(`update qna set title = ?, description = ? where noticeid = ?`,
            [sntTitle, sntDes, sntnotid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/notice/view');
            }
        )
    },
    delete : (req, res) => {
        var notid = req.params.noticeId;
        db.query(`delete from qna where noticeid = ?`,
            [notid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/notice/view');
            }
        )
    }
}