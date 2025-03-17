import { Request, Response } from 'express';
import Product from '../models/product.model';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { IProductData } from '../Interfaces/db.interface';
dotenv.config();

//for adding products

// export const addProduct = async (req: Request, res: Response) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCategory,
//       sizes,
//       bestSeller,
//     } = req.body;
//     const files = req.files as { [fieldname: string]: Express.Multer.File[] };
//     // const image1 = req.files.image1 && req.files.image1[0]
//     // const image2 = req.files.image2 && req.files.image2[0]
//     // const image3 = req.files.image3 && req.files.image3[0]
//     // const image4 = req.files.image4 && req.files.image4[0]
//     const { image1, image2, image3, image4 } = files;

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item != undefined
//     );

//     let imagesURL = await Promise.all(
//       images.map(async (item) => {
//         // Since item is an array of files (image1, image2, etc.), we access the first file
//         let result = await cloudinary.uploader.upload(item[0].path, {
//           resource_type: 'image',
//         });
//         return result.secure_url;  // Directly return the secure URL, not wrapped in an array
//       })
//     );
    
//     console.log('imagesURL:', imagesURL); // Should now be a flat array of URLs
    
//     console.log("imagesURL",imagesURL);
    
//     const productData: IProductData = {
//       name,
//       description,
//       price: Number(price),
//       image: imagesURL,
//       category,
//       subCategory,
//       sizes,
//       bestSeller: bestSeller === 'true' ? true : false,
//       date: Date.now(),
//     };
//     console.log(productData);
//     const product = new Product(productData);
//     product.save();
//     console.log(image1, image2, image3, image4);
//     console.log(imagesURL);
//     res.status(201).json({ msg: 'Product Added' });
//   } catch (err) {
//     console.log(err);
//   }
// };


export const addProduct = async (req: Request, res: Response) => {
  try {
    // Destructuring the body
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    // Accessing the files from the request
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { image1, image2, image3, image4 } = files;

    // Collect images, filtering out any undefined values
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    console.log('Files received:', images);

    // Upload each image to Cloudinary and collect their URLs
    let imagesURL = await Promise.all(
      images.map(async (item) => {
        // Access the first image file in the array (e.g., image1[0], image2[0], etc.)
        let result = await cloudinary.uploader.upload(item[0].path, {
          resource_type: 'image',
        });
        return result.secure_url; // Return only the secure URL of the image
      })
    );

    console.log('Images URLs:', imagesURL); // Log the final flat array of image URLs

    // Prepare the product data object
    const productData = {
      name,
      description,
      price: Number(price),
      image: imagesURL, // Store the flat array of image URLs here
      category,
      subCategory,
      sizes,
      bestSeller: bestSeller === 'true' ? true : false, // Convert bestseller to a boolean
      date: Date.now(), // Set the current date
    };

    console.log('Product data to be saved:', productData);

    // Save the product data to the database
    const product = new Product(productData);
    await product.save();

    // Respond with success
    res.status(201).json({ msg: 'Product Added' });

  } catch (err) {
    console.error('Error while adding product:', err);
    res.status(500).json({ msg: 'Failed to add product' });
  }
};


//for listing products 
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
        await Product.findById(req.body.id);
        res.status(200).json({success:true})
    }catch(err){
        
    }
};
