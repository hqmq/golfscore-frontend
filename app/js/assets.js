module.exports = {
  urlFor: function(path){
    if (process.env.NODE_ENV === "production") {
      return "//example.com"+path;
    } else {
      return "//localhost:8080"+path;
    }
  }
}
