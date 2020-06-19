import { Signature } from './signature.model';

export interface SignatureStatus {
    signature?: Signature ; // the new Signature
    message?: string;
    err?: string  | {}; 
  }