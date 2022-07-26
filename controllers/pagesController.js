const Page = require('../models/page');
const Contact = require('../models/contact');
const Advertise = require('../models/advertisement');
const Editor = require('../models/editor');
const formidable = require('formidable');
// const stripHtml = import('string-strip-html')
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.createPage = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {

        const { title, body, slug, footermenu, mainmenu, topmenu, none } = fields;

        let page = new Page(); 
        page.title = title;
        page.body = body;
        page.slug = slug;
        page.footermenu = footermenu;
        page.mainmenu = mainmenu;
        page.topmenu = topmenu;
        page.none = none;

        page.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
};

exports.getPage =  async (req, res)=>{
    const data = await Page.find().sort({createdAt: -1});
    res.json(data);
};


