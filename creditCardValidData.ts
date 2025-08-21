import { addMonthToCurrentDate, getCurrentDateInFormatMM_YYY } from "pages/helpers/dateUtils";

export const creditCardValidData = {
    creditCardNumber: '1111-1111-1111-1111',
    creditCardExpirationDate: getCurrentDateInFormatMM_YYY(addMonthToCurrentDate(3)),
    creditCardCvv: '123',
    creditCardHolderName: "Alex test"
}