FinalProject.Views.ItemStub = Backbone.View.extend({

  tagName: 'li',

  template: JST["item/stub"],

  className: "item group",

  render: function () {

    var content = this.template({
      item: this.model
    });

    this.$el.html(content);
    return this;
  }

})
