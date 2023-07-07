var fs = require('fs');

/**
 * Funzione: creaCSVStats
 * 
 * Funzione adibita alla creazione del file csv per la funzione statistiche() del controller
 * 
 *  @param filePath nome del file da creare
 *  @param data oggetto JSON contenente i dati da visualizzare
 */
export function creaCSVStats(filePath: string, data: any[]) {
  const righe = data.map(item => {
    const segnalazione = item.segnalazione;
    const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.stato, item.occorrenze];
    return riga.join(',');
  });
  const csv = ['tipologia,severità,stato,occorrenze', ...righe].join('\n');
  fs.writeFileSync(filePath, csv, 'utf8');
};

/**
 * Funzione: creaCSVRicerca
 * 
 * Funzione adibita alla creazione del file csv per la funzione ricerca() del controller
 * 
 *  @param filePath nome del file da creare
 *  @param data oggetto JSON contenente i dati da visualizzare
 */
export function creaCSVRicerca(filePath: string, data: any[]) {
  const righe = data.map(item => {
    const segnalazione = item.segnalazione;
    const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.distanza];
    return riga.join(',');
  });
  const csv = ['tipologia,severità,distanza', ...righe].join('\n');
  fs.writeFileSync(filePath, csv, 'utf8');
};

/**
 * Funzione: creaCSVClustering
 * 
 * Funzione adibita alla creazione del file csv per la funzione clustering() del controller
 * 
 *  @param filePath nome del file da creare
 *  @param data oggetto JSON contenente i dati da visualizzare
 */
export function creaCSVClustering(filePath: string, data: any[]) {
  const righe = data.map(item => {
    const segnalazione = item.segnalazione;
    const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.numeroCluster];
    return riga.join(',');
  });
  const csv = ['tipologia,severità,numeroCluster', ...righe].join('\n');
  fs.writeFileSync(filePath, csv, 'utf8');
};