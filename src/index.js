// Função que implementa o algoritmo de Luhn para validar números de cartão de crédito.
// Recebe uma string 'cardNumber' e retorna true se o número for válido segundo o algoritmo de Luhn, false caso contrário.
function luhnAlgorithm(cardNumber) {
	// Converte a string em um array de dígitos numéricos.
	const digits = cardNumber.split('').map(Number);
	// Separa os dígitos em posições ímpares (da direita para a esquerda).
	const oddDigits = digits.filter((_, idx) => (digits.length - idx) % 2 === 1);
	// Separa os dígitos em posições pares (da direita para a esquerda).
	const evenDigits = digits.filter((_, idx) => (digits.length - idx) % 2 === 0);
	
	// Calcula o checksum somando os dígitos ímpares e o dobro dos dígitos pares (subtraindo 9 se o dobro for maior que 9).
	const checksum = oddDigits.reduce((sum, digit) => sum + digit, 0) +
		evenDigits.reduce((sum, digit) => {
			const doubled = digit * 2;
			return sum + (doubled > 9 ? doubled - 9 : doubled); 
		}, 0);

	// Retorna true se o checksum for divisível por 10, indicando um cartão válido.
	return checksum % 10 === 0;
}

// Função que identifica a bandeira do cartão de crédito com base no número informado.
// Recebe uma string 'cardNumber' e retorna o nome da bandeira ou 'Unknown' se não houver correspondência.
function getCardIssuer(cardNumber) {
	const cardPatterns = {
		// Visa: 16 dígitos numéricos.
		Visa: /^[0-9]{16}$/,
		// MasterCard: começa com 51-55 e possui 16 dígitos.
		MasterCard: /^5[1-5][0-9]{14}$/,
		// American Express: começa com 34 ou 37 e possui 15 dígitos.
		AmericanExpress: /^3[47][0-9]{13}$/,
		// Discover: começa com 6011 ou 65xx e possui 16 dígitos.
		Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        // JCB: começa com 2131, 1800 ou 35xxx e possui 15 ou 16 dígitos.
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        // Diners Club: começa com 300-305, 36 ou 38 e possui 14 dígitos.
        DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        // EnRoute: começa com 2014 ou 2149 e possui 15 dígitos.
        EnRoute: /^2(?:014|149)[0-9]{11}$/,
		// Voyager: começa com 8699 e possui 15 dígitos.
		Voyager: /^8699[0-9]{11}$/,
		// HiperCard: começa com 606282 ou 637095 e possui 16 dígitos.
		HiperCard: /^(606282|637095)[0-9]{10}$/,
		// Aura: começa com 50 seguido de 05, 78-89 e possui 16 dígitos.
		Aura: /^50(?:05|78|79|80|81|82|83|84|85|86|87|88|89)[0-9]{12}$/,
	};

	// Percorre os padrões e retorna a bandeira correspondente ao número informado.
	for (const [issuer, pattern] of Object.entries(cardPatterns)) {
		if (pattern.test(cardNumber)) {
			return issuer;
		}
	}
	// Retorna 'Unknown' se não houver correspondência.
	return "Unknown";
}

// Função principal que valida o cartão de crédito.
// Retorna um objeto com as propriedades 'valid' (boolean) e 'issuer' (string ou null).
function validateCreditCard(cardNumber) {
	if (luhnAlgorithm(cardNumber)) {
		const issuer = getCardIssuer(cardNumber);
		return { valid: true, issuer: issuer };
	} else {
		return { valid: false, issuer: null };
    }
}

// Exemplo de uso: define um número de cartão e exibe o resultado da validação no console.
const cardNumber = "4532633854619837";
const result = validateCreditCard(cardNumber);
console.log(result);