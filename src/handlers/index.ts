
const digitToLetters = {
  '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ'
};

const generateVanityNumbers = (phoneNumber: string): string[] => {

  console.log("phone number", phoneNumber);
  
  const letterCombinations = phoneNumber.split('').map(digit => digitToLetters[digit as keyof typeof digitToLetters] || digit);

  console.log("letter combination", letterCombinations);
  
  const allCombinations = letterCombinations.reduce((acc, letters) => {
    const newCombinations: string[] = [];
    for (const prefix of acc) {
        newCombinations.push(prefix + letters);
    }
    return newCombinations;
  }, ['']);
  return allCombinations;
};

const selectBestVanityNumbers = (vanityNumbers: string[], count = 3): string[] => {
  vanityNumbers.sort((a, b) => {
    const lettersA = a.split('').filter(char => /[A-Z]/.test(char)).length;
    const lettersB = b.split('').filter(char => /[A-Z]/.test(char)).length;
    return lettersB - lettersA;
  });
  return vanityNumbers.slice(0, count);
};

exports.handler = async (event: any) => {
  const phoneNumber = event.Details.ContactData.CustomerEndpoint.Address;

  const vanityNumbers = generateVanityNumbers(phoneNumber);

  const bestVanityNumbers = selectBestVanityNumbers(vanityNumbers);
  console.log("best vanity numbers",bestVanityNumbers);

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        CallerNumber: phoneNumber,
        BestVanityNumbers: bestVanityNumbers
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "message" })
    };
  }
};



// const input = {
//     Details : {
//         ContactData : {
//             CustomerEndpoint : {
//                 Address : "+916309 354596 7890"
//             }
//         }
//     }
// }



// handler(input);