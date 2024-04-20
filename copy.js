document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const codeElement = btn.previousElementSibling;
    const text = codeElement.textContent;
    navigator.clipboard.writeText(text);
    btn.textContent = 'Copiato!';
    setTimeout(() => {
      btn.textContent = 'Copia';
    }, 2000);
  });
});
