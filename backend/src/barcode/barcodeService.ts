// import { generateBarcodeImage } from '../utiles/barcode';


// export async function createBarcode(): Promise<{ barcode: string; barcodeImageFilename: string }> {
//     try {
//       const barcode = generateBarcode(); // Generate barcode
  
//       // Generate barcode image file
//       const barcodeImageFilename = await generateBarcodeImage(barcode, './public/barcodes');
  
//       return { barcode, barcodeImageFilename };
//     } catch (error) {
//       console.error('Error generating barcode:', error);
//       throw new Error('Internal Server Error');
//     }
//   }