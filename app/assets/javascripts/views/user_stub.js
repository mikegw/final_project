FinalProject.Views.UserStub = Backbone.View.extend({

  initialize: function (options) {
    this.wrapper = options.wrapper;
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["user/stub"],

  events: {
    "click button": function () {

    }
  },

  className: "user-stub",

  render: function () {
    console.log("rendering UserStub with user", this.model.username);
    var content = this.template({
      user: this.model,
      wrapper: this.wrapper
    });

    this.$el.html(content);
    return this;
  }

})
