/**
 * level.
 */
 Draw.loadPlugin(function(ui) {
	
	var editor = ui.editor;
	var graph = editor.graph;

	// Sidebar is null in lightbox
	if (ui.sidebar != null)
	{

	    // Adds resource for action
	    mxResources.parse('focusSelectedLayerAction=Focus Selected Layer');
	
	    // Adds action
	    ui.actions.addAction('focusSelectedLayerAction', function()
        {
            console.log('graph ' + graph);
            
            if (!graph.isSelectionEmpty())
            {
                graph.getModel().beginUpdate();
                try
                {
                    console.log('getSelectionCells ' + graph.getSelectionCells());
                    
                    var cells = graph.getSelectionCells();
                    var style = graph.getCurrentCellStyle(graph.getSelectionCell());
                    var value = (mxUtils.getValue(style, mxConstants.STYLE_EDITABLE, 1)) == 1 ? 0 : 1;
                    graph.setCellStyles(mxConstants.STYLE_MOVABLE, value, cells);
                    graph.setCellStyles(mxConstants.STYLE_RESIZABLE, value, cells);
                    graph.setCellStyles(mxConstants.STYLE_ROTATABLE, value, cells);
                    graph.setCellStyles(mxConstants.STYLE_DELETABLE, value, cells);
                    graph.setCellStyles(mxConstants.STYLE_EDITABLE, value, cells);
                    graph.setCellStyles('connectable', value, cells);
                }
                finally
                {
                    graph.getModel().endUpdate();
                }
            }
        }, null, null,'Shift+F');
	
	    // Adds menu
	    ui.menubar.addMenu('关卡功能', function(menu, parent) {
	        ui.menus.addMenuItem(menu, 'focusSelectedLayerAction');
	    });
	
	    // Reorders menubar
	    ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
	        ui.menubar.container.lastChild.previousSibling.previousSibling);
	
// 	    // Adds toolbar button
// 	    ui.toolbar.addSeparator();
// 	    var elt = ui.toolbar.addItem('', 'focusSelectedLayerAction');
	
// //	    // Cannot use built-in sprites
// //	    elt.firstChild.style.backgroundImage = 'url(https://www.draw.io/images/logo-small.gif)';
// //	    elt.firstChild.style.backgroundPosition = '2px 3px';
	}
});
