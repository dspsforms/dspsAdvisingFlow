import { Signature } from './signature.model';

export interface SignatureStatus {
    signature?: Signature ; // the new Signature
    message?: string;
    err?: string  | {};
}

export interface SignatureArrayStatus {
  signatures?: [Signature] ; // array of child Signatures
  message?: string;
  err?: string  | {};
}
