window.FinalProject = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.router = new FinalProject.Routers.Router();
    //this.router.initialize();
    Backbone.history.start({root: "/api"});
  }
};
