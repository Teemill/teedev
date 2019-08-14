import { Vector } from '@teedev/core';

const memeNodes: {
  done: boolean,
  bounds: ClientRect,
  element: HTMLElement,
  random: { x: number, y: number },
}[] = [];

export default (elm: HTMLElement) => {
  const walk = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );

  let node: Node | null;
  const nodes: Node[] = [];

  while(node = walk.nextNode()) {
    nodes.push(node);
  }

  nodes.forEach((node) => {
    const text = node.textContent;

    if (text) {
      const charNodes: (Node | string)[] = [];

      text
        .split('')
        .forEach((char) => {
          if (char.match(/[\S]/)) {
            const charNode = document.createElement('span');

            charNode.innerText = char;
            charNode.classList.add('meme');
            charNode.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-in';
            charNode.style.display = 'inline-block';
        
            charNodes.push(charNode);
            memeNodes.push({
              done: false,
              bounds: charNode.getBoundingClientRect(),
              element: charNode,
              random: {
                x: (Math.random() * 100) - 50,
                y: (Math.random() * 100) - 50,
              },
            });
          } else {
            charNodes.push(char);
          }

        });

      node.replaceWith(
        ...charNodes,
      );

      window.requestAnimationFrame(() => {
        memeNodes.forEach((node) => {
          node.bounds = node.element.getBoundingClientRect();
        });
      });
    }
  });

  window.meme = () => {
    console.log(memeNodes);

    memeNodes.forEach((node) => {
      const x = (Math.random() * 2) - 1;
      const y = (Math.random() * 2) - 1;

      node.element.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  window.addEventListener('mousemove', (e) => {
    const mousePos: Vector = new Vector(e.x, e.y);

    window.requestAnimationFrame(() => {
      const range = 100;
      const hRange = range / 2;

      memeNodes.forEach((node) => {
        if (!node.done) {
          node.bounds = node.element.getBoundingClientRect();

          if (
            mousePos.x < node.bounds.right + hRange &&
            mousePos.x > node.bounds.left - hRange &&
            mousePos.y < node.bounds.bottom + hRange &&
            mousePos.y > node.bounds.top - hRange
          ) {
            const elmPos: Vector = new Vector(
              node.bounds.left,
              node.bounds.top,
            );

            const distance = mousePos
              .copy()  
              .subtract(elmPos)
              .getMagnitude();

            // const test = Math.max(10 - (distance * 0.1), 0) * 0.1;

            // node.element.style.color = 'green';
            // node.element.style.transform = `
            //   translate(
            //     ${node.random.x * test}px,
            //     ${node.random.y * test}px
            //   )
            // `;

            if (distance < hRange) {
              node.done = true;
              node.element.style.opacity = '0';
              node.element.style.transform = `
                translate(
                  0px,
                  200px
                )

                rotate(${(Math.random() * 90) - 45}deg)
              `;
            }
          } else {
            // node.element.style.color = 'red';
            // node.element.style.transform = 'translate(0px, 0px)';
          }
        }
      });
    });
  });
};