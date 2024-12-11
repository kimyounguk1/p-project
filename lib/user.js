const db = require('./db');
const util = require('./util');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    view : (req, res) => { // 메인 페이지
        db.query(`select * from user`, (err, user) => {
            var context = {
                body : "user.ejs",
                user : user,
            }
            req.app.render("mainFrame", context, (err, html) => {
                if (err) return util.showerror(req, res, err);
                res.end(html);
            })
        })
    },  
    create : (req, res) => { // 사용자 생성
        var context = {
            body : "userCU.ejs",
            CU : "C"
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    },
    create_process : (req, res) => {
        var post = req.body;
        var sntId = sanitizeHtml(post.id);
        var sntPW = sanitizeHtml(post.password);
        var sntEmail = sanitizeHtml(post.email);
        var sntName = sanitizeHtml(post.name);
        db.query(`insert into qna(id, password, email, name) values(?, ?, ?, ?)`,
            [sntId, sntPW, sntEmail, sntName], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/user/view');
            }
        )
    },
    update : (req, res) => { // 사용자 수정
        var userid = req.params.userId;
        db.query(`select * from user where id = ?`,
            [userid], (err, user) => {
                if (err) return util.showerror(req, res, err);
                var context = {
                    body : "userCU.ejs",
                    CU : "U",
                    user : user
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
        var sntId = sanitizeHtml(req.params.userId);
        var sntPW = sanitizeHtml(post.password);
        var sntEmail = sanitizeHtml(post.email);
        var sntName = sanitizeHtml(post.name);
        db.query(`update user set password = ?, email = ?, name = ? where id = ?`,
            [sntPW, sntEmail, sntName, sntId], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/user/view');
            }
        )
    },
    delete : (req, res) => {
        var userid = req.params.userId;
        db.query(`delete from user where id = ?`,
            [userid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/user/view');
            }
        )
    }
}