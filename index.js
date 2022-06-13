class Fraccion {
    constructor(numerador, denominador) {
        this.numerador = numerador;
        this.denominador = denominador;
        this.pageElement = undefined;
    }

    get decimal() {
        return this.numerador / this.denominador;
    }

    get valorAbsoluto() {
        if((this.numerador < 0 || this.denominador < 0) && !(this.numerador < 0 && this.denominador < 0)) {
            return {
                numerador : this.numerador < 0 ? -this.numerador : this.numerador,
                denominador : this.denominador < 0 ? -this.denominador : this.denominador
            }
        }
    }

    set htmlElement(element) {
        this.pageElement = element;
    }

    changePageContent() {
        this.pageElement.innerHTML = `
            ${this.numerador}<br>
            -<br>
            ${this.denominador}
        `
    }

    suma(frac) {
        const numerador = (this.numerador * frac.denominador) + (this.denominador * frac.numerador);
        const denominador = this.denominador * frac.denominador;

        return this.simplificar({
            numerador : numerador,
            denominador : denominador
        })
    }

    resta(frac) {
        const numerador = (this.numerador * frac.denominador) - (this.denominador * frac.numerador);
        const denominador = this.denominador * frac.denominador;

        return this.simplificar({
            numerador : numerador,
            denominador : denominador
        })
    }

    multiplicacion(frac) {
        const numerador = this.numerador * frac.numerador;
        const denominador = this.denominador * frac.denominador;

        return this.simplificar({
            numerador : numerador,
            denominador : denominador
        })
    }

    division(frac) {
        const numerador = this.numerador * frac.denominador;
        const denominador = this.denominador * frac.numerador;

        return this.simplificar({
            numerador : numerador,
            denominador : denominador
        })
    }

    simplificar(frac) {
        let numerador;
        let denominador;
        let simplificado = false;

        if(frac.numerador > frac.denominador) {
            for(let i = 0; !simplificado; i++) {
                if((frac.numerador % (frac.denominador - i) == 0) && (frac.denominador % (frac.denominador - i) == 0)) {
                    numerador = frac.numerador / (frac.denominador - i);
                    denominador = frac.denominador / (frac.denominador - i);
                    simplificado = true;
                } else if(i === frac.denominador) {
                    return {
                        numerador : frac.numerador,
                        denominador : frac.denominador
                    }
                }
            }
        } else {
            for(let i = 0; !simplificado; i++) {
                if((frac.denominador % (frac.numerador - i) == 0) && (frac.numerador % frac.numerador - i == 0)) {
                    numerador = frac.numerador / (frac.numerador - i);
                    denominador = frac.denominador / (frac.numerador - i);
                    simplificado = true;
                } else if(i === frac.numerador) {
                    return {
                        numerador : frac.numerador,
                        denominador : frac.denominador
                    }
                }
            }
        }

        return {
            numerador : numerador,
            denominador : denominador
        }
    }
}

const primerFraccion = new Fraccion(1, 2);
const segundaFraccion = new Fraccion(1, 2);

const buttons = {
    suma : document.getElementById('suma'),
    multiplicacion : document.getElementById('multiplicacion')
}

document.getElementById('value_change').addEventListener('click', () => {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.value_form').style.display = 'flex';
});

document.getElementById('value_submit').addEventListener('click', () => {
    primerFraccion.numerador = document.querySelector('#first_frac_num') ? Number(document.querySelector('#first_frac_num').value) : primerFraccion.numerador;
    primerFraccion.denominador = document.querySelector('#first_frac_den') ? Number(document.querySelector('#first_frac_den').value) : primerFraccion.denominador;
    segundaFraccion.numerador = document.querySelector('#second_frac_num') ? Number(document.querySelector('#second_frac_num').value) : segundaFraccion.numerador;
    segundaFraccion.denominador = document.querySelector('#second_frac_den') ? Number(document.querySelector('#second_frac_den').value) : segundaFraccion.denominador;
    document.querySelector('.value_form').style.display = 'none';
    document.querySelector('.container').style.display = 'flex';

    primerFraccion.changePageContent();
    segundaFraccion.changePageContent();
});

buttons.suma.addEventListener('click', () => {
    document.querySelector('.output__sign').innerHTML = `
        ${primerFraccion.suma(segundaFraccion).numerador}<br>
        -<br>
        ${primerFraccion.suma(segundaFraccion).denominador}
    `;
});

buttons.multiplicacion.addEventListener('click', () => {
    document.querySelector('.output__sign').innerHTML = `
        ${primerFraccion.multiplicacion(segundaFraccion).numerador}<br>
        -<br>
        ${primerFraccion.multiplicacion(segundaFraccion).denominador}
    `;
});

window.onload = () => {
    primerFraccion.htmlElement = document.querySelector('.first_fraccion');
    segundaFraccion.htmlElement = document.querySelector('.second_fraccion');

    primerFraccion.changePageContent();
    segundaFraccion.changePageContent();
};