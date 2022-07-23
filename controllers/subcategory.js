const Subcategory = require('../models/subcategory');
const Category = require('../models/category');
const Blog = require('../models/blog.js');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {

    function slugifi(text) {
        return text.toLowerCase().replace(text, text).replace(/^-+|-+$/g, '')
            .replace(/\s/g, '-').replace(/\-\-+/g, '-');
    
    }

    const { name, show, category } = req.body;
    let slug = slugifi(name);

    let subcategory = new Subcategory({ name, slug, show, category });
    let arrayOfCategories = category && category.split(',');
    subcategory.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        Subcategory.findByIdAndUpdate(data._id, { $push: { category: arrayOfCategories } }, { new: true }).exec(
            (err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                } else {
                   res.json(data);
                }
            }
        );
    });
};

exports.list = (req, res) => {
    Subcategory.find({})
    .populate('category', '_id name slug')
    .exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.allCat = (req, res) => {
    Category.find({show: "true"}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Subcategory.findOne({ slug }).exec((err, subcategory) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        // res.json(category);
        Blog.find({ subcategories: subcategory })
            .sort({createdAt: -1})
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name')
            .select('_id title slug excerpt categories postedBy tags createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json({ subcategory: subcategory, blogs: data });
            });
    });
};



exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Subcategory.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Category deleted successfully'
        });
    });
};
