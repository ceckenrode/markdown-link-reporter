// uriDecoder decodes an uri's ascii decoding if there is any for fs to resolve the path
// The built-in decodeURI function doesn't work with %23 (# symbol)
const uriDecoder = URI => {
  let decodedURI = URI;
  if (URI.indexOf("%") > -1) {
    if (URI.indexOf("%23") > -1) {
      decodedURI = URI.replace(/%23/g, "#");
    }
    if (decodedURI.indexOf("%") > -1) {
      decodedURI = decodeURI(decodedURI);
    }
  }
  return decodedURI;
};

export default uriDecoder;
