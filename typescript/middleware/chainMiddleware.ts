import * as fun from './middleware_function'
import * as autjwt from './autorizzazioneJWT'

export const JWT = [
    autjwt.checkHeader, 
    autjwt.checkToken, 
    autjwt.verifyAndAuthenticate
];

export const VerificaCreazione = [
    fun.verificaEsistenza,
    fun.verificaNumToken,
    fun.checkTipologia,
    fun.checkData,
    fun.checkSeverita,
    fun.checkLatitudine,
    fun.checkLongitudine
];

export const VerificaModifica = [
    fun.verificaEsistenza,
    fun.verificaNumToken,
    fun.verificaEsistenzaSegn,
    fun.campiNonAcc,
    fun.ModTipologia,
    fun.ModSeverita,
    fun.ModLatitudine,
    fun.ModLongitudine,
    fun.checkData
];

export const VerificaCancellazione = [
    fun.verificaEsistenza,
    fun.verificaNumToken,
    fun.verificaEsistenzaSegn,
    fun.checkEmailCanc
];

export const VerificaFiltro = [
    fun.verificaEsistenza,
    fun.checkStato,
    fun.checkOrdineDate
];

export const VerificaAgg = [
    fun.verificaEsistenza,
    fun.verificaAdmin,
    fun.checkIdValAdmin
];

export const VerificaGrad = [
    fun.verificaEsistenza,
    fun.checkOrdinamento
];

export const VerificaStats = [
    fun.verificaEsistenza,
    fun.checkFormato
];

export const VerificaRic = [
    fun.verificaEsistenza,
    fun.checkLatitudine,
    fun.checkLongitudine,
    fun.checkOrdineDate,
    fun.checkRaggio,
    fun.checkFormato
];

export const VerificaCluster = [
    fun.verificaEsistenza,
    fun.checkRaggio,
    fun.checkFormato
];

export const VerificaRefill = [
    fun.verificaEsistenza,
    fun.verificaAdmin
];