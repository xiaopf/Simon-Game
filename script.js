window.onload=function(){

        var onOff_in=document.getElementById('onOff_in');
        var screen=document.getElementById('screen');
        var light=document.getElementById('light');    

        var start=document.getElementById('start');
        var strict=document.getElementById('strict');
        var forcs=document.getElementById('forcs').getElementsByTagName('div');


        var c1=document.getElementById('c1');
        var c2=document.getElementById('c2');
        var c3=document.getElementById('c3');
        var c4=document.getElementById('c4');


        var strictLight=false;

        var onOff=false;
        onOff_in.onclick=function(){
            if(onOff){
                this.style.left='0px';
                onOff=false;
                screen.innerHTML='';
                light.style.backgroundColor='grey';
                strictLight=false;

            }else{
                this.style.left='25px';
                onOff=true;
                init();
                start.onclick=function(){ game();};  
            }               
        };

        function init(){
            if(onOff){
                screen.innerHTML='--';
                
                strict.onclick=function(){     
                    if(!strictLight&&onOff){
                        light.style.backgroundColor='#9f0f17';
                        strictLight=true;
                    }else{
                        light.style.backgroundColor='grey';
                        strictLight=false;
                    }               
                }
            }
        }


        function game(){
            if(!onOff){return false}       
            var gameArr=[];
            var times=1;
            give(times,true);

            function give(times,ifRan){
                if(!onOff){return false}
                if(times.toString().length==1){
                    screen.innerHTML='0'+times.toString();
                }else{
                    screen.innerHTML=times;
                }     
                var t=0;
                if(ifRan){
                    var randomNum=Math.floor(Math.random()*4); 
                    gameArr.push(randomNum); 
                }
                var timer=setInterval(function(){ 
                    if(!onOff){return false}

                    changeColor(gameArr[t],600);
                    t++;
                    if(t==times){
                        clickIt();
                        clearInterval(timer);
                    };
                },1000); 
            }

            function clickIt(){
                if(!onOff){return false}
                var ifClick=false;
                setTimeout(function(){
                    if(!ifClick){
                        falseClick();
                    }
                },3000);

                var clickTimes=0;
                for (var j = 0; j < forcs.length; j++) {
                    forcs[j].index=j;
                    forcs[j].onclick=function(){
                        ifClick=true;  
                        var n=gameArr[clickTimes];
                        clickTimes++;

                        if (n==this.index) {
                            changeColor(n,200);
                            if(clickTimes==gameArr.length){
                                times++;
                                console.log(times);
                                if(times==21){
                                    init();
                                    alert('YOU WIN!!!');
                                    
                                }else{
                                    clickTimes=0;
                                    give(times,true);                                    
                                }
                            }
                        }else{
                            var m=this.index;
                            falseClick(m);                
                        };        
                    }
                }  

                function falseClick(m){

                    if(ifClick){changeColor(m,500);};
                    var twinkle=0;
                    var twinkleTimer=setInterval(function(){
                        if(!onOff){return false}
                        screen.innerHTML='!!';
                        twinkle++;
                        setTimeout(function(){
                             screen.innerHTML='';
                        },250);

                        if(twinkle==3){
                            clearInterval(twinkleTimer);
                        }

                    },500);
                    
                    setTimeout(function(){
                            var k=times;
                            clickTimes=0;

                            if(strictLight){
                                game();
                            }else{
                                give(k,false);
                            }   
                    },2000);
                }           
            }
   
        }

        function changeColor(n,t){
            var fourC=[[c1,'#09ea6d','#00a74a'],[c2,'#e5101c','#9f0f17'],[c3,'#ffe77f','#cca707'],[c4,'#4b9bf1','#094a8f']];
            fourC[n][0].style.backgroundColor=fourC[n][1];
            setTimeout(function(){
                fourC[n][0].style.backgroundColor=fourC[n][2];
            },t); 
        }
}