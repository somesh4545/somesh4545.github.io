// to handle the navigation bar
function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

// to track the mouse position and try to add particles effect to it
const body = document.body;

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  // Use event.pageX / event.pageY here
  const x = event.pageX,
    y = event.pageY;

  createParticles(x, y);
}
let mousex = 0,
  mousey = 0;

let colorsArr = ["#023246", "#88bdbc", "#112d32", "#112d32"];
// let colorsArr = ["#023246"];

function createParticles(x, y) {
  let diff = Math.abs(mousex - x) + Math.abs(mousey - y);
  if (diff < 20) return;
  mousex = x;
  mousey = y;

  createDot(x, y);
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      const randomDistance = Math.floor(Math.random() * (30 + 1));
      const dx = Math.floor(Math.random() * (randomDistance + 1));
      const dy = randomDistance - dx;

      // Randomly choose the direction for both dx and dy
      const dxDirection = Math.random() < 0.5 ? dx : -dx;
      const dyDirection = Math.random() < 0.5 ? dy : -dy;

      // Calculate new position
      // positions.push([x + dxDirection, y + dyDirection]);

      // Calculate new position
      createDot(x + dxDirection, y + dyDirection);
    }
  }, 50);
}

function createDot(x, y) {
  const dot = document.createElement("div");
  body.appendChild(dot);
  dot.className = "dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";
  dot.style.backgroundColor =
    colorsArr[Math.floor(Math.random() * colorsArr.length)];

  setTimeout(() => {
    dot.style.transform = "scale(0.5)";
    setTimeout(() => {
      body.removeChild(dot);
    }, 100);
  }, 200);
}

// function for smooth redirection to given section
function redirectTo(id) {
  var element = document.getElementById(id);
  var top = element.getBoundingClientRect().top;
  console.log(element);
  console.log(top);
  window.scroll(0, window.scrollY + top-70);
}
