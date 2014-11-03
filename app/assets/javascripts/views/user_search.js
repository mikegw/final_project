FinalProject.Views.UserSearch = Backbone.View.extend({

  initialize: function () {
    this.results = new FinalProject.Models.SearchResult();
    debugger
  },

  template: JST["user/search"],

  events: {
    "submit": "submit"
  },

  render: function () {
    event.preventDefault();
    console.log("rendering UserSearch for", this.model.get("username"));

    var content = this.template();

    console.log(content)

    this.$el.html(content);
    return this;
  },

  addResult: function (user) {
    var result = new FinalProject.Views.UserStub({
      model: user
    });

    this.addSubview('.search-results', result);
  },

  filterResults: function (searchstring) {
    _(this.subviews('.search-results')).each(function (result) {
      if(!RegExp("%" + searchstring + "%").test(result.username)) {
        result.remove();
      }
    });
  },

  submit: function (){
    var input = $(".search-input").val();
    this.filterResults(input);
    this.model.fetch({ id: input });
    this.model.matchedfriends().each((function (user) {
      this.addResult(user)
    }).bind(this));
  }

});