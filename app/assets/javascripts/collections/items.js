FinalProject.Collections.Items = Backbone.Collection.extend({
  model: FinalProject.Models.Item,

  url: function () {
    return this.list.url() + "/list_items";
  },

  initialize: function (models, options) {
    this.list = options.list;
  }
});
