import { Request, Response } from "express";
import Profile from "../models/User/profile";
import User from "../models/User/user";
import { ProfileDocument } from "../types/models/User/profile.types";
import { UserDocument } from "../types/models/User/user.types";
import SuccessHandler from "../utils/SuccessHandler";
import ErrorHandler from "../utils/ErrorHandler";
import axios from "axios";
import dotenv from "dotenv";
import Shopify from "shopify-api-node";
declare global {
  namespace Express {
    interface Request {
      profile?: ProfileDocument;
    }
  }
}
const accessToken = process.env.ACCESS_TOKEN;

const shopify = new Shopify({
  shopName: "e092e8.myshopify.com",
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.ACCESS_TOKEN,
});
//Import Products
const importProducts = async (req: Request, res: Response) => {
  // #swagger.tags = ['shopify']
  try {
    const newProduct = {
      title: "123 Nike Air Zoom",
      body_html:
        "<p>Elevate your running experience with the Nike Air Zoom Pegasus 38. Engineered to deliver both comfort and performance, these men's running shoes are the perfect choice for athletes and enthusiasts alike.</p>",
      vendor: "DoClick",
      product_type: "Physical",
      images: [
        {
          src: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        },
        {
          src: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg",
        },
      ],
      variants: [
        {
          price: 3200,
          inventory_quantity: 13,
        },
      ],
    };

    const product = await shopify.product.create(newProduct);

    return SuccessHandler(
      { message: "product created successfully", product },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const getShopifyProducts = async (req: Request, res: Response) => {
  // #swagger.tags = ['shopify']
  try {
    const products = await shopify.product.list();
    let productCount = products.length;

    return SuccessHandler(
      {
        success: true,
        message: "product fetched successfully",
        productCount,
        products,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const getSingleProducts = async (req: Request, res: Response) => {
  // #swagger.tags = ['shopify']
  try {
    const products = await shopify.product.list();
    let productCount = products.length;

    return SuccessHandler(
      {
        success: true,
        message: "product fetched successfully",
        productCount,
        products,
      },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
export { importProducts, getShopifyProducts };