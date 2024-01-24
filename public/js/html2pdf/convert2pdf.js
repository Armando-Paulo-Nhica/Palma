document.getElementById('download-pdf').addEventListener('click', () => {
    const element = document.getElementById('receipt');
    html2pdf(element);
  });