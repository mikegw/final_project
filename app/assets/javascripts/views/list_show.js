FinalProject.Views.ListShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.collection = this.model.items();
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.collection, 'add', this.addItem);
  },

  template: JST["list/show"],

  addItem: function (item) {
    var view = new FinalProject.Views.ItemShow({
      model: item
    });
    this.addSubview('.list-items', view);
  },

  render: function () {
    console.log("rendering ListShow with list", this.model)
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);
    this.$el.data("list-id", this.model.id);

    this.collection.each(this.addItem.bind(this));
    return this;
  }

})