export default {
  tokens: {
    comment: [
      /\/\*[\s\S]*?\*\//,
      /\/\/.*/,
    ],
    string: /(?:").*?(?:")|(?:').*?(?:')|(?:`).*?(?:`)/,
    number: /\b(?:(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+)n?|\d+n|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    boolean: /true|false/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
    variable: /(?<=const |let |var )([\S]+?)(?= +)/,
    param: [
      /(?<=\()([\S]+)(?=\) *=>)/,
    ],
    keyword: /\b(?:as|async|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    built_in: /\b(?:console)\b/,
    built_in_method: /(?<=console\.)log/,
    // bracket: [
    //   /\(|\)/,
    //   /\{|\}/,
    //   /\[|\]/,
    // ],
  },
};
