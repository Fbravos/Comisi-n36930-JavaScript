class Pago {
    constructor(capitalMensual, interesMensual, pagoMensual) {
        this.capitalMensual = capitalMensual;
        this.interesMensual = interesMensual;
        this.pagoMensual = pagoMensual;
    }
}


class Simulator {
    constructor(capital, cuotas, interes) {
        this.capital = capital;
        this.cuotas = cuotas;
        this.interes = interes;
        this.pagoLista = new Array();
    }

    getCapital() {
        return this.capital;
    }

    setCapital(capital) {
        this.capital = capital;
    }

    getCuotas() {
        return this.cuotas;
    }

    setCuotas(cuotas) {
        this.cuotas = cuotas;
    }

    getInteres() {
        return this.interes;
    }

    setInteres(interes) {
        this.interes = interes;
    }

    showPagos() {
        let capitalTotal = 0;
        let interesTotal = 0;
        let pagoTotal = 0;
        const lista = [...this.pagoLista];
        lista.map((pago, index) => {
            capitalTotal = capitalTotal + Number(pago.capitalMensual);
            interesTotal = interesTotal + Number(pago.interesMensual);
            pagoTotal = pagoTotal + Number(pago.pagoMensual);
            document.getElementById("tab").innerHTML = document.getElementById("tab").innerHTML +
                `<tr>
                <td> ${index + 1}</td>
                <td> ${pago.capitalMensual}</td>
                <td> ${pago.interesMensual}</td>
                <td> ${pago.pagoMensual}</td>
            </tr>`;

        });

        document.getElementById("t1").innerHTML = capitalTotal.toFixed(2);
        document.getElementById("t2").innerHTML = interesTotal.toFixed(2);
        document.getElementById("t3").innerHTML = pagoTotal.toFixed(2);
    }

    generarPagos() {
        this.clearPagos();

        document.getElementById("tab").innerHTML = "";
        const response = this.validations();

        if (response) {
            const { capital, cuotas, interes } = response;
            this.setCapital(capital);
            this.setCuotas(cuotas);
            this.setInteres(interes);
        } else {
            document.getElementById("introduccion").innerHTML = 'Revisar Capital, Cuotas o Interes, los 3 deben ser números y mayores a cero.';
            return;
        }

        const introduccion = `Con un capital de S/.${this.getCapital()}, numero de cuotas de ${this.getCuotas()} y un interes de
                                ${this.getInteres()}%, se obtiene la siguiente simulacion:`;
        document.getElementById("introduccion").innerHTML = introduccion;

        let interesMensual = 0;
        let pagoMensual = 0;
        for (let i = 1; i <= this.getCuotas(); i++) {
            const pagos = this.getCapital() / this.getCuotas();
            const d1 = pagos.toFixed(2);
            interesMensual = ((this.getCapital() * this.getInteres()) / 100) / this.getCuotas();
            const d2 = interesMensual.toFixed(2);
            pagoMensual = pagos + interesMensual;
            const d3 = pagoMensual.toFixed(2);
            const pago = new Pago(d1, d2, d3);
            this.pagoLista.push(pago);
        }

        this.showPagos();
    }

    clearPagos() {
        this.pagoLista = new Array();
        document.getElementById("introduccion").innerHTML = '';
        document.getElementById("t1").innerHTML = '';
        document.getElementById("t2").innerHTML = '';
        document.getElementById("t3").innerHTML = '';
    }

    validations() {
        const capital = Number(document.getElementById("capital").value);
        const cuotas = Number(document.getElementById("cuota").value);
        const interes = Number(document.getElementById("interes").value);

        if (typeof capital === 'number' && typeof cuotas === 'number' && typeof interes === 'number') {
            return (capital > 0 && cuotas > 0 && interes > 0) ? ({ capital, cuotas, interes }) : null;
        } else {
            return null;
        }
    }

}

const simulador = new Simulator();