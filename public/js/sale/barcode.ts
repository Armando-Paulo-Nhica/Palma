// import * as bwipjs from 'bwip-js';
// import * as path from 'path';
// import * as fs from 'fs';
// import { ipcRenderer } from 'electron';

// async function generateBarcodeImage(barcode: string, outputPath: string): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     bwipjs.toBuffer(
//       {
//         bcid: 'code128',
//         text: barcode,
//         scale: 1,
//         height: 10,
//         includetext: true,
//         textxalign: 'center',
//       },
//       async (err, buffer) => {
//         if (err) {
//           reject(err);
//         } else {
//           const filename = `barcode_${barcode}.png`;
//           const filePath = path.join(outputPath, filename);

//           fs.writeFile(filePath, buffer, async (writeErr) => {
//             if (writeErr) {
//               reject(writeErr);
//             } else {
//               // Use ipcRenderer.send to communicate with the main process
//               ipcRenderer.send('print', filePath);

//               // Optionally, you can listen for a response from the main process
//               ipcRenderer.once('print-complete', () => {
//                 resolve(filePath);
//               });
//             }
//           });
//         }
//       }
//     );
//   });
// }

// export { generateBarcodeImage };