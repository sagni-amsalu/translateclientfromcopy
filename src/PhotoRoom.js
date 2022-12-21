import { useEffect, useRef } from "react";

const ROTATE_SPEED = 0.25;
const SWAP_ANGLE = 90;

const PhotoRoom = (props) => {
  const el = useRef(null);

  // requestAnimationFrame handler
  const animId = useRef(0);

  // Transition states variables
  let currentAngle, swapIndex, nextIndex, nextAngle;

  useEffect(() => {
    // Reset current state angles
    currentAngle = 0;
    nextAngle = SWAP_ANGLE;

    // Construct wall items
    const walls = el.current.children;

    for (let i = 0; i < 4; i++) {
      const wall = walls[i];

      // Create wall item
      if (wall.children.length == 0) {
        const item = document.createElement("div");
        item.className = "wall-item";
        wall.appendChild(item);
      }
      // Apply image background
      const item = wall.firstChild;
      item.style.backgroundImage = `url(${props.imageData[i]})`;
    }

    // Track current wall to be swapped
    swapIndex = 0;
    // Track the next image in imageData
    nextIndex = 4;

    // Remove previous requestAnimationFrame
    cancelAnimationFrame(animId.current);

    // Rotate the room
    const updateFrame = () => {
      // Ignore empty data
      if (props.imageData.length == 0) return;

      // Rotate the room
      currentAngle += ROTATE_SPEED;
      el.current.style.transform = `translateZ(-100px) rotateY(${currentAngle}deg)`;

      // Swap wall image on checked angle
      if (currentAngle >= nextAngle) {
        nextAngle += SWAP_ANGLE;
        const theWall = walls[swapIndex].firstChild;
        theWall.style.backgroundImage = `url(${props.imageData[nextIndex]})`;

        // Increase indexes on every SWAP_ANGLE
        swapIndex++;
        nextIndex++;
        if (swapIndex >= 4) swapIndex = 0;
        if (nextIndex >= props.imageData.length) nextIndex = 0;
      }
      animId.current = requestAnimationFrame(updateFrame);
    };
    updateFrame();
  }, [props.imageData]);

  return (
    <div className="container">
      <div className="photo-room" ref={el}>
        <div className="room-wall back-wall"></div>
        <div className="room-wall right-wall"></div>
        <div className="room-wall front-wall"></div>
        <div className="room-wall left-wall"></div>
        <div className="room-wall top-wall"></div>
        <div className="room-wall bottom-wall"></div>
      </div>
    </div>
  );
};

export default PhotoRoom;
