// pass in p5.js as function argument p5
export default function sketch (p5) {
  // set the intial ascii variable
  let tea = {};
  let duration = 0;
  let brewing = false;
  var interval;
  //var timer;
  let teatype = false;
  //let watertemp = false;
  let teafinish = false;
  let teawater = false;
  //var timer;

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
    p5.background(255,50,76);
    //p5.textSize(30);
    p5.textFont("Proxima Nova");
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
    //p5.text(timerOn(duration), 20, 300);
    timerOn.html(duration);
    showTimer = timerOn.html();
    duration--;
    //p5.text(showTimer, 20, 300);
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
          if (props.tea.type == "Green Tea")
          {
            p5.background (57,181,74);
            p5.text("Target Temp: 65*-80*C", 30, 80);
          }
          if (props.tea.type == "Black Tea")
          {
            p5.background (0);
          }
          if (props.tea.type == "Oolong Tea")
          {
            p5.background (247,152,28);
          }
          p5.fill(255).strokeWeight(0).textSize(50);
          //p5.CENTER;
          p5.text(tea.type, 30, 50);
          //if (!watertemp)
          //{
            if (props.tea.temp)
            {
            //watertemp = true;
            console.log(props.tea.temp);
            p5.text("Current Temperature: ",props.tea.temp, 30, 100);
            }
          //}  
          if (!teawater) 
          {
            if (props.tea.water)
            {
              p5.text("Hold the Timer button for 2 seconds to start steeping", 30, 80);
            }
          }
        }
      }
      if (!brewing)
      {
        if (props.tea.brewingNow)
        {
          brewing = true;
          setTimeout(timerOn, props.tea.duration);
          interval = setInterval(countDown, 1000); //(visual count down) https://www.youtube.com/watch?v=CqDqHiamRHA
          if (!teafinish) 
          {
            if (props.tea.finish)
            {
              teafinish = true;
              p5.text("IT'S TEA TIME!", 30, 80);
              clearInterval(interval);
            }
          }
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