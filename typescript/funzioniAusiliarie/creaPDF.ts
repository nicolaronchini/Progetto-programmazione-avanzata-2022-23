import { jsPDF } from "jspdf";

/**
 * Funzione: StatsPDF
 * 
 * Funzione adibita alla creazione del file pdf per la funzione statistiche() del controller
 * 
 * @param data oggetto JSON contenente i dati da visualizzare
 */
export async function StatsPDF(data:any) {
    var doc = new jsPDF();
    data.forEach(function(segnalazione, i){
    doc.text(
        "Tipologia: " + segnalazione.segnalazione.tipologia +
        "\nSeverità: " + segnalazione.segnalazione.severità + 
        "\nStato: " + segnalazione.segnalazione.stato + 
        "\nOccorrenze di questo tipo di segnalazioni: " + segnalazione.occorrenze + "\n",20, 10 + (i * 30), );
    });
    doc.save("statistiche.pdf");
};

/**
 * Funzione: DistanzaPDF
 * 
 * Funzione adibita alla creazione del file pdf per la funzione ricerca() del controller
 * 
 * @param data oggetto JSON contenente i dati da visualizzare
 */
export async function DistanzaPDF(data:any) {
    var doc = new jsPDF();
    data.forEach(function(segnalazione, i){
    doc.text(
        "Tipologia: " + segnalazione.segnalazione.tipologia +
        "\nSeverità: " + segnalazione.segnalazione.severità + 
        "\nDistanza: " + segnalazione.segnalazione.distanza + "\n",20, 10 + (i * 30), );
    });
    doc.save("filtroPerDistanza.pdf");
};

/**
 * Funzione: ClusterPDF
 * 
 * Funzione adibita alla creazione del file pdf per la funzione clustering() del controller
 * 
 * @param data oggetto JSON contenente i dati da visualizzare
 */
export async function ClusterPDF(data:any) {
    var doc = new jsPDF();
    data.forEach(function(segnalazione, i){
    doc.text(
        "Tipologia: " + segnalazione.segnalazione.tipologia +
        "\nSeverità: " + segnalazione.segnalazione.severità + 
        "\nNumero cluster: " + segnalazione.segnalazione.numeroCluster + "\n",20, 10 + (i * 30), );
    });
    doc.save("clusters.pdf");
};