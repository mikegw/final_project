FinalProject.Views.UserNav = Backbone.CompositeView.extend({

  initialize: function () {

  },

  template: JST["user/nav"],

  render: function () {
    var content = this.template()
    this.$el.html(content);


    var stub = new FinalProject.Views.UserStub({
      model: this.model
    });

    var search = new FinalProject.Views.UserSearch({
      model: this.model
    });

    this.addSubview(".user-nav-container", stub);
    this.addSubview(".searchbar-container", search);

    return this;

  }

});