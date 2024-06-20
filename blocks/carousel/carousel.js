export default function decorate(block) {
  const buttons = document.createElement('div');
  buttons.className = 'carousel-buttons';
  [...block.children].forEach((row, i) => {
    console.log(row);
    console.log(i);
    const totalColumnCount = [...row.children].length;
    [...row.children].forEach((column, columnIndex) => {
      if(columnIndex+1 != totalColumnCount) {
        column.classList.add(`carousel-image`);
      } else {
        column.classList.add(`carousel-text`);
      }
    });
    /* buttons */
    const button = document.createElement('button');
    button.title = 'Carousel Nav';
    if (!i) button.classList.add('selected');
    button.addEventListener('click', () => {
      block.scrollTo({ top: 0, left: row.offsetLeft - row.parentNode.offsetLeft, behavior: 'smooth' });
      [...buttons.children].forEach((r) => r.classList.remove('selected'));
      button.classList.add('selected');
    });
    buttons.append(button);
  });
  block.parentElement.append(buttons);
}
