class DisplayWeather{


    constructor(value)
    
    {
        this.forecast=value.day.condition.text;
        this.localTime=value.date;

    }

} 

class DisplayMovies{


    constructor(value)
    
    {
        this.title=value.original_title;
        this.overview=value.overview;
        this.total=value.vote_count;
        this.average=value.vote_average;
        this.img=value.poster_path;
       this.date=value.release_date
    }

} 

module.exports.DisplayWeather=DisplayWeather;
module.exports.DisplayMovies=DisplayMovies;

