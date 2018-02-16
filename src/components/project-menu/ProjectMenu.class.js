class ProjectMenu {
  constructor() {
    this.items = [];
    this.sortedItems = [];
    this.filtersObj = {};
  }
  setItems(data) {
    this.items = [...data];
    this.sortedItems = [...data];
    return this;
  }
  getItems() {
    return this.items;
  }
  getFilterParams() {
    return {
      sortBy: {
        key: this.filtersObj.sortField,
        isReverse: this.filtersObj.isReverse,
      },
      searchString: this.filtersObj.searchString,
    };
  }
  setFilters(obj) {
    this.filtersObj = { ...obj };
    return this;
  }
  getSortedItems() {
    return this.sortedItems;
  }
  searchByName() {
    const str = this.getFilterParams().searchString;
    const items = [...this.items];
    if (str) {
      this.sortedItems = items.filter((s) => {
        const item = { ...s };
        item.cases = item.cases.filter(c => c.name.toLowerCase().match(new RegExp(str, 'g')));
        return item.cases.length ? item : item.name.toLowerCase().match(new RegExp(str, 'g'));
      });
    } else {
      this.sortedItems = [...this.items];
    }
    return this;
  }
  sortItems() {
    const filterParams = this.getFilterParams();
    const { key, isReverse } = filterParams.sortBy;
    this.sortedItems.sort((a, b) => {
      const x = a[key]; const y = b[key];
      let answer = null;
      if (x < y) {
        answer = -1;
      } else {
        answer = (x > y) ? 1 : 0;
      }
      return answer;
    });
    if (isReverse) {
      this.sortedItems.reverse();
    }
    return this;
  }
}

export default ProjectMenu;