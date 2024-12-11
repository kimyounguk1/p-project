const db = require('./db');
const util = require('./util');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    view : (req, res) => { // 메인 페이지
        var context = {
            body : "satis.ejs",
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    },  
    delete : (req, res) => {
        var satisid = req.params.satisId;
        db.query(`delete from feedback where feedback_num = ?`,
            [satisid], (err, result) => {
                if (err) return util.showerror(req, res, err);
                res.redirect('/satis/view');
            }
        )
    }
}