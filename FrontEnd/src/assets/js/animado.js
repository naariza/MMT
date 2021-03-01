
window.addEventListener('scroll',function(){
    let line=document.querySelectorAll(".card-line-time")[0];
    let altura=window.innerHeight/1.3;
    var distancia =line.getBoundingClientRect().top;

    if(distancia<=altura)
{
line.classList.add('aparece');
}  
else{
line.classList.remove('aparece');
}  
// console.log(distancia)
});