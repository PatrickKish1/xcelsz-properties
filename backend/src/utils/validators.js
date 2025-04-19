export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
    return re.test(password);
}

export function validateUsername(username) {
    return username.length >= 3;
}

export function validatePhoneNumber(phoneNumber) {
    return /^\+?[\d\s-]+$/.test(phoneNumber);
}

export function validateDate(date) {
    return new Date(date).toString() !== 'Invalid Date';
}

export function validatePrice(price) {
    return price > 0;
}

export function validateRoomName(name) {
    return name.length > 0;
}

export function validateAvailabilityStatus(status) {
    return ['available', 'booked'].includes(status);
}