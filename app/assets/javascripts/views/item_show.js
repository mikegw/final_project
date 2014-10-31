FinalProject.Views.ItemShow = Backbone.View.extend({

  tagname: 'li',

  template: JST["item/show"],

  render: function () {

    var content = this.template({
      item: this.model
    });

    this.$el.html(content);
    return this;
  }

})