define(["app-config","sulusecurity/components/users/models/user","services/husky/url-validator"],function(a,b,c){"use strict";var d=1,e=2,f=4,g={validateErrorClass:"husky-validate-error",internalLink:{titleContainer:"#internal-link-container .title",linkContainer:"#internal-link-container .link"},externalLink:{titleContainer:"#external-link-container .title",linkContainer:"#external-link-container .link"}};return{layout:function(){return{extendExisting:!0,content:{width:"fixed",leftSpace:!0,rightSpace:!0}}},initialize:function(){this.sandbox.emit("husky.toolbar.header.item.disable","template",!1),this.load(),this.bindCustomEvents()},startComponents:function(){var a,b=this.sandbox.dom.data("#shadow_base_language_select","languages"),c=[],d=null;void 0!==this.data.enabledShadowLanguages[this.options.language]&&(d=this.data.enabledShadowLanguages[this.options.language]),0===b.length?c.push({id:"",name:"no languages",disabled:!0}):this.sandbox.util.each(this.data.concreteLanguages,function(a,b){if(this.options.language!==b){var e=!1;d===b&&(e=!0),c.push({id:b,name:b,disabled:e})}}.bind(this)),a=this.data.shadowBaseLanguage,0===c.length&&(c=[{id:-1,name:this.sandbox.translate("sulu.content.form.settings.shadow.no_base_language"),disabled:!0}]),this.sandbox.start([{name:"select@husky",options:{el:"#shadow_base_language_select",instanceName:"settings",multipleSelect:!1,defaultLabel:this.sandbox.translate("sulu.content.form.settings.shadow.select_base_language"),data:c,preSelectedElements:[a]}}])},bindCustomEvents:function(){this.sandbox.on("sulu.toolbar.save",function(a){this.submit(a)},this);var a=function(){this.sandbox.emit("sulu.content.contents.set-header-bar",!1)}.bind(this);this.sandbox.on("husky.select.nav-contexts.selected.item",a.bind(this)),this.sandbox.on("husky.select.nav-contexts.deselected.item",a.bind(this)),this.sandbox.on("husky.select.settings.selected.item",function(){this.sandbox.emit("sulu.content.changed"),this.sandbox.emit("sulu.content.contents.set-header-bar",!1)}.bind(this))},bindDomEvents:function(){this.sandbox.dom.on("#content-type-container","change",function(a){var b=this.sandbox.dom.$(a.currentTarget),c=this.sandbox.dom.find(".sub-form",b.parent().parent().parent()),e=this.sandbox.dom.val(b);this.sandbox.dom.hide("#content-type-container .sub-form"),this.sandbox.dom.show(c),parseInt(e)===d||this.data.shadowOn?this.sandbox.dom.show("#shadow-container"):this.sandbox.dom.hide("#shadow-container")}.bind(this),".content-type"),this.sandbox.dom.on("#shadow_on_checkbox","click",function(){this.updateTabVisibilityForShadowCheckbox(!1)}.bind(this))},updateTabVisibilityForShadowCheckbox:function(a){var b,c=this.sandbox.dom.find("#shadow_on_checkbox")[0],d=c.checked?"hide":"show";!1===a&&(b="hide"),"hide"===b?this.sandbox.emit("husky.toolbar.header.item.disable","state",!1):this.sandbox.emit("husky.toolbar.header.item.enable","state",!1),this.sandbox.util.each(["show-in-navigation-container","settings-content-form-container"],function(a,b){"hide"===d?this.sandbox.dom.find("#"+b).hide():this.sandbox.dom.find("#"+b).show()}.bind(this))},load:function(){this.sandbox.emit("sulu.content.contents.get-data",function(a){this.render(a)}.bind(this))},render:function(a){this.data=a,require(["text!/admin/content/template/content/settings.html?webspaceKey="+this.options.webspace+"&languageCode="+this.options.language],function(b){this.sandbox.dom.html(this.$el,this.sandbox.util.template(b,{translate:this.sandbox.translate})),this.buildAllNavContexts(this.sandbox.dom.data("#nav-contexts","auraData")),this.bindDomEvents(),this.setData(this.data),this.listenForChange(),this.startComponents(),this.sandbox.start(this.$el,{reset:!0}),this.updateTabVisibilityForShadowCheckbox(!0),this.updateChangelog(a),this.sandbox.emit("sulu.preview.initialize")}.bind(this))},buildAllNavContexts:function(a){this.allNavContexts={};for(var b=0,c=a.length;c>b;b++)this.allNavContexts[a[b].id]=a[b].name},updateChangelog:function(a){var c,d,e=function(a){this.sandbox.dom.text("#created .name",a),g.resolve()},f=function(a){this.sandbox.dom.text("#changed .name",a),h.resolve()},g=this.sandbox.data.deferred(),h=this.sandbox.data.deferred();a.creator===a.changer?(c=new b({id:a.creator}),c.fetch({global:!1,success:function(a){f.call(this,a.get("fullName")),e.call(this,a.get("fullName"))}.bind(this),error:function(){f.call(this,this.sandbox.translate("sulu.content.form.settings.changelog.user-not-found")),e.call(this,this.sandbox.translate("sulu.content.form.settings.changelog.user-not-found"))}.bind(this)})):(c=new b({id:a.creator}),d=new b({id:a.changer}),c.fetch({global:!1,success:function(a){e.call(this,a.get("fullName"))}.bind(this),error:function(){e.call(this,this.sandbox.translate("sulu.content.form.settings.changelog.user-not-found"))}.bind(this)}),d.fetch({global:!1,success:function(a){f.call(this,a.get("fullName"))}.bind(this),error:function(){f.call(this,this.sandbox.translate("sulu.content.form.settings.changelog.user-not-found"))}.bind(this)})),this.sandbox.dom.text("#created .date",this.sandbox.date.format(a.created,!0)),this.sandbox.dom.text("#changed .date",this.sandbox.date.format(a.changed,!0)),this.sandbox.data.when([g,h]).then(function(){this.sandbox.dom.show("#changelog-container")}.bind(this))},setData:function(a){var b=parseInt(a.nodeType);b===d?this.sandbox.dom.attr("#content-node-type","checked",!0).trigger("change"):b===e?this.sandbox.dom.attr("#internal-link-node-type","checked",!0).trigger("change"):b===f&&this.sandbox.dom.attr("#external-link-node-type","checked",!0).trigger("change"),a.title&&(this.sandbox.dom.val("#internal-title",a.title),this.sandbox.dom.val("#external-title",a.title)),a.internal_link&&this.sandbox.dom.data("#internal-link","singleInternalLink",a.internal_link),a.external&&this.sandbox.dom.data("#external","url-data",c.match(a.external)),this.sandbox.on("husky.select.nav-contexts.initialize",function(){var b,c,d=[];for(b=0,c=a.navContexts.length;c>b;b++)d.push(this.allNavContexts[a.navContexts[b]]);this.sandbox.dom.data("#nav-contexts","selection",a.navContexts),this.sandbox.dom.data("#nav-contexts","selectionValues",d),$("#nav-contexts").trigger("data-changed")}.bind(this)),a.shadowOn&&(this.sandbox.dom.attr("#shadow_on_checkbox","checked",!0),this.sandbox.emit("husky.toolbar.header.item.disable","state",!1))},listenForChange:function(){this.sandbox.dom.on(this.$el,"keyup change",function(){this.setHeaderBar(!1)}.bind(this),".trigger-save-button"),this.sandbox.on("sulu.single-internal-link.internal-link.data-changed",function(){this.setHeaderBar(!1)}.bind(this))},setHeaderBar:function(a){this.sandbox.emit("sulu.content.contents.set-header-bar",a)},submit:function(a){this.sandbox.logger.log("save Model");var b={},c=this.sandbox.dom.data("#shadow_base_language_select","selectionValues");if(b.navContexts=this.sandbox.dom.data("#nav-contexts","selection"),b.nodeType=parseInt(this.sandbox.dom.val('input[name="nodeType"]:checked')),b.shadowOn=this.sandbox.dom.prop("#shadow_on_checkbox","checked"),b.nodeType===e)b.title=this.sandbox.dom.val("#internal-title"),b.internal_link=this.sandbox.dom.data("#internal-link","singleInternalLink");else if(b.nodeType===f){var d=this.sandbox.dom.data("#external","url-data");b.title=this.sandbox.dom.val("#external-title"),b.external=d.scheme+d.specificPart}return c&&c.length>0&&(b.shadowBaseLanguage=c[0]),this.validate(b)?(this.data=this.sandbox.util.extend(!0,{},this.data,b),this.data.navContexts=b.navContexts,void this.sandbox.emit("sulu.content.contents.save",this.data,a)):void this.sandbox.emit("sulu.labels.warning.show","form.validation-warning","labels.warning")},validate:function(a){return this.sandbox.dom.removeClass(g.internalLink.titleContainer,g.validateErrorClass),this.sandbox.dom.removeClass(g.internalLink.linkContainer,g.validateErrorClass),this.sandbox.dom.removeClass(g.externalLink.titleContainer,g.validateErrorClass),this.sandbox.dom.removeClass(g.externalLink.linkContainer,g.validateErrorClass),a.nodeType===e?this.validateInternal(a):a.nodeType===f?this.validateExternal(a):!0},validateInternal:function(a){var b=!0;return a.title||(b=!1,this.sandbox.dom.addClass(g.internalLink.titleContainer,g.validateErrorClass)),a.internal_link||(b=!1,this.sandbox.dom.addClass(g.internalLink.linkContainer,g.validateErrorClass)),b},validateExternal:function(a){var b=!0;return a.title||(b=!1,this.sandbox.dom.addClass(g.externalLink.titleContainer,g.validateErrorClass)),a.external||(b=!1,this.sandbox.dom.addClass(g.externalLink.linkContainer,g.validateErrorClass)),b}}});