/**
 * Created by Administrator on 2014/10/12.
 */
var cv;
var c;

function point(b,a){
    this.x = a;
    this.y = b;
}

var one = [new point(-1,0),new point(-1,1),new point(-1,2),new point(-1,3),"lightgreen"];
var two = [new point(-1,0),new point(0,0),new point(0,1),new point(0,2),"yellow"];
var three = [new point(-1,2),new point(0,0),new point(0,1),new point(0,2),"blue"];
var four = [new point(-1,0),new point(-1,1),new point(0,0),new point(0,1),"red"];
var five = [new point(-1,1),new point(-1,2),new point(0,0),new point(0,1),"rgb(100,150,0)"];
var six = [new point(-1,1),new point(0,0),new point(0,1),new point(0,2),"rgb(100,150,100)"];
var seven = [new point(-1,0),new point(-1,1),new point(0,1),new point(0,2),"rgb(10,150,50)"];

function block(){
    this.tp = new Array();
    this.active = 0;
    this.live = 0;
    var choose = Math.floor(Math.random()*7);
    var choice = new Array();
    switch(choose){
        case 0: choice = one;break;
        case 1: choice = two;break;
        case 2: choice = three;break;
        case 3: choice = four;break;
        case 4: choice = five;break;
        case 5: choice = six;break;
        case 6: choice = seven;break;
    }
    for(var i = 0;i<4;i++){
        this.tp[i] = new point(0,0);
        this.tp[i].x = choice[i].x;
        this.tp[i].y = choice[i].y;
    }
    this.tp[4] = choice[4];
}
/*
block.prototype.Choose = function(block){
    var choose = Math.floor(Math.random()*7);
    var choice = new Array();
    switch(choose){
        case 0: choice = one;break;
        case 1: choice = two;break;
        case 2: choice = three;break;
        case 3: choice = four;break;
        case 4: choice = five;break;
        case 5: choice = six;break;
        case 6: choice = seven;break;
    }
    for(var i = 0;i<4;i++){
        block.tp[i] = new point(0,0);
        block.tp[i].x = choice[i].x;
        block.tp[i].y = choice[i].y;
    }
}
*/

function input(e){
    switch(e.keyCode){
        case 37:         //left code
            bMove(0);
            break;
        case 38:         //up code
            turnB(box[now]);
            break;
        case 39:         //right code
            bMove(1);
            break;
        case 40:         //down code
            goBtm();
            break;
    }
}

function goBtm(){
    var block = box[now];
    for(var d = 0;d<12;d++){
        for(var i = 0;i<100;i++){
            if( i == now) continue;
            for(var q = 0;q<4;q++){
                for(var w = 0;w<4;w++){

                        if( ( ( (box[i].live == 1) && block.tp[q].x == box[i].tp[w].x) && ( (block.tp[q].y+d) == box[i].tp[w].y) ) || (block.tp[q].y+d) == 12){
                            for(var t = 0;t<4;t++){
                                block.tp[t].y = block.tp[t].y + d-1;
                            }
                            return;
                        }

                }
            }
        }
    }
}

function bMove(dir){
    var enableMove = 1;
    if(dir == 1){
        for(var i = 0;i<4;i++){
            if(box[now].tp[i].x+1>9){
                enableMove = 0;
            }
        }
        if(enableMove == 1 && AbleMove(box[now],1)){
            for(var i = 0;i<4;i++){
                box[now].tp[i].x++;
            }
        }
    }
    else{
        for(var i = 0;i<4;i++){
            if(box[now].tp[i].x-1<0){
                enableMove = 0;
            }
        }
        if(enableMove == 1 && AbleMove(box[now],-1)){
            for(var i = 0;i<4;i++){
                box[now].tp[i].x--;
            }
        }
    }
}

function turnB(block){
    var count = new Array(12);
    var xmax = 0,ymax = 0;
    var Nxmax = 0,Nymax = 0;
    var p = [];
    for(var i = 0;i<4;i++){
        p[i] = new point(block.tp[i].y,block.tp[i].x );
    }
    for(var i = 0;i<4;i++){
        if(block.tp[i].y > ymax) ymax = block.tp[i].y;
        if(block.tp[i].x > xmax) xmax = block.tp[i].x;
    }
    for(var i = 0;i<12;i++){
        count[i] = 0;
    }
    for(var i = 0;i<4;i++){
        var t = block.tp[i].y;
        block.tp[i].y = block.tp[i].x;
        block.tp[i].x = t;
    }
    for(var i = 0;i<4;i++){
        count[block.tp[i].x]++;
    }
    var max = count[0];
    var maxC = 0;
    for(var i = 0;i<12;i++){
        if(count[i]>=count[maxC]){
            max = count[i];
            maxC = i;
        }
    }
    for(var i = 0;i<4;i++){
         if(block.tp[i].x > maxC){
             block.tp[i].x = block.tp[i].x-(block.tp[i].x - maxC)*2;
         }else if(block.tp[i].x < maxC){
            block.tp[i].x = block.tp[i].x+(maxC - block.tp[i].x)*2;
         }
    }
    for(var i = 0;i<4;i++){
        if(block.tp[i].y > Nymax) Nymax = block.tp[i].y;
        if(block.tp[i].x > Nxmax) Nxmax = block.tp[i].x;
    }
    for(var i = 0;i<4;i++){
        block.tp[i].x += xmax - Nxmax;
        block.tp[i].y += ymax - Nymax;
    }

    for(var i = 0;i<4;i++){      //旋轉時穿牆修正
        if(block.tp[i].x<0){
            for(var i = 0;i<4;i++){
                block.tp[i].x ++;
            }
        }
    }

    for(var i = 0;i<100;i++){    //判斷旋轉後是否會與其他方塊重疊   如果是則不旋轉
        if( i == now) continue;
        for(var q = 0;q<4;q++){
            for(var w = 0;w<4;w++){
                if(box[i].live==1){
                    if( (block.tp[q].x == box[i].tp[w].x) && ( (block.tp[q].y) == box[i].tp[w].y) ){
                        for(var y = 0;y<4;y++){
                            block.tp[y].x = p[y].x;
                            block.tp[y].y = p[y].y;
                            return;
                        }
                    }
                }
            }
        }
    }
}

function AbleMove(block,dir){
    for(var i = 0;i<100;i++){
        if( i == now) continue;
        for(var q = 0;q<4;q++){
            for(var w = 0;w<4;w++){
                if(box[i].live==1){
                    if( (block.tp[q].x+dir*1 == box[i].tp[w].x) && ( block.tp[q].y == box[i].tp[w].y) ){
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

var count = 0;

function drawB(block){
    if(impabtm(block) == true){
        block.active = 0;
        do{
            if(now<=98)
                now++;
            else now = 0;
        }
        while(box[now].live == 1);
        box[now].live = 1;
        box[now].active = 1;
        return;
    }
    for(var i = 0;i<100;i++){
        if( i == now) continue;
        for(var q = 0;q<4;q++){
            for(var w = 0;w<4;w++){
                if(box[i].live==1){
                    if( (block.tp[q].x == box[i].tp[w].x) && ( (block.tp[q].y) == box[i].tp[w].y) ){
                        clearInterval(LoopID);
                        c.font = "50px  Courier bold";
                        c.textAlign = "center";
                        c.fillStyle = "red";
                        c.fillText("Game Over!!",250,250);
                        console.log("Game Over!!");
                        gameover = true;
                        return;
                    }
                }
            }
        }
    }
    for(var i = 0;i<100;i++){
        if( i == now) continue;
        for(var q = 0;q<4;q++){
            for(var w = 0;w<4;w++){
                if(box[i].live==1){if( (block.tp[q].x == box[i].tp[w].x) && ( (block.tp[q].y+1) == box[i].tp[w].y) ){
                        block.active = 0;
                        do{
                            if(now<=98)
                                now++;
                            else now = 0;
                        }while(box[now].live == 1);
                        box[now].live = 1;
                        box[now].active = 1;
                        return;
                    }
                }
            }
        }
    }
    count++;
    for(var i = 0;i<4;i++){
        c.fillStyle = block.tp[4];
        c.fillRect(block.tp[i].x*50,block.tp[i].y*50,50,50);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.strokeRect(block.tp[i].x*50,block.tp[i].y*50,50,50);
        if(block.active == 1 && count == 30){
            block.tp[i].y++;
        }
    }
    if(count == 30)
       count = 0;
}

function drawall(){
    if(gameover) return;
    for(var i = 0;i<100;i++){
        if(box[i].live == 1 && i!=now){
            for(var q = 0;q<4;q++){
                c.fillStyle = box[i].tp[4];
                c.fillRect(box[i].tp[q].x*50,box[i].tp[q].y*50,50,50);
                c.strokeStyle = "black";
                c.lineWidth = 2;
                c.strokeRect(box[i].tp[q].x*50,box[i].tp[q].y*50,50,50);
            }
        }
    }
}

function removeLine(row){
    var r = [0,0,0,0,0,0,0,0,0,0];
    for(var b = 0;b<100;b++){
        if(box[b].live == 1 && (box[b].active == 0)){
            for(var t = 0;t<4;t++){
                if(box[b].tp[t].y == row){
                    r[box[b].tp[t].x] = 1;
                }
            }
        }
    }

    for(var i = 0;i<10;i++){
        if(r[i] == 0){
            return false;
        }
    }
    for(var b = 0;b<100;b++){
        if(box[b].live == 1 && (box[b].active == 0)){
            for(var t = 0;t<4;t++){
                if(box[b].tp[t].y == row){
                    box[b].tp[t].x = 100;
                    box[b].tp[t].y = 100;
                }
            }
        }
    }
    for(var b = 0;b<100;b++){
        if((box[b].live == 1) && (box[b].active == 0) ){
            for(var t = 0;t<4;t++){
                if(box[b].tp[t].y < row){
                    box[b].tp[t].y++;
                }
            }
        }
    }
    return true;
}

function impabtm(block){
    for(var i = 0;i<4;i++){
        if((block.tp[i].y+1) == 12)
           return true;
    }
}

onload = function(){
   cv = document.getElementById("game");
   c = cv.getContext("2d");
   window.addEventListener("keydown",input)
   init();
   LoopID = window.setInterval(Gloop,1000/30);
}

var box = new Array();
var now = 0;
var LoopID;
var gameover = false;
function init(){
    for(var i = 0;i<100;i++){
        box[i] = new block();
    }
    box[0].live = 1;
    box[0].active = 1;
}

function Gloop(){
   if(gameover) return 0;
   c.clearRect(0,0,500,600);
   drawB(box[now]);
   drawall();
   for(var i = 0;i<12;i++){
       removeLine(i);
   }
   for(var b = 0;b<100;b++){
        if((box[b].live == 1) && (box[b].active == 0) ){
            var isLive = false;
            for(var t = 0;t<4;t++){
                if(box[b].tp[t].y != 100 && box[b].tp[t].x != 100){
                     isLive = true;
                }
            }
            if(isLive == false){
                box[b] = new block();
            }
        }
   }
}