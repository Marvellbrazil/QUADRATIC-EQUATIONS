const quadraticEquations = document.getElementById('quadraticEquations');
let inputBy = document.getElementById('combo');

var a = document.getElementById('valueA');
var b = document.getElementById('valueB');
var c = document.getElementById('valueC');
var root1 = document.getElementById('root1');
var root2 = document.getElementById('root2');

document.body.addEventListener('input', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'text') {
        let value = e.target.value;
        e.target.value = value.replace(/[^0-9]/, '');
    }
});

function changeInputBy() {
    if (inputBy.value === "byValues") {
        document.querySelectorAll('#root1, #root2').forEach(element => {
            element.setAttribute('readonly', true);
            element.style.cursor = 'text';
            element.value = '0';
        });
        document.querySelectorAll('#valueA, #valueB, #valueC').forEach(element => {
            element.removeAttribute('readonly');
            element.style.cursor = 'text';
        });
        document.querySelectorAll('.negate-values').forEach(element => {
            element.disabled = false;
            element.style.cursor = 'pointer';
        });
        document.querySelectorAll('.negate-roots').forEach(element => {
            element.disabled = true;
            element.style.cursor = 'default';
        });
    } else {
        document.querySelectorAll('#root1, #root2').forEach(element => {
            element.removeAttribute('readonly');
            element.style.cursor = 'text';
        });
        document.querySelectorAll('#valueA, #valueB, #valueC').forEach(element => {
            element.setAttribute('readonly', true);
            element.style.cursor = 'pointer';
            element.value = '0';
            document.getElementById('valueA').value = '1';
            document.getElementById('quadraticEquations').innerHTML = `${a.value}x² + ${b.value}x + ${c.value} = 0`;
        });
        document.querySelectorAll('.negate-values').forEach(element => {
            element.disabled = true;
            element.style.cursor = 'default';
        });
        document.querySelectorAll('.negate-roots').forEach(element => {
            element.disabled = false;
            element.style.cursor = 'pointer';
        });
    }
}

document.getElementById('combo').addEventListener('change', changeInputBy());

function negate(id) {
    let element = document.getElementById(id);
    if (Math.sign(element.value) === 1) {
        element.value = -Math.abs(element.value);
    } else {
        element.value = Math.abs(element.value);
    }

    update(element);
}

function update(id){
    if (id  === a){
        if (a.value < 0){
            quadraticEquations.innerHTML = `- ${Math.abs(a.value)}x² + ${b.value}x + ${c.value} = 0`;
        } else {
            quadraticEquations.innerHTML = `${a.value}x² + ${b.value}x + ${c.value} = 0`;
        }
    } else if(id === b){
        if (b.value < 0){
            quadraticEquations.innerHTML = `${a.value}x² - ${Math.abs(b.value)}x + ${c.value} = 0`;
        } else {
            quadraticEquations.innerHTML = `${a.value}x² + ${b.value}x + ${c.value} = 0`;
        }
    } else if(id === c){
        if (c.value < 0){
            quadraticEquations.innerHTML = `${a.value}x² + ${b.value}x - ${Math.abs(c.value)} = 0`;
        } else {
            quadraticEquations.innerHTML = `${a.value}x² + ${b.value}x + ${c.value} = 0`;
        }
    }
}

function calculate() {
    if (inputBy.value === "byValues") {
        const D = (Math.sqrt(b.value ** 2 - (4 * a.value * c.value)));
        const x1 = ((b.value * -1) + D) / (2 * a.value);
        const x2 = ((b.value * -1) - D) / (2 * a.value);

        if (isNaN(x1) || isNaN(x2)) {
            alert("Current Discriminant is not allowed. Please check your input values.");
        } else {
            root1.value = x1;
            root2.value = x2;
        }
    } else {
        a.value = 1;
        b.value = -(parseInt(root1.value) + parseInt(root2.value));
        c.value = root1.value * root2.value;

        if (b.value < 0 && c.value < 0){
            quadraticEquations.innerHTML = `- x² - ${Math.abs(b.value)}x - ${Math.abs(c.value)} = 0`;
        } else if (b.value < 0){
            quadraticEquations.innerHTML = `x² - ${Math.abs(b.value)}x + ${c.value} = 0`;
        } else if (c.value < 0){
            quadraticEquations.innerHTML = `$x² + ${b.value}x - ${c.value} = 0`;
        } else {
            quadraticEquations.innerHTML = `x² + ${b.value}x + ${c.value} = 0`;
        }
    }
}

function mode(){
    if (document.body.style.backgroundColor === 'white'){
        document.body.style.backgroundColor = '#303030';
        document.getElementById('contact').style.color = 'white';
        document.getElementById('follow').style.color = 'white';
        document.body.style.transitionDuration = '1s';
        document.body.style.color = 'white';
        document.getElementById('mode').innerHTML = 'Light';
    } else {
        document.body.style.backgroundColor = 'white';
        document.getElementById('contact').style.color = 'black';
        document.getElementById('follow').style.color = 'black';
        document.body.style.transitionDuration = '1s';
        document.body.style.color = 'black';
        document.getElementById('mode').innerHTML = 'Dark';
    }
}

function copyToClipboard() {
    let copyText = document.getElementById('quadraticEquations');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert('Copied to Clipboard!');
    copyText.setSelectionRange(0, 0);
    copyText.select() = false;
}