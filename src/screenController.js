export function createScreenController() {
  return {
    createEmptyGrid
  }
  const content = `
    <p>Test</p<
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = content;

  const element = wrapper.firstElementChild;
  document.body.appendChild(element);
}