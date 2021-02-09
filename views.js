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

  const changeSpeed = () => {
  let maxRadius = halfContainerW;
  if (halfContainerH > halfContainerW) {
    maxRadius = halfContainerH;
  }
  speedPercentage = Math.ceil(distance / (maxRadius - distanceLimit) * 100);

  let speed =
    refreshBase +
    refreshDelta -
    Math.ceil(speedPercentage / speedFactor) +
    refreshBase;
// hadle speed range
  if (speed < refreshBase) {
    speed = refreshBase;
  }
  if (speed > refreshBase + refreshDelta) {
    speed = refreshBase + refreshDelta;
  }

  refreshDelay = speed;
};
// Calculate distance from element center
const calculateDistance = (elem, mouseX, mouseY) => {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (getOffset(elem).left + elem.clientWidth / 2), 2) +
        Math.pow(mouseY - (getOffset(elem).top + elem.clientHeight / 2), 2)
    )
  );
};
// Get element offsets
const getOffset = el => {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
};
// Mouse move actions
const mouseMoveHandler = e => {
  mX = e.pageX;
  mY = e.pageY;
  distance = calculateDistance(moveContainer, mX, mY);

  mouseX = mX - getOffset(moveContainer).left - halfContainerW;
  mouseY = mY - getOffset(moveContainer).top - halfContainerH;

  xForward = mouseX < 0;
  yForward = mouseY < 0;
// Get max distance radius
  changeSpeed();

  // Stand-by area
  if (distance <= distanceLimit) {
    mouseLeaveHandler();
  } else {
    mouseEnterHandler();
  }
};
// Move element 2D
const move = (el, x, y) => {
  //  tY = tY + incr;
  let signedIncr = incr;

  if (typeof x === "undefined" || typeof y === "undefined") {
    // X
    const xBackwardLimit = Math.ceil(moveContainer.clientWidth * 2 * -1);
    if (tX < 0 && tX > xBackwardLimit) {
      if (Math.abs(mouseX) > axisTreshold) {
        if (!xForward) {
          signedIncr = incr * -1;
        } else {
          signedIncr = incr;
        }
        tX = tX + signedIncr;
      }
    } else {
      tX = Math.ceil(moveContainer.clientWidth * -1);
    }
    // Y
    const yBackwardLimit = Math.ceil(moveContainer.clientHeight * 2 * -1);
    if (tY < 0 && tY > yBackwardLimit) {
      if (Math.abs(mouseY) > axisTreshold) {
        if (!yForward) {
          signedIncr = incr * -1;
        } else {
          signedIncr = incr;
        }
        tY = tY + signedIncr;
      }
    } else {
      tY = Math.ceil(moveContainer.clientHeight * -1);
    }
  } else {
    tX = x;
    tY = y;
  }
  var transform = "translate3d(" + tX + "px," + tY + "px,0px)";
  el.style.transform = transform;
  el.style.webkitTransform = transform;
  el.style.mozTransform = transform;
};
