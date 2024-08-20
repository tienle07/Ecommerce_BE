const { model, Schema, Types } = require("mongoose");// Erase if already required

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "Discounts";

var discountSchema = new Schema(
    {
        discount_name: {
            type: String,
            required: true
        },
        discount_description: {
            type: String,
            required: true
        },
        discount_type: {
            type: String,
            default: 'fixed_amount' //percentage
        },
        discount_value: {
            type: Number,
            required: true
        },
        discount_code: {
            type: String,
            required: true
        },
        discount_start_date: {
            type: Date,
            required: true
        },
        discount_end_date: {
            type: Date,
            required: true
        },
        discount_max_use: {
            type: Number,
            required: true
        },
        discount_uses_count: {
            type: Number, // so discount da su dung
            required: true
        },
        discount_users_used: {
            type: Array, // ai su dung
            default: [],
        },
        discount_max_uses_per_user: {
            type: Number, // so luong cho phep toi da su dung
            required: true
        },
        discount_min_order_value: {
            type: Number,
            required: true,
        },
        discount_shopId: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        },
        discount_is_active: {
            type: Boolean,
            default: true
        },
        discount_applies_to: {
            type: String,
            required: true,
            enum: ['all', 'specific']
        },
        discount_product_ids: {
            type: Array,
            default: []
        }

    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

//Export the model
module.exports = model(DOCUMENT_NAME, discountSchema);
