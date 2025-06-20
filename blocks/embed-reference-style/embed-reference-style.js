export default function decorate(block) {
  const anchorElements = block.querySelectorAll('a');

  [...anchorElements].forEach((anchorElement) => {
    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('href', anchorElement.href);

    block.parentElement.append(styleLink);
  });
}
