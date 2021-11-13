
function switchImage(img_num)
{
    let imgbase = document.getElementById("imgbase"+img_num);
    let imgglow = document.getElementById("imgglow"+img_num);
        if (imgbase.src.match('images/dot.png')){
            imgbase.src = "images/down_full.png";
            imgglow.src = "images/down_full_glow.png";
        }
        else if (imgbase.src.match('images/down_full.png')){
            imgbase.src = "images/down_open.png";
            imgglow.src = "images/down_open_glow.png";
        }
        else if (imgbase.src.match('images/down_open.png')){
            imgbase.src = "images/up_full.png";
            imgglow.src = "images/up_full_glow.png";
        }
        else if (imgbase.src.match('images/up_full.png')){
            imgbase.src = "images/up_open.png";
            imgglow.src = "images/up_open_glow.png";
        }
        else if (imgbase.src.match('images/up_open.png')){
            imgbase.src = "images/dot.png";
            imgglow.src = "images/dot_glow.png";
        }
}

function reset()
{
    let container = document.getElementById("container");
    let imgbase = container.getElementsByTagName("img");
    let container_glow = document.getElementById("container_glow");
    let imgglow = container_glow.getElementsByTagName("img");
    for (let i=0; i<8; i++)
    {
        imgbase[i].src = "images/dot.png";
        imgglow[i].src = "images/dot.png";
    }
}


function trigger_glow(img_index)
{
    //crossfade hold

    var cfhold = document.getElementById('cfhold').value;
    $("#container_glow img#imgglow"+img_index).toggleClass("fadein");

    setTimeout(function() {
        $("#container_glow img#imgglow"+img_index).toggleClass("fadein");
    }, cfhold);

    var cfspeed = document.getElementById('cfspeed').value;
    var fadeinrate = 'opacity ' + cfspeed/1000 + 's' + ' ease-in-out'

    var r = document.querySelector(':root');
    r.style.setProperty('--fadeinrate', fadeinrate);
}


function play()
{
    var loop = 0; //loop true or false
    var counter = 0;

    var img_index = 0;

    var tempo = document.getElementById('tempoinput').value;
    if (tempo === "120")
        var interval = 500;
    if (tempo === "150")
        var interval = 400;
    if (tempo === "180")
        var interval = 333;

    var i = setInterval(function(){

        trigger_glow(img_index)

        img_index++;
        if (img_index === 8)
            img_index = 0;

        counter++;
        
        if (counter === 8){  //after all 8 images have been changed
            clearInterval(i); //stopping the loop
        }
        //STOP ANIMATION BUTTON
        /* $(document).ready(function() {
            $("#stopbtn").click(function() {
            clearInterval(i);
            
        });
        }); */

    }, interval);
        
            
        
    //});

    
}

function bgcolor()
{
    var bgcolor = document.getElementById('bgcolor').value;
    container.style.backgroundColor = bgcolor;
}


module.exports = { play };