const lightMode = document.getElementById('light-mode');

lightMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});