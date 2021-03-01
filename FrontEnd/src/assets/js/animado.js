
window.addEventListener('scroll',function(){
    let line=document.querySelectorAll(".card-line-time")[0];
    let altura=window.innerHeight;
    var distancia =line.getBoundingClientRect().top;

    console.log(distancia)
});