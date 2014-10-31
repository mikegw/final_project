FinalProject.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["user/show"],

  render: function () {
    console.log("rendering UserShow with model", this.model)
    console.log("this.model has username", this.model.get("username"));
    var content = this.template({
      user: this.model
    });

    console.log(content)

    this.$el.html(content);
    return this;
  }

})