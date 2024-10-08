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

    updateProduct = async (req, res, next) => {

        new SuccessResponse({
            message: "Update product success!",
            metadata: await ProductService.updateProduct(
                req.body.product_type,
                req.params.productId,
                {
                    ...req.body,
                    product_shop: req.user.userId,
                }
            ),
        }).send(res);
    };

    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: "Publish product success!",
            metadata: await ProductService.publishProductByShop(req.body.product_type, {
                product_id: req.params.id,
                product_shop: req.user.userId
            }),
        }).send(res);
    }

    unPublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: "unPublish product success!",
            metadata: await ProductService.unPublishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            }),
        }).send(res);
    }

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

    /**
     * @desc Get all Published for shop
     * @param {Number} limit
     * @param {Number} skip
     * @return {JSON}
     */
    getAllPublishForShop = async (req, res, next) => {
        new SuccessResponse({
            message: "Get list Publish success!",
            metadata: await ProductService.findAllPublishForShop({
                product_shop: req.user.userId,
            }),
        }).send(res);
    };

    getListSearchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get list search product success!",
            metadata: await ProductService.getListSearchProduct(req.params)
        }).send(res);
    };

    findAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: "Get list find all products success!",
            metadata: await ProductService.findAllProducts(req.query)
        }).send(res);
    };

    findProduct = async (req, res, next) => {
        new SuccessResponse({
            message: "Get find product success!",
            metadata: await ProductService.findProduct({ product_id: req.params.product_id })
        }).send(res);
    };

}

module.exports = new ProductController();
