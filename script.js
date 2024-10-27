//seleted the elements
const htmlCodeInput = document.getElementById('html-code');
const cssCodeInput = document.getElementById('css-code');
const jsCodeInput = document.getElementById('js-code');
const output = document.querySelector('#output');
const outputContainer = document.querySelector('.output-container');
const resizers = document.querySelectorAll('.resizer');
const heightResizers = document.querySelector('#height-resizer');
const container = document.querySelector('.container');
const inputContainer = document.querySelector('.input-container')
const themeToggle = document.querySelector('#theme-toggle')


const buildingEditor = () => {
    const htmlValue = htmlCodeInput.value;
    const cssValue = cssCodeInput.value;
    const jsValue = jsCodeInput.value;
    output.contentDocument.body.innerHTML = htmlValue + '<style>' + cssValue + '</style>';
    output.contentWindow.eval(jsValue)
}

resizers.forEach((resizer) => {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const prevValue = resizer.previousElementSibling;

        const mouseMoving = (e) => {
            const clientHeight = resizer.parentElement.clientHeight;
            const createHeight = (e.clientY / clientHeight) * 100;
            if (createHeight > 10 && createHeight < 90) prevValue.style.flex = `0 0 ${createHeight}%`;


        }
        const mouseUp = () => {
            document.removeEventListener('mousemove', mouseMoving);
            document.removeEventListener('mouseup', mouseUp)
        }

        document.addEventListener('mousemove', mouseMoving)
        document.addEventListener('mouseup', mouseUp)

    })
})

//height resizers 
heightResizers.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const onMouseMove = (e) => {
        const clientWidth = container.clientWidth;
        const createWidth = ((e.clientX / clientWidth) * 100).toFixed(2);

        if (createWidth > 20 && createWidth < 80) {
            inputContainer.style.width = `${createWidth}%`;
            outputContainer.style.width = `${100 - createWidth}%`
        }
    }
    const mouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', mouseUp)
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', mouseUp)
})

//theme
themeToggle.addEventListener('click', () => {
    container.classList.toggle('dark-mode');
    themeToggle.innerHTML = container.classList.contains('dark-mode')
        ? '<i class="fa-solid fa-moon"></i> Dark Mode'
        : '<i class="fa-solid fa-sun"></i> Light Mode';
})


htmlCodeInput.addEventListener('keyup', buildingEditor)
cssCodeInput.addEventListener('keyup', buildingEditor)
jsCodeInput.addEventListener('keyup', buildingEditor)