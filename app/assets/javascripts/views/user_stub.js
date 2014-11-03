FinalProject.Views.UserStub = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["user/stub"],

  events: {
    "click button": function () {

    }
  },

  render: function () {
    console.log("rendering UserStub with user", this.model)
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  }

})