export default class Article {
  constructor(title, content, categories, status) {
    this.title = title;
    this.content = content;
    this.categories = categories;
    this.status = status;

    this.error = null;
  }

  async checkValid() {
    if (!this.title) {
      this.error = 'Your article must have a title';
      return false;
    }

    if (!this.content) {
      this.error = 'Your article must have some content';
      return false;
    }

    if (!this.categories || this.categories.length < 1) {
      this.error = 'Your article must have at least one category';
      return false;
    }

    if (!this.status) {
      this.error = 'Your article must have an assigned status';
      return false;
    }

    return true;
  }
}
