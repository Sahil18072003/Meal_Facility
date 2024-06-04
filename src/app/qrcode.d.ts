declare module 'qrcode' {
  export type QRCodeErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

  export interface QRCodeToDataURLOptions {
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    type?: string;
    rendererOpts?: {
      quality: number;
    };
    version?: number;
    margin?: number;
    width?: number;
    scale?: number;
    color?: {
      dark: string;
      light: string;
    };
  }

  export function toDataURL(
    text: string,
    options?: QRCodeToDataURLOptions
  ): Promise<string>;
}
