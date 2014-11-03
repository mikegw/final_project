FinalProject.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model, "stubClick", this.renderList)
  },

  template: JST["user/show"],

  render: function () {
    event.preventDefault();
    console.log("rendering UserShow with model", this.model)
    console.log("this.model has username", this.model.get("username"));

    var content = this.template({
      user: this.model
    });

    console.log(content);


    this.$el.html(content);

    // if (!$.isEmptyObject(this.subviews)){
//       this.subviews().each(function(subview){subview.remove()});
//     };

    this.removeSubviews();

    var navView = new FinalProject.Views.UserNav({
      model: this.model
    });


    var sidebarView = new FinalProject.Views.ListIndex({
      model: this.model
    });

    this.addSubview(".navbar", navView);
    this.addSubview('.sidebar', sidebarView);

    if (this.model.lists().length > 0) {
      var listbarView = new FinalProject.Views.ListShow({
        model: this.model.lists().first(),
        user: this.model
      });
      this.addSubview('.listbar-content', listbarView);
    }

    return this;
  },

  renderList: function (event) {
    console.log("renderlist caught event", event)
    _(this.subviews('.listbar-content')).each((function(view) {
      this.removeSubview('.listbar-content', view);
    }).bind(this));

    var listbarView = new FinalProject.Views.ListShow({
      model: event.list,
      user: this.model
    });
    this.addSubview('.listbar-content', listbarView);
  }

})