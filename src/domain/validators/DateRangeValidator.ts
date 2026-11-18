import type { TErrorValidator } from "../exceptions/ValidatorException";
import BaseValidator from "./BaseValidator";

class DateRangeValidator extends BaseValidator {
    public validate(field: string, value: { startDate: Date, endDate: Date }): TErrorValidator | void {
        const startDateTime = value.startDate.getTime() 
        const endDateTime = value.endDate.getTime() 

        if (startDateTime >= endDateTime) {
            const error: TErrorValidator = {
                field: field, 
                message: "A data de término não pode ser anterior ou igual à data de início." 
            }

            return error
        }
    }
}

const dateRangeValidator = new DateRangeValidator()

export default dateRangeValidator