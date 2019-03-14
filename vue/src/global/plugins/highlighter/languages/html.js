export default {
  tokens: {
    comment: [
      /<!--[\s\S]*?-->/,
    ],
    tag: /(?<=<|<\/)[^/,\s]+?(?= |>)/,
    attr: /[\S]+(?==("|')[\S\s]+?("|'))/,
    string: /("|')[\S\s]+?("|')/,
  },
};
