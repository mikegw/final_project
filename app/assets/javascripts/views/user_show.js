FinalProject.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model, "stubClick", this.renderList)
  },

  tagName: "section",
  className: "content-container",

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
    this.addSubview('.content', navView);
    this.addSubview('.content', sidebarView);

    this.$(".content").append($('<section>').addClass("listbar-container"));
    this.$(".listbar-container").append($('<feature>').addClass("background-image"));

    console.log(this.$el.html())

    var listbarView = new FinalProject.Views.ListShow({
      model: (function () {
        if (this.model.lists().length > 0) {
          return this.model.lists().first()
        } else {
          this.model.lists().set({title: "New List"}, {parse: true})
          return this.model.lists().first()
        }
      }).bind(this)(),

      user: this.model
    });
    this.addSubview('.listbar-container', listbarView);

    return this;
  },

  renderList: function (event) {
    console.log("renderlist caught event", event)
    _(this.subviews('.listbar-container')).each((function(view) {
      if(view["className"] === "listbar") {
        this.removeSubview('.listbar-container', view);
      }
    }).bind(this));

    var listbarView = new FinalProject.Views.ListShow({
      model: event.list,
      user: this.model
    });
    this.addSubview('.listbar-container', listbarView);
  }

})