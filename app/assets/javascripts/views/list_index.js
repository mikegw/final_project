FinalProject.Views.ListIndex = Backbone.CompositeView.extend({
  initialize: function () {
    this.collection = this.model.lists();
    this.listenTo(this.collection, 'add', this.addItem);
  },

  template: JST["list/index"],

  addList: function (list) {
    var view = new FinalProject.Views.ListStub({
      model: list
    });
    this.addSubview('.list-stubs', view);
  },

  render: function () {
    console.log("rendering ListIndex for user", this.model)
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);

    this.collection.each(this.addList.bind(this));
    return this;
  }

});