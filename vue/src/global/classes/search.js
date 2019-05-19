function sanitiseQuery(query) {
  return query.replace(/([\w])[-+']([\w])/g, '$1$2').replace(/^[\W]+|[\W](?![\w])/g, '');
}

export const rules = [
  {
    name: 'Partial Word',
    weight: 1,
    match: (query, content) => content.match(
      new RegExp(query.replace(/[\W]/g, '|'), 'gi'),
    ),
  },
  {
    name: 'Full Word',
    weight: 2,
    match: (query, content) => content.match(
      new RegExp(`(?:[\\W]|^)(${query.replace(/[\W]/g, '|')})(?=[\\W]|$)`, 'gi'),
    ),
  },
];

class SearchableItem {
  constructor(item) {
    this.item = item;
    this.weight = 0;

    this.searchableProperties = {
      name: 1,
      description: 1,
      // bestsellerOrder: 0.00001,
    };
  }

  query(query) {
    const weight = this._calcWeight(query);
    this.weight = weight.totalWeight;
    this.breakdown = weight.breakdown;
  }

  _calcWeight(query) {
    let totalWeight = 0;
    const breakdown = {};

    Object.keys(this.item).forEach((propertyName) => {
      if (Object.keys(this.searchableProperties).includes(propertyName)) {
        const property = this.item[propertyName];
        const propertyWeight = this._calcPropertyWeight(property, query);

        breakdown[propertyName] = propertyWeight.breakdown;

        totalWeight += propertyWeight.totalWeight * this.searchableProperties[propertyName];
      }
    });

    return {
      breakdown,
      totalWeight,
    };
  }

  // eslint-disable-next-line
  _calcPropertyWeight(property, query) {
    let totalWeight = 0;
    const breakdown = {};

    rules.forEach((rule) => {
      if (typeof property === 'string') {
        const stripedProperty = sanitiseQuery(property);

        if (rule.match) {
          const ruleMatches = rule.match(query, stripedProperty);

          if (ruleMatches) {
            const weight = ruleMatches.length
              * rule.weight
              * (ruleMatches.join(' ').replace(/[ ]+/g, ' ').length / stripedProperty.length);

            breakdown[rule.name] = {
              catMatch: ruleMatches.join(' ').replace(/[ ]+/g, ' '),
              percentage: (ruleMatches.join(' ').replace(/[ ]+/g, ' ').length / stripedProperty.length).toFixed(2),
              matches: ruleMatches.length,
            };
            totalWeight += weight;
          }
        }
      } else if (typeof property === 'number') {
        totalWeight += property * rule.weight;
      }
    });

    return {
      totalWeight,
      breakdown,
    };
  }
}

export default class Searchable {
  constructor(items) {
    this.items = items.map(item => new SearchableItem(item));
    this._query = null;
  }

  query(query) {
    this._query = sanitiseQuery(query);

    this.items
      .forEach(item => item.query(this._query));

    this.results = this.items
      .filter(item => item.weight > 0)
      .sort((a, b) => b.weight - a.weight)
      .map((item) => {
        item.item.weight = item.weight;
        item.item.breakdown = item.breakdown;
        return item.item;
      });

    return this.results;
  }
}
