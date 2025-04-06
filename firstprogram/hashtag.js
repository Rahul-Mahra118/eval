let arr= ["javascript", "programming", "web", "development", "code", "learning", "tutorial", "technology", "computer", "a"];

function hashtagGenerator(arr){
    let filterWordsByLength= arr.filter(word=>word.length>3);
    let captitalLizeArray= filterWordsByLength.map(word=>{
       let eachWrod= '#'+word.charAt(0).toUpperCase()+word.slice(1);
       return eachWrod;
    })
    let sortedArray= captitalLizeArray.sort((a,b)=>b.length-a.length).slice(0,5);
    console.log(sortedArray)
}
hashtagGenerator(arr)