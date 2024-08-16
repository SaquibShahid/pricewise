"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl : string){
    if(!productUrl)return;
    try {
        connectToDB();
        
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct)return;

        let product = scrapedProduct;

        const checkProduct = await Product.findOne({url : productUrl}).select({_id : 0});
        if(checkProduct){
            const updatedPriceHistory : any = [
                ...checkProduct.priceHistory,
                {price : scrapedProduct.price}
            ]
            product = {
                ...scrapedProduct,
                priceHistory : updatedPriceHistory,
                lowestPrice : getLowestPrice(updatedPriceHistory),
                highestPrice : getHighestPrice(updatedPriceHistory),
                averagePrice : getAveragePrice(updatedPriceHistory),
            }
        }
        const newProduct = await Product.findOneAndUpdate({url : scrapedProduct.url} , product , {upsert : true , new : true});

        revalidatePath(`/products/${newProduct._id}`);
    } catch (error : any) {
        throw new Error(`Failed to create/update product , ${error.message}`);
    }
}