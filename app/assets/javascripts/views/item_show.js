FinalProject.Views.ItemShow = Backbone.CompositeView.extend({

  template: JST["item/show"],

  tagName: "section",
  className: "item modal",
  id: "item-modal",

  events: {
    "click .modal-screen": "back",
    "click #remove-button": "removeItem"
  },

  render: function () {
    console.log("rendering itemshow for item", this.model)
    var content = this.template({
      item: this.model
    });

    this.$el.html(content);

    var stub = new FinalProject.Views.ItemStub({
      model: this.model
    });

    this.addSubview('.stub-container', stub);
    return this;
  },

  back: function () {
    _(this.subviews(".stub-container")).each(function(sub){
      sub.remove();
    });
    this.remove();

  },

  removeItem: function () {
    this.model.destroy();
    this.back();
  }


})
