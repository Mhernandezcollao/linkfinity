const emailIsValid = (value: string): boolean => {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(value);
};

const passwordIsStrong = (value: string): boolean => {
    const PASSWORD_REGEXP = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))/;
    return PASSWORD_REGEXP.test(value);
};

export {
    emailIsValid,
    passwordIsStrong
}