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

        return {
            numerador : numerador,
            denominador : denominador
        }
    }

    resta(frac) {
        const numerador = (this.numerador * frac.denominador) - (this.denominador * frac.numerador);
        const denominador = this.denominador * frac.denominador;

        return {
            numerador : numerador,
            denominador : denominador
        }
    }

    multiplicacion(frac) {
        const numerador = this.numerador * frac.numerador;
        const denominador = this.denominador * frac.denominador;

        return {
            numerador : numerador,
            denominador : denominador
        }
    }

    division(frac) {
        const numerador = this.numerador * frac.denominador;
        const denominador = this.denominador * frac.numerador;

        return {
            numerador : numerador,
            denominador : denominador
        }
    }
}

const primeraFraccion = new Fraccion(1, 2);
const segundaFraccion = new Fraccion(1, 2);

document.getElementById('value_change').addEventListener('click', () => {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.value_form').style.display = 'flex';
});

window.onload = () => {
    primeraFraccion.htmlElement = document.querySelector('.first_fraccion');
    segundaFraccion.htmlElement = document.querySelector('.second_fraccion');

    primeraFraccion.changePageContent();
    segundaFraccion.changePageContent();
};