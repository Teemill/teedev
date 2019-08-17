const inputString: string = 'The quick brown bat jumped over the fat rat.';
const searchString: string = 'quake';

function levenshtein(a: string, b: string) {
  const aLength: number = a.length;
  const bLength: number = b.length;

  if (aLength === 0) {
    return bLength;
  }
 
  if (bLength === 0) {
    return aLength;
  }

  const matrix: number[][] = [];

  let i:  number = 0;
  let j:  number = 0;
  let bi: number = 0;
  let bj: number = 0;

  for(i = 0; i <= bLength; ++i){
    matrix[i] = [i];
  }

  for(i = 0; i <= aLength; ++i){
    matrix[0][i] = i;
  }

  for (i = 1; i <= bLength; ++i) {
    bi = i - 1;

    for (j = 1; j <= aLength; ++j) {
      bj = j - 1;

      if (b.charAt(bi) === a.charAt(bj)) {
        matrix[i][j] = matrix[bi][bj];
      } else {
        matrix[i][j] = Math.min(
          matrix[bi][bj] + 1,
          Math.min(
            matrix[i][bj] + 1,
            matrix[bi][j] + 1,
          ),
        );
      }
    }
  }

  return matrix[bLength][aLength];
};

console.log(levenshtein('what', 'test'));

// window.test = levenshtein;