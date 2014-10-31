FinalProject.Views.ListStub = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  template: JST["list/stub"],

  events: {
    "click button": function () {
      Backbone.history.navigate("/lists/" + this.model.id)
    }
  },

  tagname: "li",

  render: function () {
    console.log("rendering ListStub with list", this.model)
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);
    return this;
  }

})