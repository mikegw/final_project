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

    var footerView = new FinalProject.Views.Footer({
      model: FinalProject.router.currentUser
    });

    this.addSubview('.content', navView);
    this.addSubview('.content', sidebarView);


    this.$(".content").append($('<section>').addClass("listbar-container"));
    this.$(".listbar-container").append($('<figure>').addClass("background-image"));

    if (this.model.lists().length > 0) {
      var listbarView = new FinalProject.Views.ListShow({
        model:  this.model.lists().first(),
        user: this.model
      });
      this.addSubview('.listbar-container', listbarView);
    }

    this.addSubview(".content", footerView);
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
