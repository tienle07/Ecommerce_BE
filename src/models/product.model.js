"use strict";

const { Schema, model } = require("mongoose");
const slugify = require('slugify');
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            required: true,
        }, // quan jean cao cap
        product_thump: {
            type: String,
            required: true,
        },
        product_description: String,
        product_slug: String, // quan-jean-cao-cap
        product_price: {
            type: Number,
            required: true,
        },
        product_quantity: {
            type: Number,
            required: true,
        },
        product_type: {
            type: String,
            required: true,
            enum: ['Electronics', 'Clothing', 'Furniture']
        },
        product_shop: {
            type: Schema.Types.ObjectId, ref: 'Shop'
        },
        product_attributes: {
            type: Schema.Types.Mixed,
            required: true,
        },
        product_ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be above 5.0'],
            set: (val) => Math.round(val * 10) / 10
        },
        product_variations: {
            type: Array,
            default: [],
        },
        isDraft: {
            type: Boolean,
            default: true,
            index: true,
            select: false
        },
        isPublished: {
            type: Boolean,
            default: false,
            index: true,
            select: false
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Document middleware: runs before .save(0 .create()...
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true })
    next();
})

// define the product type = clothing
const clothingSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        size: String,
        material: String,
        product_shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    },
    {
        timestamps: true,
        collection: "clothes",
    }
);



//define the product type = electronic
const electronicSchema = new Schema(
    {
        manufacturer: {
            type: String,
            required: true,
        },
        model: String,
        color: String,
        product_shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    },
    {
        timestamps: true,
        collection: "electronics",
    }
);

const furnitureSchema = new Schema(
    {
        brand: {
            type: String,
            required: true,
        },
        size: String,
        material: String,
        product_shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        }
    },
    {
        timestamps: true,
        collection: "furnitures",
    }
);

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronics', electronicSchema),
    clothing: model('Clothing', clothingSchema),
    furniture: model('Furniture', furnitureSchema),

}


