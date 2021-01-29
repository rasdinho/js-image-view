let tX = 0;
let tY = 0;
let incr = 2;
let distance = 0;
let axisTreshold = 30;
let distanceLimit = 70;
let mouseX;
let mouseY;
let xForward = true;
let yForward = true;
let refreshBase = 2;
let refreshDelay = refreshBase;
let refreshDelta = 55;
let timer = false;
let speedPercentage = 0;
const speedFactor = 0.8;
let navigatorActive = false;

let aspectRatio = "landscape";

let moveContainer = document.getElementsByClassName("move-container")[0];
let $plane = moveContainer.getElementsByClassName("plane")[0];

let halfContainerW = Math.ceil(moveContainer.clientWidth / 2);
let halfContainerH = Math.ceil(moveContainer.clientHeight / 2);

const checkAspectRatio = () => {
    // Handle aspect ratio
    aspectRatio =
      document.body.clientWidth > document.body.clientHeight
        ? "landscape"
        : "portrait";
  };
  
  checkAspectRatio;
  
  // Duplicator
  const duplicate = original => {
    // handle empty params
    if (typeof original === "undefined") {
      original = $plane.getElementsByClassName("plane--content")[0];
    }
  
    const clone = original.cloneNode(true); // "deep" clone
    original.parentNode.appendChild(clone);
  };
  
// Reducer
const reduce = original => {
    // handle empty params
    if (typeof original === "undefined") {
      original = $plane.getElementsByClassName("plane--content")[0];
    }
  
    const clone = original.cloneNode(true); // "deep" clone
  
    $plane.innerHTML = "";
    $plane.appendChild(clone);
  };

// What appens on mouse leave event
const mouseLeaveHandler = e => {
    if (timer) {
      // Clear only if timer was set
      window.clearTimeout(timer);
      timer = false;
    }
  };
  
  // What appens on mouse enter event
  const mouseEnterHandler = e => {
    let el;
    if (typeof e === "undefined") {
      el = moveContainer;
    } else {
      el = e.target;
    }
  
    if (distance > distanceLimit && !timer) {
      moveLoop($plane);
    }
  };
  const moveLoop = $el => {
    // handle undefined
    if (typeof $el === "undefined") {
      $el = $plane;
    }
    move($el);
    timer = setTimeout($el => {
      moveLoop($el);
    }, refreshDelay);
  };