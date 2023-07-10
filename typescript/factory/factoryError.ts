import * as Message from './messaggi'

interface ErrorObj {
    getErrorObj(): { status: number,  msg: string };
}

class NoAuthHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.noAuthHeader
        }
    }
}

class NoBearerHeaderError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.noBearerHeader
        }
    }
}

class InvalidKey implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 403,
            msg: Message.chiaveSbagliata
        }
    }
}

class NoToken implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: Message.tokenInsuff
        }
    }
}

class NoPermessi implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 401,
            msg: Message.permessiAdmin
        }
    }
}

class userNonTrovato implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.utenteNonTrovato
        }
    }
}

class InternalServerError implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 500,
            msg: Message.internalServerError_message
        }
    }
}

class NoMail implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.mailNonTrovata
        }
    }
}

class ErrOrdinamento implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.erroreOrd
        }
    }
}

class ErroreStato implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.erroreStato
        }
    }
}

class EsistenzaSegn implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 404,
            msg: Message.segnNonTrovata
        }
    }
}

class NoId implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.IdNonSpec
        }
    }
}

class formatoDate implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoDate
        }
    }
}

class EsistenzaDate implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaDate
        }
    }
}

class erroreFile implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoFile
        }
    }
}

class esistenzaFile implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaFormatoFile
        }
    }
}

class erroreLat implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoLat
        }
    }
}

class esistenzaFormatoLat implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaFormatoLat
        }
    }
}

class erroreLong implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoLong
        }
    }
}

class esistenzaLong implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaFormatoLong
        }
    }
}

class erroreTipo implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoTip
        }
    }
}

class esistenzaTipo implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaTip
        }
    }
}

class erroreSev implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoSev
        }
    }
}

class esistenzaSev implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaSev
        }
    }
}

class erroreRaggio implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.formatoRaggio
        }
    }
}

class esistenzaRaggio implements ErrorObj {
    getErrorObj(): { status: number,  msg: string } {
        return {
            status: 400,
            msg: Message.esistenzaRaggio
        }
    }
}

export enum ErrorEnum {
    noAuth,
    noBearer,
    invKey,
    noToken,
    NoPermessi,
    NoUser,
    NoMail,
    ErrOrd,
    ErrStato,
    EsSegn,
    NoId,
    FormDate,
    EsDate,
    errFile,
    esFile,
    errLat,
    esLat,
    errLong,
    esLong,
    errTip,
    esTip,
    errSev,
    esSev,
    errRaggio,
    esRaggio,
    InternalServer
}

export function getError(type: ErrorEnum): ErrorObj{
    let retval: ErrorObj = null;
    switch (type){
        case ErrorEnum.noAuth:
            retval = new NoAuthHeaderError();
            break;
        case ErrorEnum.noBearer:
            retval = new NoBearerHeaderError();
            break;
        case ErrorEnum.invKey:
            retval = new InvalidKey();
            break;
        case ErrorEnum.noToken:
            retval = new NoToken();
            break;
        case ErrorEnum.NoPermessi:
            retval = new NoPermessi();
            break;
        case ErrorEnum.NoUser:
            retval = new userNonTrovato();
            break;
        case ErrorEnum.NoMail:
            retval = new NoMail();
            break;
        case ErrorEnum.ErrOrd:
            retval = new ErrOrdinamento();
            break;
        case ErrorEnum.ErrStato:
            retval = new ErroreStato();
            break;
        case ErrorEnum.EsSegn:
            retval = new EsistenzaSegn();
            break;
        case ErrorEnum.NoId:
            retval = new NoId();
            break;
        case ErrorEnum.FormDate:
            retval = new formatoDate();
            break;
        case ErrorEnum.EsDate:
            retval = new EsistenzaDate();
            break;
        case ErrorEnum.errFile:
            retval = new erroreFile();
            break;
        case ErrorEnum.esFile:
            retval = new esistenzaFile();
            break;            
        case ErrorEnum.errLat:
            retval = new erroreLat();
            break;
        case ErrorEnum.esLat:
            retval = new esistenzaFormatoLat();
            break;
        case ErrorEnum.errLong:
            retval = new erroreLong();
            break;
        case ErrorEnum.InternalServer:
            retval = new InternalServerError();
            break;
        case ErrorEnum.esLong:
            retval = new esistenzaLong();
            break;
        case ErrorEnum.errTip:
            retval = new erroreTipo();
            break; 
        case ErrorEnum.esTip:
            retval = new esistenzaTipo();
            break;  
        case ErrorEnum.errSev:
            retval = new erroreSev();
            break;  
        case ErrorEnum.esSev:
            retval = new esistenzaSev();
            break;
        case ErrorEnum.errRaggio:
            retval = new erroreRaggio();
            break;  
        case ErrorEnum.esRaggio:
            retval = new esistenzaRaggio();
            break;         
    }
    return retval;
}