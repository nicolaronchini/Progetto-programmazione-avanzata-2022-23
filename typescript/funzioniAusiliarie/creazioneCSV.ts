var fs = require('fs');

export function creaCSVStats(filePath: string, data: any[]) {
  const righe = data.map(item => {
    const segnalazione = item.segnalazione;
    const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.stato, item.occorrenze];
    return riga.join(',');
  });
  const csv = ['tipologia,severità,stato,occorrenze', ...righe].join('\n');
  fs.writeFileSync(filePath, csv, 'utf8');
};

export function creaCSVRicerca(filePath: string, data: any[]) {
    const righe = data.map(item => {
      const segnalazione = item.segnalazione;
      const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.distanza];
      return riga.join(',');
    });
    const csv = ['tipologia,severità,distanza', ...righe].join('\n');
    fs.writeFileSync(filePath, csv, 'utf8');
  };

  export function creaCSVClustering(filePath: string, data: any[]) {
    const righe = data.map(item => {
      const segnalazione = item.segnalazione;
      const riga = [segnalazione.tipologia, segnalazione.severità, segnalazione.numeroCluster];
      return riga.join(',');
    });
    const csv = ['tipologia,severità,numeroCluster', ...righe].join('\n');
    fs.writeFileSync(filePath, csv, 'utf8');
  };