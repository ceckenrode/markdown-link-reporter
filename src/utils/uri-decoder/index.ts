import { map as _map } from "lodash";

function uriDecoder(URI: string): string {
  let decodedURI: string = URI;
  if (URI.indexOf("%") > -1) {
    if (URI.indexOf("%23") > -1) {
      decodedURI = URI.replace(/%23/g, "#");
    }
    if (decodedURI.indexOf("%") > -1) {
      decodedURI = decodeURI(decodedURI);
    }
  }
  return decodedURI;
}

export default uriDecoder;
