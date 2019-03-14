const filters = {
  ucFirst(value) {
    if (!value) {
      return '';
    }

    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
  capitalise(value) {
    if (!value) {
      return '';
    }

    return value.toString().toUpperCase();
  },
};

export default filters;

export const installer = (Vue) => {
  const filterKeys = Object.keys(filters);

  filterKeys.forEach((filterKey) => {
    Vue.filter(filterKey, filters[filterKey]);
  });
};
