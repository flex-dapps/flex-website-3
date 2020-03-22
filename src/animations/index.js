export function typewriter(node, { speed = 150 }) {
  const valid =
    node.childNodes.length === 1 && node.childNodes[0].nodeType === 3;

  const text = node.textContent;
  const duration = text.length * speed;

  return {
    duration,
    tick: t => {
      const i = ~~(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
