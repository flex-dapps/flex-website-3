export function glitchCounter(ctx, height, width) {
  let unit = width / 5;
  ctx.font = `${height / 2}px VT323`;
  ctx.textAlign = "center";
  ctx.textBaseline = "hanging";

  let random = JSON.stringify(Math.round(Math.random() * 99999) + 10000);
  let arr = [...random];
  arr.map((num, i) => {
    ctx.fillText(num, i * unit + unit / 2, 0);
  });
}

export function glitchMarquee(ctx, height, width) {
  ctx.textAlign = "left";
  let _arr = [];
  let glitchText;
  while (_arr.length < 10) {
    let char = JSON.stringify(Math.round(Math.random()));
    _arr.push(char);
  }
  let _glitchText = _arr.toString();
  glitchText = _glitchText.replace(/,/g, " ");
  // printing glitchy text
  ctx.font = `${height / 4}px VT323`;
  ctx.fillText(glitchText, 0, height / 2);
  ctx.fillText(glitchText, width / 3.7 - width, height / 1.3);
}

export function counter(ctx, height, width, number) {
  let unit = width / 5;
  ctx.font = `${height / 2}px VT323`;
  ctx.textAlign = "center";
  ctx.textBaseline = "hanging";
  ctx.clearRect(0, 0, width, height);
  let arr = [...number];
  arr.map((num, i) => {
    ctx.fillText(num, i * unit + unit / 2, 0);
  });
}

export function marquee(ctx, height, width, message, t) {
  let fontSize = height / 3;
  let messageLength = [...message].length * fontSize;
  let unit = width / 200;
  ctx.font = `${fontSize}px VT323`;
  ctx.textAlign = "left";
  let marquee = message
    .concat(message)
    .concat(message)
    .concat(message)
    .concat(message)
    .concat(message)
    .concat(message);
  ctx.fillText(marquee, width - t * unit, height / 2);
}
