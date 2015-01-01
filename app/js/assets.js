module.exports = {
  urlFor: function(path){
    if (process.env.NODE_ENV === "production") {
      return "//golf.riesd.com"+path;
    } else {
      return "//localhost:8080"+path;
    }
  }
}
