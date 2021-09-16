"use strict";


// Model
class Moviefilm{
    constructor(title,vote_count,image_url,popularity,release_date){
      this.title=title;
      
          this.vote_count = vote_count;
          this.image_url = image_url;
          this.popularity = popularity;
          this.released_date = release_date;
    }
  }

  module.exports=Moviefilm;

