/*!
 * Copyright (c) Metaways Infosystems GmbH, 2011
 * LGPLv3, http://www.arcavias.com/en/license
 * $Id: ItemUi.js 14701 2012-01-05 08:52:24Z nsendetzky $
 */


Ext.ns( 'MShop.panel.locale' );

MShop.panel.locale.ItemUi = Ext.extend( MShop.panel.AbstractItemUi, {

	recordName : 'Locale',
	idProperty : 'locale.id',
	siteidProperty : 'locale.siteid',

	initComponent : function()
	{
		this.title = _('Locale item details');

		MShop.panel.AbstractItemUi.prototype.setSiteCheck( this );

		this.items = [ {
			xtype : 'tabpanel',
			activeTab : 0,
			border : false,
			itemId : 'MShop.panel.locale.ItemUi',
			plugins : [ 'ux.itemregistry' ],
			items : [ {
				xtype : 'panel',
				title : _('Basic'),
				border : false,
				layout : 'hbox',
				layoutConfig : {
					align : 'stretch'
				},
				itemId : 'MShop.panel.locale.ItemUi.BasicPanel',
				plugins : [ 'ux.itemregistry' ],
				defaults : {
					bodyCssClass : this.readOnlyClass
				},
				items : [ {
					xtype : 'form',
					flex : 1,
					ref : '../../mainForm',
					autoScroll : true,
					items : [ {
						xtype : 'fieldset',
						style: 'padding-right: 25px;',
						border : false,
						labelAlign : 'top',
						defaults: {
							readOnly : this.fieldsReadOnly,
							anchor : '100%'
						},
						items : [ {
							xtype : 'displayfield',
							fieldLabel : _( 'ID' ),
							name : 'locale.id'
						}, {
							xtype : 'MShop.elements.status.combo',
							name : 'locale.status'
						}, {
							xtype : 'MShop.elements.language.combo',
							fieldLabel : _( 'Language' ),
							name : 'locale.languageid',
							allowBlank : false,
							emptyText : _( 'Language (required)' )
						}, {
							xtype : 'MShop.elements.currency.combo',
							fieldLabel : _( 'Currency' ),
							name : 'locale.currencyid',
							allowBlank : false,
							emptyText : _( 'Currency (required)' )
						}, {
							xtype : 'numberfield',
							name : 'locale.position',
							fieldLabel : 'Position',
							allowNegative : false,
							allowDecimals : false,
							allowBlank : false,
							value : 0
						}, {
							xtype : 'displayfield',
							fieldLabel : _('Created'),
							name : 'locale.ctime'
						}, {
							xtype : 'displayfield',
							fieldLabel : _('Last modified'),
							name : 'locale.mtime'
						}, {
							xtype : 'displayfield',
							fieldLabel : _('Editor'),
							name : 'locale.editor'
						} ]
					} ]
				} ]
			} ]
		} ];

		MShop.panel.locale.ItemUi.superclass.initComponent.call( this );
	},

	afterRender : function()
	{
		this.setTitle( this.title + ' (' + MShop.config.site["locale.site.label"] + ')' );

		MShop.panel.product.ItemUi.superclass.afterRender.apply( this, arguments );
	}
} );

Ext.reg( 'MShop.panel.locale.itemui', MShop.panel.locale.ItemUi );