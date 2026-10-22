export function isValidUnary(value) {
    return value.length > 0 && /^[1]+$/.test(value);
}

export function unaryToDecimal(value) {
    return value.length;
}

export function decimalToUnary(value) {
    if (value <= 0) return "";
    return "1".repeat(value);
}