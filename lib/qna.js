const db = require('./db');
const util = require('./util');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    view : (req, res) => { // 메인 페이지
        var context = {
            body : "qna.ejs",
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    },  
    detail : (req, res) => { // 상세 페이지
        var qnaid = req.params.qnaId
        db.query(`select * from qna where qnaid = ?`,
            [qnaid], (err, qna) => {
                if (err) return util.showerror(req, res, err);
                var context = {
                    body : "qna.ejs",
                    qna : qna,
                }
                req.app.render("mainFrame", context, (err, html) => {
                    if (err) return util.showerror(req, res, err);
                    res.end(html);
                })
            }
        )
    },  
    upload_answer : (req, res) => {
        var post = req.body;
        var sntqnaid = sanitizeHtml(post.qnaid);
        var sntAns = sanitizeHtml(post.answer);
        db.query(`update qna set answer = ? where qnaid = ?`,
            [sntAns, sntqnaid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/qna/view');
            }
        )
    },
    delete : (req, res) => {
        var qnaid = req.params.qnaId;
        db.query(`delete from qna where qnaid = ?`,
            [qnaid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/qna/view');
            }
        )
    }
}