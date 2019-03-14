import javascript from './languages/javascript';
import html from './languages/html';

/* eslint-disable-next-line */
String.prototype.splice = function(start, delCount, newSubStr) {
  return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
};

export default {
  install(Vue) {
    Vue.prototype.$highlighter = this.highlighter;
  },
  highlighter: {
    languages: {
      javascript,
      html,
    },
    generateHTML(text, language) {
      const time = (new Date()).getMilliseconds();
      const tokenizedText = this.tokenize(text, language);
      let htmlText = '';

      for (let i = 0; i < tokenizedText.length; i += 1) {
        const token = tokenizedText[i];

        token.content = token.content.replace(/</, '&lt;').replace(/>/, '&gt;');

        if (!token.type) {
          htmlText += token.content;
        } else {
          htmlText += `<span class="${token.type}">${token.content}</span>`;
        }
      }

      const computeTime = (new Date()).getMilliseconds() - time;
      return {
        html: htmlText,
        time: computeTime,
      };
    },
    tokenize(text, language) {
      let tokenList = [];

      const tokenNames = Object.keys(this.languages[language].tokens);
      for (let i = 0; i < tokenNames.length; i += 1) {
        const tokenName = tokenNames[i];
        const token = this.languages[language].tokens[tokenName];

        let matches = [];

        if (token.length) {
          for (let p = 0; p < token.length; p += 1) {
            matches = matches.concat(this.getPatternMatches(text, tokenName, token[p], tokenList));
          }
        } else {
          matches = matches.concat(this.getPatternMatches(text, tokenName, token, tokenList));
        }

        tokenList = tokenList.concat(matches);
      }

      const sortedTokenList = [];
      for (let i = 0; i < tokenList.length; i += 1) {
        const token = tokenList[i];

        if (sortedTokenList.length === 0) {
          token.sorter = 'Length = 0';
          sortedTokenList.push(token);
        } else {
          for (let l = 0; l < sortedTokenList.length; l += 1) {
            const sortedToken = sortedTokenList[l];

            if (sortedToken.position.start > token.position.end) {
              token.comparedWith = sortedToken;
              token.sorter = 'sortedToken.position.start > token.position.end';
              sortedTokenList.splice(l, 0, token);
              break;
            }

            if (l >= sortedTokenList.length - 1) {
              token.sorter = 'l === sortedTokenList.length - 1';
              sortedTokenList.splice(sortedTokenList.length, 0, token);
              break;
            }
          }
        }
      }

      let lastEndIndex = 0;
      const filledTokenList = [];
      for (let i = 0; i < sortedTokenList.length; i += 1) {
        const token = sortedTokenList[i];

        if (token.position.start > lastEndIndex) {
          const subString = text.substring(lastEndIndex, token.position.start);
          filledTokenList.push({
            content: subString,
          });
        }

        filledTokenList.push(token);

        if (i === sortedTokenList.length - 1) {
          const subString = text.substring(token.position.end, text.length);
          filledTokenList.push({
            content: subString,
          });
        }

        lastEndIndex = token.position.end;
      }

      return filledTokenList;
    },

    getPatternMatches(text, tokenName, pattern, tokenList) {
      const matches = [];
      const regexPattern = RegExp(pattern, 'g');

      while (regexPattern.lastIndex < text.length) {
        const match = regexPattern.exec(text);

        if (match === null) {
          break;
        }

        const content = match[0];
        const startPos = match.index;
        const endPos = regexPattern.lastIndex;

        const newToken = {
          type: tokenName,
          position: {
            start: startPos,
            end: endPos,
          },
          content,
        };

        if (!this.checkTokenOverlap(newToken, tokenList)) {
          matches.push(newToken);
        }

        /* Optimisation Break when lastIndex === text.length */
      }

      return matches;
    },

    checkTokenOverlap(inputToken, tokenList) {
      for (let i = 0; i < tokenList.length; i += 1) {
        const token = tokenList[i];
        if (
          token.position.start <= inputToken.position.end
        && token.position.end >= inputToken.position.start
        ) {
          return true;
        }
      }
      return false;
    },
  },
};
