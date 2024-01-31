// // barcodeUtils.ts
// import * as bwipjs from 'bwip-js';
// import * as path from 'path';
// import * as fs from 'fs';

// async function generateBarcodeImage(barcode: string, outputPath: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       bwipjs.toBuffer(
//         {
//           bcid: 'code128',
//           text: barcode,
//           scale: 1,
//           height: 10,
//           includetext: true,
//           textxalign: 'center',
//         },
//         (err, buffer) => {
//           if (err) {
//             reject(err);
//           } else {
//             const filename = `barcode_${barcode}.png`;
//             const filePath = path.join(outputPath, filename);
  
//             fs.writeFile(filePath, buffer, (writeErr) => {
//               if (writeErr) {
//                 reject(writeErr);
//               } else {
//                 resolve(filePath);
//               }
//             });
//           }
//         }
//       );
//     });
//   }

//   export {generateBarcodeImage}


import * as bwipjs from 'bwip-js';

async function generateBarcodeImage(barcode: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: 'code128',
        text: barcode,
        scale: 1,
        height: 10,
        includetext: true,
        textxalign: 'center',
      },
      (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          // Convert the buffer to a data URI
          const dataURI = `data:image/png;base64,${buffer.toString('base64')}`;
          resolve(dataURI);
        }
      }
    );
  });
}

export { generateBarcodeImage };
