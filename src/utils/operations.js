
//Otra manera de exportar funciones
// module.exports.addition = function (num1, num2) {
//     return num1 + num2;
// }

const addition = (num1, num2) => {
    return num1 + num2;
}

const multiplication = (num1, num2) => {
    return num1 * num2;
}

module.exports = {
    addition, 
    multiplication
}