const db = require('./db');
const util = require('./util');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    home : (req,res)=>{
        var context = {
            body : "main.ejs",
        }
        req.app.render("mainFrame", context, (err, html) => {
            if (err) return util.showerror(req, res, err);
            res.end(html);
        })
    }
}