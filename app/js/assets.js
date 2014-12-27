module.exports = {
  urlFor: function(path){
    if (process.env.NODE_ENV === "development") {
      return "//localhost:8080"+path;
    } else {
      return "//example.com"+path;
    }
  }
}
