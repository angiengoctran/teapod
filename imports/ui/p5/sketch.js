// pass in p5.js as function argument p5
export default function sketch (p5) {
  // set the intial ascii variable
  let tea = {};
  let duration = 0;
  let brewing = false;
  var interval;
  var timer;
  let teatype = false;
  let watertemp = false;
  //var duration = 180000;

  // set variables for a grid of 100 possible values
  // let gridIndex = 0;
  // let gridMax = 99;
  // let gridPos = [];
  // set the initial random text color
  let r = p5.random(255);
  let g = p5.random(255);
  let b = p5.random(255);

  p5.setup = function () {
    // standard p5 setup code, note p5. because we passed it in above
    p5.createCanvas(375, 667);
    p5.background(192);
    p5.textSize(30);
    timer = p5.createP('timer');

  };

  p5.draw = function () 
  {
     
    // fill the background of each square with white before drawing ascii chars
    // p5.fill(255);
    // p5.noStroke()
    // p5.rect(gridPos[gridIndex].x, gridPos[gridIndex].y, 60, 40);
    // // draw the incoming ascii from serial
    // p5.fill(r, g, b);
    // p5.text(ascii.text, gridPos[gridIndex].x + 20, gridPos[gridIndex].y + 30);
  };

  // this special function receives data from App.jsx withTracker


  function timerOn()
  {
    console.log ("Timer is on");
    timerOn = p5.createP(duration);
  };

  function countDown()
  {
    console.log ("Counting Down");
    timer.html(duration);
    duration--;
  };


  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) 
  {
    console.log("receive props",props);
    if (props.tea)
    {
      // get the new tea object
      tea = props.tea;
      duration = props.tea.duration;
      if (!teatype)
      {
        if (props.tea.type)
        {
          teatype = true;
          console.log(props.tea.type);
          p5.text(tea.type,p5.width/3, p5.height/3);
          /*if (!watertemp)
          {
            if (props.tea.temp)
            {
            watertemp = true;
            p5.text("Current Temperature",props.tea.temp,p5.width/3, p5.height-200);
            }
          } */      
        }
      }
      if (!brewing)
      {
        if (props.tea.brewingNow)
        {
          brewing = true;
          setTimeout(timerOn, props.tea.duration);
          setInterval(countDown, 1000); //(visual count down) https://www.youtube.com/watch?v=CqDqHiamRHA
        }
      }
    }

      // increment the grid position
      // if (gridIndex < gridMax) {
      //   gridIndex++;
      // } else {
      //   gridIndex = 0;
      // }
      // get a new random color
      // r = p5.random(255);
      // g = p5.random(255);
      // b = p5.random(255);
  };
}