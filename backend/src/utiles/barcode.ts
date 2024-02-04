
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
