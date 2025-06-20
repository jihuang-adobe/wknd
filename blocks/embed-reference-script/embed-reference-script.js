export default function decorate(block) {
  const anchorElements = block.querySelectorAll('a');

  [...anchorElements].forEach((anchorElement) => {
    const scriptReference = document.createElement('script');
    scriptReference.setAttribute('type', 'text/javascript');
    scriptReference.setAttribute('src', anchorElement.href);

    block.parentElement.append(scriptReference);
  });
}
