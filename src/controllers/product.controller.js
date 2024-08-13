const ProductService = require("../services/product.service");
const { SuccessResponse } = require("../core/success.response");

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Create product success!",
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    /**
     * @desc Get all Drafts for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return {JSON}
     */
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: "Get list Drafts success!",
            metadata: await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId,
            }),
        }).send(res);
    };
}

module.exports = new ProductController();
