export const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.isString) {
        const regex = /[A-Za-z]+/;
        isValid = regex.test(value);
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = regex.test(value) && isValid;
    }

    if (rules.isNumber) {
        const regex = /^\d+$/;
        isValid = regex.test(value) && isValid;
    }

    return isValid;
};
