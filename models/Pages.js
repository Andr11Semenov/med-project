var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page', {
  map: { name: 'url'},
  autokey: { path: 'slug', from: 'url', unique: true }
});

Page.add({
  title: { type: String, require:true, initial:true},
  url:{ type:String, require:true, initial:true, note: "Warning: modifying this will affect the URL it's shown on."},

  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  section: { type: Types.Select, options: 'page, about, contact, what-we-do', default: 'page'},

  //ABOUT 
  aboutSomeField: { type: String, dependsOn: { template: 'about' } },

  // TEAM
  teamSomeField: { type: String, dependsOn: { template: 'team' } },

  content: {
    
    extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },  

});

Page.schema.virtual('content.full').get(function() {
  return this.content.extended;
});

Page.defaultColumns = 'url|20%, title, state|20%, author|20%, publishedDate|20%';
Page.register();