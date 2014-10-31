FinalProject.Collections.Items = Backbone.Collection.extend({
  model: FinalProject.Models.Item,

  urlRoot: "/api/lists/" + this.list_id + "/list_items",

  initialize: function (models, options) {
    this.list = options.list;
  }
});