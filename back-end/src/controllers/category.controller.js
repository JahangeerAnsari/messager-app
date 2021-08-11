
const Category = require('../modals/category')
const slugify = require('slugify')

//  we have to create category as child level

function createCategories(categories, parentId = null) {
    //  we have three case parentId = 0 , parentId = electornics (same)
    // more children elements more parent category

    //  store category into array
    const categoryList = [];
    let category;
    if (parentId == null) {
        // no parentId
        category = categories.filter(cat => cat.parentId == undefined);
    } 
    else {
        // parentid == category == (electronics)
        category = categories.filter(cat => cat.parentId == parentId)

    }
    // more than one parentId
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,

             children: createCategories(categories, cate._id)

        });
    }

    return categoryList
};

exports.addCategory = (req, res) => {
    // we have to add the category 
    Category.findOne({ name: req.body.name }).exec((error, category) => {
        if (error) {
            return res.status(400).json({
                message: 'something went wrong',
                error
            })
        }
       
        


       const categoryObj = new Category({
            name: req.body.name,
            slug: slugify(req.body.name),

        })

        if(req.file){
            categoryObj.categoryImage = process.env.API + '/public' + req.file.filename
        }

      
        //if there is any parent id ofcategoryObj
        // we have to assign to the parentId
        if (req.body.parentId) {
            categoryObj.parentId = req.body.parentId
        }

        const cate = new Category(categoryObj);
        cate.save((error, _category) => {
            if (error) {
                return res.status(400).json({
                    message: 'already present category no more same category',
                    error
                })
            }
            if (_category) {

                return res.status(201).json({
                    message: 'new category has been added',

                    _category

                })
            }
        })
    })
}

exports.getCategory = (req, res) => {
    Category.find({}).exec((error, categories) => {
        if (error) {
            return res.status(400).json({
                message: 'Could not get categories somethig went wrong',
                error
            })
        }
        if (categories) {
            const categoryList = createCategories(categories);
            return res.status(200).json({
                message:'Fetched all categories',
                categoryList
            })
           
        }
    })
}