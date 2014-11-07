FinalProject.Views.ListStub = Backbone.View.extend({

  initialize: function (options) {
    this.user = options.user;
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model, 'remove', this.remove)
  },

  tagName: 'li',
  className: "list-stub",

  template: JST["list/stub"],

  events: {
    "click button": "renderList"
  },

  tagname: "li",

  render: function () {
    console.log("rendering ListStub with list", this.model)
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);
    return this;
  },

  renderList: function () {
    console.log("trigger render of list", this.model)
    $(".current-list").removeClass("current-list");
    this.$("button").addClass("current-list");
    this.user.trigger("stubClick", {list: this.model})
  }

})
