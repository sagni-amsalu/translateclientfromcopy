import { useEffect, useRef } from "react";

const CENTER_COUNT = 12;
const RADIUS = 600;
const TOTAL_ROW = 3;

const PhotoSphere = (props) => {
  const el = useRef(null);
  const img = useRef(null);
  const animId = useRef(0);

  let rid;
  let mouseShift = 0;

  useEffect(() => {
    const items = el.current.children;
    if (items.length == 0) return;

    // Setup and distribute items in correct positions
    const angleDivision = ((90 / TOTAL_ROW) * Math.PI) / 180;
    let radius,
      ypos,
      rowItemsCount = CENTER_COUNT;
    let indexCount = 0;

    for (let k = 0; k < TOTAL_ROW; k++) {
      radius = RADIUS * Math.cos(k * angleDivision);
      ypos = RADIUS * Math.sin(-k * angleDivision);
      rowItemsCount = CENTER_COUNT / (k + 1);

      let angleUnit = 360 / rowItemsCount;

      for (let i = 0; i < rowItemsCount; i++) {
        const angleRad = (angleUnit * i * Math.PI) / 180;
        const xp = Math.cos(angleRad) * radius;
        const zp = Math.sin(angleRad) * radius;

        // Upper item
        const item = items[indexCount];
        item.className = "photosphere-item";
        item.style.transform = `translateY(${ypos}px) translateX(${xp}px) translateZ(${zp}px)`;
        indexCount++;

        // Lower item
        const item2 = items[indexCount];
        item2.className = "photosphere-item";
        item2.style.transform = `translateY(${-ypos}px) translateX(${xp}px) translateZ(${zp}px)`;
        indexCount++;

        // Save item data
        item.dataset.radius = item2.dataset.radius = radius.toString();
        item.dataset.angle = item2.dataset.angle = angleRad.toString();
        item.dataset.ypos = ypos.toString();
        item2.dataset.ypos = (-ypos).toString();
      }
    }

    // Update animation
    cancelAnimationFrame(animId.current);
    const updateFrame = () => {
      animId.current = requestAnimationFrame(updateFrame);

      const items = el?.current?.children;
      if (items?.length == 0) return;

      for (let i = 0; i < items?.length; i++) {
        const item = items[i];
        let angle = parseFloat(item.dataset.angle);
        const ypos = parseFloat(item.dataset.ypos);
        const radius = parseFloat(item.dataset.radius);
        angle += mouseShift;
        item.dataset.angle = angle.toString();
        const xp = Math.cos(angle) * radius;
        const zp = Math.sin(angle) * radius;
        item.style.transform = `translateY(${ypos}px) translateX(${xp}px) translateZ(${zp}px)`;
      }
    };
    updateFrame();

    // Calculate mouse shift
    const onMouseMove = (e) => {
      mouseShift = (e.clientX / window.innerWidth - 0.5) * 0.05;
    };
    document.body.addEventListener("mousemove", onMouseMove);
  }, [props.imageData]);

  const pickImage = (imgUrl) => {
    img.current.style.backgroundImage = `url(${imgUrl})`;
    img.current.style.transform = "scale(1, 1)";
  };

  return (
    <div className="container my-4">
      <div className="photosphere" ref={el}>
        {props.imageData.map((it, index) => (
          <div
            onClick={() => pickImage(it)}
            key={index}
            style={{ backgroundImage: `url(${it})` }}
            className="photosphere-item"
          ></div>
        ))}
      </div>
      <div
        onClick={() => {
          img.current.style.transform = "scale(0.0, 0.0)";
        }}
        className="image-display"
        ref={img}
      ></div>
    </div>
  );
};

export default PhotoSphere;
