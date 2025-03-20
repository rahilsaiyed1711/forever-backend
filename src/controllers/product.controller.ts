import { Request, Response } from 'express';
import Product from '../models/product.model';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { IProductData } from '../Interfaces/db.interface';
dotenv.config();

//for adding products
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    // const image1 = req.files.image1 && req.files.image1[0]
    // const image2 = req.files.image2 && req.files.image2[0]
    // const image3 = req.files.image3 && req.files.image3[0]
    // const image4 = req.files.image4 && req.files.image4[0]
    const { image1, image2, image3, image4 } = files;

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item[0].path, {
          resource_type: 'image',
        });
        return result.secure_url;  
      })
    );
    

    
    const productData: IProductData = {
      name,
      description,
      price: Number(price),
      image: imagesURL,
      category,
      subCategory,
      sizes,
      bestSeller: bestSeller === 'true' ? true : false,
      date: Date.now(),
    };
    const product = new Product(productData);
    product.save();
    res.status(201).json({ msg: 'Product Added' });
  } catch (err) {
    console.log(err);
  }
};

export const listProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    console.table(products);

    res.status(200).json({ success: true, data:products });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

//for removing products
export const removeProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json({success:true, msg: "Product Removed"})
  } catch (error) {
    res.status(500).json({success:false, msg: "error removing product"})
  }
};
export const singleProduct = async (req:Request, res:Response) => {
    try{
        const product = await Product.findById(req.body.id);
        res.status(200).json({success:true, data : product})
    }catch(err){
        
    }
};
