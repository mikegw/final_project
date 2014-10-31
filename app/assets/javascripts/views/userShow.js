FinalProject.Views.UserShow = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["user/show"],

  render: function () {
    console.log("rendering UserShow with model", this.model)
    var content = this.template({
      user: this.model
    });

    console.log("content of usershow:", content)

    this.$el.html(content);
    return this;
  }

})