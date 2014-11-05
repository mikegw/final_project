FinalProject.Views.ListIndex = Backbone.CompositeView.extend({
  initialize: function (options) {
    console.log("listindex options", options)
    this.collection = this.model.lists();
    this.sharedLists = this.model.sharedLists();
    this.listenTo(this.collection, 'add', this.addItem);
  },

  events: {
    "click .list-edit-button": "showListModal"
  },

  tagName: "section",
  className: "sidebar",

  template: JST["list/index"],

  addList: function (list) {
    var view = new FinalProject.Views.ListStub({
      model: list,
      user: this.model
    });
    this.addSubview('.list-stubs', view);
  },

  addSharedList: function (list) {
    var view = new FinalProject.Views.ListStub({
      model: list,
      user: this.model,
    });

    view.template = JST["list/shared_stub"];
    this.addSubview('.list-stubs', view);
  },

  render: function () {
    console.log("rendering ListIndex for user", this.model)
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);

    this.collection.each(this.addList.bind(this));
    this.sharedLists.each(this.addSharedList.bind(this));
    return this;
  },

  showListModal: function (event) {
    console.log("showListModal caught event", event)
    var title = $(event.currentTarget).data("listTitle");

    console.log("looking for", title)

    clickedList = this.collection.find(function (list) {
      return list.get("title") === title;
    });

    console.log( clickedList)

    var modal = new FinalProject.Views.ListModal({
      model: clickedList
    });

    this.addSubview('.list-modal-container', modal);

    setTimeout(function(){
      this.$("#list-modal").addClass("is-active");
      this.$("#list-modal-content").addClass("is-active");
    }.bind(this), 0.5);
  }

});
