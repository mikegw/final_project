FinalProject.Views.UserSearch = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["user/search"],

  render: function () {
    event.preventDefault();
    console.log("rendering UserSearch for", this.model.get("username"));
    var content = this.template({
      user: this.model
    });

    console.log(content)

    this.$el.html(content);
    return this;
  }

})