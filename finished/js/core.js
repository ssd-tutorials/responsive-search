var systemObject = {
	defaultMax : 10,
	buttonsMax : 5,
	tableMax : [],	
	currentPage : [],
	tableData : [],
	tableDataIndex : [],
	tableDataText : [],	
	tableDataFiltered : [],
	pagesAll : [],
	recordsAll : [],
	blocksAll : [],
	blockCurrent : [],
	indexStart : [],
	indexEnd : [],
	indexPrevious : [],
	indexNext : [],
	isEmpty : function(thisValue) {
		"use strict";
		if ($.isArray(thisValue)) {
			return thisValue.length > 0 ? false : true;
		} else {
			return thisValue !== '' && typeof thisValue !== 'undefined' ? false : true;
		}
	},
	outerHtml : function(obj) {
		"use strict";
		return obj.wrap('<div>').parent().html();	
	},
	setCurrentPage : function(thisIdentity, thisPage) {
		"use strict";
		thisPage = !this.isEmpty(thisPage) ? thisPage : 1;
		this.currentPage[thisIdentity] = thisPage;
		$('#' + thisIdentity).attr('data-page', thisPage);
	},
	pagingTemplate : function(thisIdentity, thisButtons) {
		"use strict";
		if (!this.isEmpty(thisButtons)) {
			var thisPaging = '<ul class="paging" data-form="' + thisIdentity + '">';
				thisPaging += thisButtons;
				thisPaging += '</ul>';
			return thisPaging;
		}
	},
	feedPaging : function(thisIdentity, thisButtons) {
		"use strict";
		// replace pagination
		$('#' + thisIdentity + 'Paging').html(this.pagingTemplate(thisIdentity, thisButtons));
		// replace number of records
		$('#' + thisIdentity + 'Count').html(this.recordsAll[thisIdentity]);
		// replace page
		$('#' + thisIdentity + 'Page').html(this.currentPage[thisIdentity]);
		// replace page of
		$('#' + thisIdentity + 'PageOf').html(this.pagesAll[thisIdentity]);
	},
	pagingLoad : function(thisIdentity, thisArray) {
		"use strict";
		if (!this.isEmpty(thisIdentity)) {
			var thisButtons = [];
			if (!this.isEmpty(thisArray)) {
				
				if ($('#' + thisIdentity + 'Paging').length > 0) {
					
					// first / previous buttons
					if (this.currentPage[thisIdentity] > 1) {
						
						thisButtons.push('<li><span data-index="1">&lt;&lt;</span></li>');
						thisButtons.push('<li><span data-index="' + parseInt((this.currentPage[thisIdentity] - 1), 10) + '">&lt;</span></li>');
						
					} else {
						
						thisButtons.push('<li class="inactive">&lt;&lt;</li>');
						thisButtons.push('<li class="inactive">&lt;</li>');
						
					}
					
					// previous block button
					if (this.blockCurrent[thisIdentity] > 1) {
						thisButtons.push('<li><span data-index="' + this.indexPrevious[thisIdentity] + '">...</span></li>');
					}					
					
					// middle buttons
					for (var i = this.indexStart[thisIdentity]; i <= this.indexEnd[thisIdentity]; i++) {
						var thisButton;
						if (i == this.currentPage[thisIdentity]) {
							thisButton = '<li><span class="active">' + i + '</span></li>';
						} else {
							thisButton = '<li><span data-index="' + i + '">' + i + '</span></li>';
						}
						thisButtons.push(thisButton);
					}
					
					// next block button
					if (this.blockCurrent[thisIdentity] < this.blocksAll[thisIdentity]) {
						thisButtons.push('<li><span data-index="' + this.indexNext[thisIdentity] + '">...</span></li>');
					}
					
					// next / last buttons
					if (this.currentPage[thisIdentity] < this.pagesAll[thisIdentity]) {
						
						thisButtons.push('<li><span data-index="' + (parseInt(this.currentPage[thisIdentity], 10) + 1) + '">&gt;</span></li>'); 
						thisButtons.push('<li><span data-index="' + this.pagesAll[thisIdentity] + '">&gt;&gt;</span></li>');
						
					} else {
						
						thisButtons.push('<li class="inactive">&gt;</li>'); 
						thisButtons.push('<li class="inactive">&gt;&gt;</li>');
						
					}
					
					this.feedPaging(thisIdentity, thisButtons.join(''));
					
				}
				
			} else {
				
				// if array is empty
				thisButtons.push('<li class="inactive">&lt;&lt;</li>'); 
				thisButtons.push('<li class="inactive">&lt;</li>');
				thisButtons.push('<li class="inactive">1</li>');
				thisButtons.push('<li class="inactive">&gt;</li>'); 
				thisButtons.push('<li class="inactive">&gt;&gt;</li>');
				
				this.feedPaging(thisIdentity, thisButtons.join(''));
				
			}
		}
	},
	calculate : function(thisIdentity, thisArray) {
		"use strict";
		// all records
		this.recordsAll[thisIdentity] = thisArray.length;
		// rounding up the number of pages
		this.pagesAll[thisIdentity] = Math.ceil(this.recordsAll[thisIdentity] / this.tableMax[thisIdentity]);
		// correct current page if necessary
		this.currentPage[thisIdentity] = this.currentPage[thisIdentity] < this.pagesAll[thisIdentity] ?
			this.currentPage[thisIdentity] : this.pagesAll[thisIdentity];
		// setting current page number
		this.setCurrentPage(thisIdentity, this.currentPage[thisIdentity]);
		// calculate blocks
		this.blocksAll[thisIdentity] = Math.ceil(this.pagesAll[thisIdentity] / this.buttonsMax);
		this.blockCurrent[thisIdentity] = Math.ceil(this.currentPage[thisIdentity] / this.buttonsMax);
		// start index
		this.indexStart[thisIdentity] = Math.ceil( 
			( 
				(this.blockCurrent[thisIdentity] - 1) * this.buttonsMax 
			) + 1 
		);
		// if there is only one block
		// or it's the last block
		// get the right number of buttons
		var thisButtonsMaxEnd = this.buttonsMax;
		if (this.blockCurrent[thisIdentity] == this.blocksAll[thisIdentity]) {
			// if there's only one block of buttons
			if (this.blocksAll[thisIdentity] == 1) {
				thisButtonsMaxEnd = this.pagesAll[thisIdentity];
			} else {
				thisButtonsMaxEnd = Math.ceil(
					parseInt( (this.pagesAll[thisIdentity] - this.indexStart[thisIdentity]), 10) + 1
				);
			}
		}
		this.indexEnd[thisIdentity] = parseInt(
			( (this.indexStart[thisIdentity] - 1) + thisButtonsMaxEnd ), 10
		);
		this.indexPrevious[thisIdentity] = parseInt(
			(this.indexStart[thisIdentity] - this.buttonsMax), 10
		);
		this.indexNext[thisIdentity] = parseInt(
			(this.indexEnd[thisIdentity] + 1), 10
		);
	},
	paging : function(obj) {
		"use strict";
		obj.live('click', function(e) {
			e.preventDefault();
			var thisIdentity = $(this).closest('ul').attr('data-form');
			var thisIndex = $(this).attr('data-index');
			if (!systemObject.isEmpty(thisIdentity)) {
				// update current page number
				systemObject.setCurrentPage(thisIdentity, thisIndex);
				if (!systemObject.isEmpty(systemObject.tableDataFiltered[thisIdentity])) {
					systemObject.limit(thisIdentity, systemObject.tableDataFiltered[thisIdentity]);
				} else {
					systemObject.limit(thisIdentity, systemObject.tableData[thisIdentity]);
				}
			}
		});
	},
	limit : function(thisIdentity, thisArray) {
		"use strict";
		if (!this.isEmpty(thisIdentity)) {
			this.calculate(thisIdentity, thisArray);
			if (!this.isEmpty(thisArray)) {
				var thisFiltered = [];
				if (this.pagesAll[thisIdentity] > 1) {
					var thisStartIndex = ( 
						parseInt((this.currentPage[thisIdentity] - 1), 10) * 
						this.tableMax[thisIdentity]
					);
					var thisEndIndex = (
						parseInt(thisStartIndex, 10) + this.tableMax[thisIdentity]
					);
					thisFiltered = thisArray.slice(thisStartIndex, thisEndIndex);
				} else {
					thisFiltered = thisArray.slice(0, this.tableMax[thisIdentity]);
				}
				$('#' + thisIdentity + 'Table tbody').html(thisFiltered.join(''));
			} else {
				var thisSpan = $('#' + thisIdentity + 'Table th').length;
				var thisNoRecords = '<tr><td colspan="' + thisSpan + '"';
				thisNoRecords += ' class="bgOrange">';
				thisNoRecords += 'There are no records matching your search criteria.';
				thisNoRecords += '</td></tr>';				
				$('#' + thisIdentity + 'Table tbody').html($(thisNoRecords).show());
			}
			this.pagingLoad(thisIdentity, thisArray);
		}	
	},
	loadTable : function(obj) {
		"use strict";
		if (obj.length > 0) {
			$.each(obj, function() {
				var thisObj = $(this);
				var thisUrl = thisObj.attr('data-url');
				var thisIdentity = thisObj.attr('id');
				var thisMax = thisObj.attr('data-max');
				systemObject.tableMax[thisIdentity] = !systemObject.isEmpty(thisMax) ? 
					parseInt(thisMax, 10) : systemObject.defaultMax;
				var thisCurrentPage = thisObj.attr('data-page');
				systemObject.currentPage[thisIdentity] = !systemObject.isEmpty(thisCurrentPage) ? 
					parseInt(thisCurrentPage, 10) : 1;
				$.ajax({
					type : 'GET',
					url : thisUrl,
					dataType : 'json',
					success : function(data) {
						if (data && data.rows && data.rowsIndex && data.text) {
							systemObject.tableData[thisIdentity] = data.rows;
							systemObject.tableDataIndex[thisIdentity] = data.rowsIndex;
							systemObject.tableDataText[thisIdentity] = data.text;
							systemObject.limit(thisIdentity, systemObject.tableData[thisIdentity]);
						}
					}
				});
			});
		}
	},
	search : function(obj) {
		"use strict";
		$.each(obj, function() {
			var thisObj = $(this);
			var thisIdentity = thisObj.attr('data-form');
			thisObj.live('keyup keypress', function(e) {
				var thisCode = (e.keyCode ? e.keyCode : e.which);
				if (thisCode === 13) {
					e.preventDefault();
				} else {
					if (!systemObject.isEmpty(systemObject.tableData[thisIdentity])) {
						if (e.type === 'keyup') {
							systemObject.setCurrentPage(thisIdentity);
							systemObject.tableDataFiltered[thisIdentity] = [];
							var thisValue = $(this).val().toLowerCase();
							if (!systemObject.isEmpty(thisValue)) {
								var thisValues = thisValue.split(' ');
								for (var tIndex in systemObject.tableDataText[thisIdentity]) {
									$.each(thisValues, function(k, v) {
										if (systemObject.tableDataText[thisIdentity][tIndex].indexOf(v) !== -1) {
											var thisItem = systemObject.outerHtml($(systemObject.tableDataIndex[thisIdentity][tIndex]));
											systemObject.tableDataFiltered[thisIdentity].push(thisItem);
											return false;
										}
									});
								}
								systemObject.limit(thisIdentity, systemObject.tableDataFiltered[thisIdentity]);
							} else {
								systemObject.limit(thisIdentity, systemObject.tableData[thisIdentity]);
							}
						}
					}
				}
			});
		});
	}
};
$(function() {
	"use strict";
	systemObject.loadTable($('.loadTable'));
	systemObject.paging($('.paging li span'));
	systemObject.search($('.search'));
});