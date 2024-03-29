var col = 30;
var row = 30;
var u = [];
var b = false;
var f = true;
var gen = 1;
var cellsN = [];
let button;
let start;
let stop;
var canvasx = 650;
var canvasy = 650;
var rs = canvasx/col;
var stop_g = true;

function setup() {
  createCanvas(canvasx, canvasy);
  background(0);
  for(var i = 0; i<col ; i++){
    u[i] = [];
    cellsN[i] = [];
     for(var j = 0; j<row ; j++){
        u[i][j] = new grid(i*canvasx/col,j*canvasy/row,i,j);
        cellsN[i][j] = 0;
     }
  }
  button = createButton('Next');
  button.position(0,0, 65);
  button.mousePressed(game);
  start = createButton('Start');
  start.position(200,0, 65);
  start.mousePressed(start_game);
  stop = createButton('Stop');
  stop.position(400,0, 65);
  stop.mousePressed(stop_game);
  timer = 1000;
}

function draw() {
  if(stop_g == false){
   if (frameCount % 20 == 0) { 
      game(); 
    } 
  }else{
    for(var i = 0; i<col ; i++){
       for(var j = 0; j<row ; j++){
          u[i][j].clicked();
       }
    }
  }
}

class grid{
  constructor(x,y,i,j){
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.v = 0;
    fill(100);
    stroke(0);
    rect(this.x,this.y,rs,rs);
  }
  death(){
    fill(0);
    rect(this.x,this.y,rs,rs); 
  }
  
  state(){
   if(this.v == 1){
        fill(255);
        rect(this.x,this.y,rs,rs);
   }else{
       fill(100);
       rect(this.x,this.y,rs,rs);
   }
  }
  
  clicked(){
      var offx = this.x+(rs/col*6);
      var offy = this.y+(rs/col*6);
      var d = dist(mouseX,mouseY,offx,offy);
    
      if(b && f==false && d<10 && this.v==1){
        print("RIP");
        fill(100);
        this.v = 0;
        rect(this.x,this.y,rs,rs);
      }
      if(b && f==false && d<10){
        print("YES");
        fill(255);
        this.v = 1;
        rect(this.x,this.y,rs,rs);
      }
  }
  
}

function mousePressed() {
  b = true;
  f = false;
}
function mouseReleased(){
  b = false;
  f = true;
}

function start_game(){
  stop_g=false;
}
function stop_game(){
  stop_g = true; 
}

function game(gen){
  for(var i = 1 ; i< col-1 ; i++ ){
     for (var j = 1; j< row-1 ; j++){
       var c = 0;
       for ( var a = -1; a <2 ; a++){
          for ( var b = -1; b<2; b++){
             if(u[i+a][j+b].v==1 && i+a>=0 && j+b>=0){
                c+=1;
             }
          }
       }
           if(u[i][j].v == 1){
              c -= 1;
           }
          if(u[i][j].v == 0 && c==3){
             cellsN[i][j] = 1;
            }
                    
          if(c > 3 || c < 2) {
            cellsN[i][j] = 0;
           }
         if(c<=3 && c>=2 && u[i][j].v==1){
            cellsN[i][j] = 1; 
         }
       }
  }
  for(var c = 0 ; c < col-1 ; c++ ){
     for (var p = 0; p < row-1 ; p++){
       u[c][p].v = cellsN[c][p];
       u[c][p].state();
       cellsN[c][p] = u[c][p].v;
     }
  }
}
