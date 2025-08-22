import { getFutureDateByMonthInFormatMM_YYYY } from "pages/helpers/dateUtils";

export const creditCardValidData = {
    creditCardNumber: '1111-1111-1111-1111',
    creditCardExpirationDate: getFutureDateByMonthInFormatMM_YYYY(3),
    creditCardCvv: '123',
    creditCardHolderName: "Alex test"
}